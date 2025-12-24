import { Box, Divider, Stack, Typography } from "@mui/material";
import FixCheckbox from "./FixCheckbox";

const ITEM_WIDTH = 44;

function CheckboxGroup({ title, spacing, children }) {
  return (
    <Stack spacing={0.75} sx={{ alignItems: "center" }}>
      <Typography variant="caption" sx={{ opacity: 0.75 }}>
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={spacing}
        sx={{ justifyContent: "center" }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

function FixCheckboxRow({ values, fixed, onToggle }) {
  // indices must match CharFieldsRow
  const ownershipIdx = [0, 1, 2];
  const categoryIdx = [3];
  const serialIdx = [4, 5, 6, 7, 8, 9];
  const checksumIdx = [10];

  const renderCheckbox = (index) => (
    <FixCheckbox
      key={index}
      width={ITEM_WIDTH}
      checked={Boolean(fixed[index])}
      disabled={!values[index]} // prevent locking empty slot
      onChange={(nextChecked) => onToggle(index, nextChecked)}
    />
  );

  return (
    <Box sx={{ overflowX: "auto", pb: 0.5 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minWidth: "max-content",
        }}
      >
        <CheckboxGroup title="Fix" spacing={1.1}>
          {ownershipIdx.map(renderCheckbox)}
          {categoryIdx.map(renderCheckbox)}
        </CheckboxGroup>

        <Divider orientation="vertical" flexItem />

        <CheckboxGroup title="Fix" spacing={1.1}>
          {serialIdx.map(renderCheckbox)}
        </CheckboxGroup>

        <Divider orientation="vertical" flexItem />

        <CheckboxGroup title="Fix" spacing={1.1}>
          {checksumIdx.map(renderCheckbox)}
        </CheckboxGroup>
      </Stack>
    </Box>
  );
}

export default FixCheckboxRow;
