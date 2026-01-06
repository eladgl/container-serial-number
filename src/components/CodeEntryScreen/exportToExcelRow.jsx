import { useMemo, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import * as XLSX from 'xlsx';

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Build something like: HNTUXXXXXX7
 * - Uses the current chars (what the user typed + computed checksum in slot 10)
 * - Empty slots become 'X'
 */
function buildBaseCode(chars) {
  const safe = Array.isArray(chars) ? chars : [];
  const s = safe
    .slice(0, 11)
    .map((c) => {
      const v = String(c ?? '').trim();
      return v ? v[0].toUpperCase() : 'X';
    })
    .join('');

  return s.padEnd(11, 'X').slice(0, 11);
}

function buildHebrewSentence(count, baseCode) {
  const initials = baseCode.slice(0, 4);
  const checksum = baseCode.slice(10, 11);

  return `להלן ${count} מספרי מכולות המתחילות באינישיאלס ${initials} ועם ספרת הביקורת ${checksum}. החל ממספר ${baseCode}`;
}

function toSafeFilenamePart(s) {
  return String(s).replace(/[\\/:*?"<>|]+/g, '-');
}

const ExportToExcelRow = ({ combinations = [], chars = [] }) => {
  const [fromIndex, setFromIndex] = useState(1); // 1-based
  const [toIndex, setToIndex] = useState(100); // 1-based

  const baseCode = useMemo(() => buildBaseCode(chars), [chars]);

  const handleExport = () => {
    if (!combinations.length) return;

    const max = combinations.length;

    const from = clamp(Number(fromIndex) || 1, 1, max);
    const to = clamp(Number(toIndex) || 1, 1, max);

    const start = Math.min(from, to);
    const end = Math.max(from, to);

    const selected = combinations.slice(start - 1, end);
    const count = selected.length;

    const sentence = buildHebrewSentence(count, baseCode);

    const rows = [
      [sentence],
      [],
      ['Index', 'Code'],
      ...selected.map((code, i) => [i + 1, code]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Make the sentence span two columns (A1:B1)
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

    // Column widths
    ws['!cols'] = [{ wch: 10 }, { wch: 24 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Container Codes');

    const filename = `ISO-6346-Container-Codes-For-${toSafeFilenamePart(baseCode)}-${count}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <FormControl>
        <InputLabel htmlFor="export-from">Index From</InputLabel>
        <OutlinedInput
          id="export-from"
          label="Index From"
          value={fromIndex}
          onChange={(e) => setFromIndex(e.target.value)}
          inputProps={{ inputMode: 'numeric' }}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="export-to">Index To</InputLabel>
        <OutlinedInput
          id="export-to"
          label="Index To"
          value={toIndex}
          onChange={(e) => setToIndex(e.target.value)}
          inputProps={{ inputMode: 'numeric' }}
        />
      </FormControl>

      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleExport}
        disabled={!combinations.length}
      >
        Export to Excel
      </Button>
    </Stack>
  );
};

export default ExportToExcelRow;
