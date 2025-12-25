import { Stack, Typography, Divider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import CharFieldsRow from "./CharFieldsRow";
import FixCheckboxRow from "./FixCheckboxRow";
import validateSerialNumber from "../../calculations/validation";

const SLOTS_COUNT = 11;

function CodeEntryScreen() {
  const initialChars = useMemo(() => Array(SLOTS_COUNT).fill(""), []);
  const initialFixed = useMemo(() => Array(SLOTS_COUNT).fill(false), []);

  const [chars, setChars] = useState(initialChars);
  const [fixed, setFixed] = useState(initialFixed);

  const handleCharChange = (index, nextChar) => {
    setChars((prev) => {
      const copy = [...prev];
      copy[index] = nextChar;
      return copy;
    });
  };

  const handleFixedToggle = (index, isFixed) => {
    setFixed((prev) => {
      const copy = [...prev];
      copy[index] = isFixed;
      return copy;
    });
  };

  useEffect(() => {
    const checkSumDigit = validateSerialNumber(chars);
    handleCharChange(10, checkSumDigit);
  }, [chars]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Code Entry</Typography>

      <Divider />

      <Stack spacing={1.5}>
        <CharFieldsRow
          values={chars}
          fixed={fixed}
          onChange={handleCharChange}
        />

        <FixCheckboxRow
          values={chars}
          fixed={fixed}
          onToggle={handleFixedToggle}
        />
      </Stack>
    </Stack>
  );
}

export default CodeEntryScreen;
