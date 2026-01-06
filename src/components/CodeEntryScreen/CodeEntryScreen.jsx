import { Divider, Stack, Typography } from '@mui/material';

import { useEffect, useMemo, useState, useRef, useCallback } from 'react';

import CodePanel from './codePanel';
import validateSerialNumber from '../../calculations/validation';
import CombinationRow from '../combinationRow';
import CombinationsResultsTable from './combinationsResultsTable';
import ExportToExcelRow from './exportToExcelRow';

import { yieldIso6346Combinations } from '../../calculations/yieldIsoCombinations';
import { normalizeCellToPatternValue } from './utils';

const SLOTS_COUNT = 11;
const CHECKSUM_INDEX = 10;

const SCROLL_CHUNK = 50;

function takeWithPeek(iterator, pendingRef, count) {
  const out = [];

  // Consume any prefetched items first
  while (pendingRef.current.length > 0 && out.length < count) {
    out.push(pendingRef.current.shift());
  }

  // Pull up to `count` items
  while (out.length < count) {
    const { value, done } = iterator.next();
    if (done) {
      return { items: out, hasNextPage: false };
    }
    out.push(value);
  }

  // Peek 1 item to know if more exist
  const peek = iterator.next();
  if (peek.done) {
    return { items: out, hasNextPage: false };
  }

  // Store peeked value for next time
  pendingRef.current.push(peek.value);
  return { items: out, hasNextPage: true };
}

function CodeEntryScreen() {
  const [chars, setChars] = useState(() => Array(SLOTS_COUNT).fill(''));
  const [fixed, setFixed] = useState(() => Array(SLOTS_COUNT).fill(false));

  const [combinations, setCombinations] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  const [error, setError] = useState('');

  // The iterator and a small buffer for “peek”
  const combosIteratorRef = useRef(null);
  const pendingRef = useRef([]);

  const handleCharChange = (index, nextChar) => {
    setChars((prev) => {
      const copy = [...prev];
      copy[index] = nextChar;
      return copy;
    });
  };

  const computedChecksumDigit = useMemo(() => {
    const first10 = chars.slice(0, CHECKSUM_INDEX);
    try {
      const cd = validateSerialNumber(first10);
      return String(cd);
    } catch {
      return '';
    }
  }, [chars]);

  const handleFixedToggle = (index, isFixed) => {
    setFixed((prev) => {
      const copy = [...prev];
      copy[index] = isFixed;
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

  const pattern = useMemo(
    () => chars.map(normalizeCellToPatternValue),
    [chars],
  );
  const fixedPositions = useMemo(() => fixed.map((b) => (b ? 1 : 0)), [fixed]);

  const startSearch = useCallback(
    (initialBatchSize) => {
      setError('');
      setIsNextPageLoading(false);

      try {
        // New search => reset iterator + pending buffer
        combosIteratorRef.current = yieldIso6346Combinations(
          pattern,
          fixedPositions,
        );
        pendingRef.current = [];

        const { items, hasNextPage: more } = takeWithPeek(
          combosIteratorRef.current,
          pendingRef,
          initialBatchSize,
        );

        setCombinations(items);
        setHasNextPage(more);
      } catch (e) {
        combosIteratorRef.current = null;
        pendingRef.current = [];
        setCombinations([]);
        setHasNextPage(false);
        setError('Failed generating combinations.');
      }
    },
    [pattern, fixedPositions],
  );

  const loadMore = useCallback(
    async (count) => {
      const it = combosIteratorRef.current;
      if (!it) return;
      if (isNextPageLoading) return;
      if (!hasNextPage) return;

      setIsNextPageLoading(true);
      try {
        const { items: nextItems, hasNextPage: more } = takeWithPeek(
          it,
          pendingRef,
          count,
        );

        setCombinations((prev) => prev.concat(nextItems));
        setHasNextPage(more);
      } catch (e) {
        setError('Failed loading more combinations.');
        setHasNextPage(false);
      } finally {
        setIsNextPageLoading(false);
      }
    },
    [hasNextPage, isNextPageLoading],
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Code Entry</Typography>
      <Divider />

      <Stack spacing={1}>
        <Typography variant="body2">
          Computed checksum (from first 10 slots):{' '}
          <strong>{computedChecksumDigit || '-'}</strong>
        </Typography>
      </Stack>

      <CodePanel
        chars={chars}
        fixed={fixed}
        onChange={handleCharChange}
        onFixed={handleFixedToggle}
      />

      <CombinationRow
        isComboGot={!!combinations.length}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        onGetCombinations={startSearch}
        onLoadMore={(n) => loadMore(n)}
      />

      {!!combinations.length && (
        <Stack spacing={0.5}>
          <ExportToExcelRow combinations={combinations} chars={chars} />
          <Typography variant="subtitle2">
            Showing {combinations.length} results
          </Typography>
          <Stack sx={{ height: 280 }}>
            <CombinationsResultsTable
              combinations={combinations}
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
              loadMore={() => loadMore(SCROLL_CHUNK)} // scroll loads exactly 50
            />
          </Stack>
        </Stack>
      )}

      {!combinations.length && !error && (
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          No results yet. Enter constraints and click Get Combinations.
        </Typography>
      )}

      {!!error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
}

export default CodeEntryScreen;
