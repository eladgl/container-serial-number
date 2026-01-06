import { Divider, Stack, Typography, Box } from '@mui/material';

import OneCharField from './OneCharField';
import FieldGroup from './FieldGroup';
import {
  CategoryGroup,
  ChecksumGroup,
  IdentificationGroup,
  SerialNumberGroup,
} from './groups';

const ITEM_WIDTH = 44;

function CharFieldsRow({ ...rest }) {
  const modeForIndex = (index) => {
    // 0-3 are letters, 4-10 are digits
    return index <= 3 ? 'letter' : 'digit';
  };

  return (
    <Box sx={{ overflowX: 'auto', pb: 0.5 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 'max-content',
        }}
      >
        <IdentificationGroup {...rest} />
        <Divider orientation="vertical" flexItem />
        <CategoryGroup {...rest} />

        <Divider orientation="vertical" flexItem />

        <SerialNumberGroup {...rest} />

        <Divider orientation="vertical" flexItem />

        <ChecksumGroup {...rest} />
      </Stack>
    </Box>
  );
}

export default CharFieldsRow;
