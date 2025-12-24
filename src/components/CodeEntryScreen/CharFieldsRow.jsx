import { Divider, Stack, Typography, Box } from "@mui/material";
import OneCharField from "./OneCharField";

const ITEM_WIDTH = 44;

function FieldGroup({ title, children }) {
  return (
    <Stack spacing={0.75} sx={{ alignItems: "center" }}>
      <Typography variant="caption" sx={{ opacity: 0.75 }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
        {children}
      </Stack>
    </Stack>
  );
}

function CharFieldsRow({ values, fixed, onChange }) {
  // indices
  const ownershipIdx = [0, 1, 2];
  const categoryIdx = [3];
  const serialIdx = [4, 5, 6, 7, 8, 9];
  const checksumIdx = [10];

  const modeForIndex = (index) => {
    // 0-3 are letters, 4-10 are digits
    return index <= 3 ? "letter" : "digit";
  };

  const renderField = (index) => (
    <OneCharField
      key={index}
      width={ITEM_WIDTH}
      value={values[index]}
      isFixed={Boolean(fixed[index])}
      mode={modeForIndex(index)}
      onChange={(nextChar) => onChange(index, nextChar)}
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
          minWidth: "max-content", // ensures groups don't squish; allows scroll on small screens
        }}
      >
        <FieldGroup title="Letters">
          {/* Ownership (3) */}
          {ownershipIdx.map(renderField)}
          {/* Category (1) */}
          {categoryIdx.map(renderField)}
        </FieldGroup>

        <Divider orientation="vertical" flexItem />

        <FieldGroup title="Serial #">{serialIdx.map(renderField)}</FieldGroup>

        <Divider orientation="vertical" flexItem />

        <FieldGroup title="Checksum">{checksumIdx.map(renderField)}</FieldGroup>
      </Stack>
    </Box>
  );
}

export default CharFieldsRow;
