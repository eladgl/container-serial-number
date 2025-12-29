import { Stack, Typography, Divider, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import CharFieldsRow from "./CharFieldsRow";
import validateSerialNumber from "../../calculations/validation";
import { yieldIso6346Combinations } from "../../calculations/yieldIsoCombinations";

const SLOTS_COUNT = 11;
const CHECKSUM_INDEX = 10;

function normalizeCellToPatternValue(cell) {
  const s = String(cell ?? "").trim();
  if (!s) return null;
  return s[0].toUpperCase(); // 1 char
}

function CodeEntryScreen() {
  const [chars, setChars] = useState(() => Array(SLOTS_COUNT).fill(""));
  const [fixed, setFixed] = useState(() => Array(SLOTS_COUNT).fill(false));
  const [combinations, setCombinations] = useState([]);
  const [error, setError] = useState("");

  // Your validateSerialNumber computes something based on first 10 slots.
  // We show it as an informational "computed checksum", but DO NOT force it into the input.
  const computedChecksumDigit = useMemo(() => {
    const first10 = chars.slice(0, CHECKSUM_INDEX);
    try {
      const cd = validateSerialNumber(first10);
      return String(cd);
    } catch {
      // If user still has empty/invalid cells, computation may fail; keep it blank.
      return "";
    }
  }, [chars]);

  const handleCharChange = (index, nextChar) => {
    setChars((prev) => {
      const copy = [...prev];
      copy[index] = nextChar;
      return copy;
    });
  };

  useEffect(() => {
    setChars((prev) => {
      const copy = [...prev];
      copy[CHECKSUM_INDEX] = computedChecksumDigit;
      return copy;
    });
  }, [computedChecksumDigit]);

  const handleFixedToggle = (index, isFixed) => {
    // Enforce: if user tries to fix an empty slot, block (generator requires fixed => value)
    const cell = chars[index];
    const normalized = normalizeCellToPatternValue(cell);

    if (isFixed && normalized == null) {
      setError(`Cannot fix position ${index + 1}: it has no value.`);
      return;
    }

    setError("");
    setFixed((prev) => {
      const copy = [...prev];
      copy[index] = isFixed;
      return copy;
    });
  };

  const handleGetCombinations = () => {
    setError("");

    // Convert UI state -> generator inputs
    const pattern = chars.map(normalizeCellToPatternValue);

    // fixed boolean[] -> 0/1 array
    const fixedPositions = fixed.map((b) => (b ? 1 : 0));

    // If checksum cell is empty but fixed=true, block (same rule)
    if (fixed[CHECKSUM_INDEX] && pattern[CHECKSUM_INDEX] == null) {
      setError("Checksum is fixed but empty. Enter a checksum digit 0-9.");
      return;
    }

    // Safety limit: otherwise you will freeze the UI for large search spaces
    const limit = 500;

    try {
      const results = Array.from(
        yieldIso6346Combinations(pattern, fixedPositions, { limit })
      );
      setCombinations(results);
    } catch (e) {
      setCombinations([]);
      setError(e?.message || "Failed to generate combinations.");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Code Entry</Typography>
      <Divider />

      <Stack spacing={1}>
        <Typography variant="body2">
          Computed checksum (from first 10 slots):{" "}
          <strong>{computedChecksumDigit || "-"}</strong>
        </Typography>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Stack>

      <Stack spacing={1.5}>
        <CharFieldsRow
          values={chars} // IMPORTANT: checksum is editable, so use raw chars
          fixed={fixed}
          width={44}
          onChange={handleCharChange}
          onToggle={handleFixedToggle}
        />
      </Stack>

      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleGetCombinations}
      >
        Get Combinations
      </Button>

      {!!combinations.length && (
        <Stack spacing={0.5}>
          <Typography variant="subtitle2">
            Showing {combinations.length} results (limit 500)
          </Typography>

          <Stack sx={{ maxHeight: 280, overflow: "auto" }}>
            {combinations.map((code) => (
              <Typography key={code} variant="body2">
                {code}
              </Typography>
            ))}
          </Stack>
        </Stack>
      )}

      {!combinations.length && !error && (
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          No results yet. Enter constraints and click Get Combinations.
        </Typography>
      )}
    </Stack>
  );
}

export default CodeEntryScreen;
