import { Stack } from "@mui/material";
import FixCheckbox from "./FixCheckbox";

const ITEM_WIDTH = 44; // must match CharFieldsRow

function FixCheckboxRow({ fixed, onToggle }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "center",
        flexWrap: "nowrap",
        overflowX: "auto",
        pb: 0.5,
      }}
    >
      {fixed.map((isFixed, index) => (
        <FixCheckbox
          key={index}
          width={ITEM_WIDTH}
          checked={Boolean(isFixed)}
          onChange={(nextChecked) => onToggle(index, nextChecked)}
        />
      ))}
    </Stack>
  );
}

export default FixCheckboxRow;
