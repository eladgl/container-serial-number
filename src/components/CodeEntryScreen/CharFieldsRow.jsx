import { Stack } from "@mui/material";
import OneCharField from "./OneCharField";

const ITEM_WIDTH = 44; // keep consistent across both rows

function CharFieldsRow({ values, fixed, onChange }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "center",
        flexWrap: "nowrap",
        overflowX: "auto",
        pb: 0.5, // breathing room if scrollbar appears on very small screens
      }}
    >
      {values.map((value, index) => (
        <OneCharField
          key={index}
          width={ITEM_WIDTH}
          value={value}
          isFixed={Boolean(fixed[index])}
          onChange={(nextChar) => onChange(index, nextChar)}
        />
      ))}
    </Stack>
  );
}

export default CharFieldsRow;
