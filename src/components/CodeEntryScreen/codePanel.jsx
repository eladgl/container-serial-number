import { useEffect, useMemo, useState } from 'react';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';

import CharFieldsRow from './CharFieldsRow';

const SLOTS_COUNT = 11;
const CHECKSUM_INDEX = 10;

const CodePanel = ({ chars, fixed, onChange, onFixed }) => {
  return (
    <Stack spacing={1.5}>
      <CharFieldsRow
        values={chars} // IMPORTANT: checksum is editable, so use raw chars
        fixed={fixed}
        width={44}
        onChange={onChange}
        onToggle={onFixed}
      />
    </Stack>
  );
};

export default CodePanel;
