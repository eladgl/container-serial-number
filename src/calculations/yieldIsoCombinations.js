"use strict";

/**
 * ISO 6346 letter mapping and weights are expected from constants.
 * - LETTER_VALUE: map A..Z -> numeric values (10,12,... skipping multiples of 11)
 * - WEIGHTS_10:   weights for positions 0..9 (usually 2^pos)
 */
import { LETTER_VALUE, WEIGHTS_10 } from "./constants";

function isChar(x) {
  return typeof x === "string" && x.length === 1;
}

function isDigitChar(ch) {
  return isChar(ch) && ch >= "0" && ch <= "9";
}

function isUpperLetter(ch) {
  return isChar(ch) && ch >= "A" && ch <= "Z";
}

function normalizeCharOrNull(x) {
  if (x == null) return null;
  const s = String(x).trim();
  if (!s) return null;
  return s[0].toUpperCase();
}

function valueOfIsoChar(ch) {
  if (isDigitChar(ch)) return ch.charCodeAt(0) - 48;
  if (isUpperLetter(ch)) {
    const v = LETTER_VALUE[ch];
    if (v == null) throw new Error(`Unsupported letter '${ch}'`);
    return v;
  }
  throw new Error(`Invalid character '${ch}' (must be A-Z or 0-9)`);
}

function computeCheckDigitFromSum(sum) {
  const r = sum % 11;
  return r === 10 ? 0 : r;
}

function assertArrayLen(name, arr, len) {
  if (!Array.isArray(arr) || arr.length !== len) {
    throw new Error(`${name} must be an array of length ${len}`);
  }
}

function assertFixedConsistency(pattern, fixedPositions) {
  for (let i = 0; i < 11; i++) {
    if (fixedPositions[i] !== 0 && fixedPositions[i] !== 1) {
      throw new Error(`fixedPositions[${i}] must be 0 or 1`);
    }
    const fixed = fixedPositions[i] === 1;
    if (fixed && pattern[i] == null) {
      throw new Error(
        `fixedPositions[${i}]=1 but pattern[${i}] is null; fixed positions must have a value`
      );
    }
    if (pattern[i] != null && !isChar(pattern[i])) {
      throw new Error(`pattern[${i}] must be a single character or null`);
    }
  }
}

function domainForPosition(i) {
  // domains returned sorted lexicographically
  if (i >= 0 && i <= 2) {
    const out = [];
    for (let c = 65; c <= 90; c++) out.push(String.fromCharCode(c)); // A..Z
    return out;
  }
  if (i === 3) return ["J", "U", "Z"]; // category identifier
  if (i >= 4 && i <= 10) return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  throw new Error(`Bad position ${i}`);
}

/**
 * Compile per-position allowed values from pattern/fixedPositions + ISO domains.
 *
 * Rules:
 * 1) If user provided a value (pattern[i] != null), we treat it as a constraint (single value),
 *    even if not fixed.
 * 2) Validate that constrained values fit each position's domain.
 * 3) Special rule you had earlier:
 *    If checksum is constrained to '0' => owner identification must be 'ISO'.
 */
function buildAllowed(pattern, fixedPositions) {
  const allowed = Array.from({ length: 11 }, () => []);

  for (let i = 0; i < 11; i++) {
    const fixed = fixedPositions[i] === 1;

    if (fixed) {
      allowed[i] = [pattern[i]];
    } else if (pattern[i] != null) {
      allowed[i] = [pattern[i]];
    } else {
      allowed[i] = domainForPosition(i);
    }
  }

  // Validate category constraint
  if (allowed[3].some((v) => !["U", "J", "Z"].includes(v))) return null;

  // Digits in serial + checksum
  for (let i = 4; i <= 10; i++) {
    if (allowed[i].some((v) => !isDigitChar(v))) return null;
  }

  // Letters in owner code
  for (let i = 0; i <= 2; i++) {
    if (allowed[i].some((v) => !isUpperLetter(v))) return null;
  }

  // Checksum constrained to 0?
  const checksumConstrainedTo0 =
    (pattern[10] === "0" && fixedPositions[10] === 1) ||
    (pattern[10] === "0" && fixedPositions[10] === 0 && pattern[10] != null);

  if (checksumConstrainedTo0) {
    const must = ["I", "S", "O"];
    for (let i = 0; i < 3; i++) {
      if (!allowed[i].includes(must[i])) return null;
      allowed[i] = [must[i]];
    }
  }

  // Unique + sorted
  for (let i = 0; i < 11; i++) {
    allowed[i] = Array.from(new Set(allowed[i])).sort();
  }

  return allowed;
}

/**
 * Generator yielding ISO 6346 codes matching constraints.
 * Order is lexicographic because we fill left-to-right with sorted domains.
 */
function* yieldIso6346Combinations(pattern, fixedPositions, { limit = Infinity } = {}) {
  assertArrayLen("pattern", pattern, 11);
  assertArrayLen("fixedPositions", fixedPositions, 11);

  // Normalize just in case callers pass lowercase or empty strings
  const normPattern = pattern.map(normalizeCharOrNull);

  // Re-check fixed consistency after normalization
  assertFixedConsistency(normPattern, fixedPositions);

  const allowed = buildAllowed(normPattern, fixedPositions);
  if (allowed == null) return;

  const buf = Array(11).fill(null);
  let yielded = 0;

  function* dfs(pos, sum) {
    if (yielded >= limit) return;

    if (pos === 10) {
      // compute checksum from sum of positions 0..9 and validate it is allowed
      const cd = computeCheckDigitFromSum(sum);
      const cdChar = String(cd);
      if (allowed[10].includes(cdChar)) {
        buf[10] = cdChar;
        yielded++;
        yield buf.join("");
      }
      return;
    }

    for (const ch of allowed[pos]) {
      buf[pos] = ch;

      const v = valueOfIsoChar(ch);
      const nextSum = sum + v * WEIGHTS_10[pos];

      yield* dfs(pos + 1, nextSum);

      if (yielded >= limit) return;
    }
  }

  yield* dfs(0, 0);
}

export { yieldIso6346Combinations };
