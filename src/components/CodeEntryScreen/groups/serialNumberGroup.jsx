import { Stack } from "@mui/material";

import CheckboxGroup from "./checkboxGroup";

import FieldGroup from "../FieldGroup";
import FixCheckbox from "../FixCheckbox";
import OneCharField from "../OneCharField";

const SerialNumberGroup = ({ fixed, onChange, onToggle, values, width }) => {
  const serialIdx = [4, 5, 6, 7, 8, 9];

  return (
    <Stack>
      <FieldGroup title="Serial #">
        {serialIdx.map((val) => (
          <OneCharField
            key={`serial-number-${val}`}
            width={width}
            value={values[val]}
            mode="digit"
            isFixed={Boolean(fixed[val])}
            onChange={(nextChar) => onChange(val, nextChar)}
          />
        ))}
      </FieldGroup>
      <CheckboxGroup title="Fix" spacing={1.1}>
        {serialIdx.map((val) => (
          <FixCheckbox
            key={`serial-checkbox-${val}`}
            width={width}
            checked={Boolean(fixed[val])}
            disabled={!values[val]} // prevent locking empty slot
            onToggle={(nextChecked) => onToggle(val, nextChecked)}
          />
        ))}
      </CheckboxGroup>
    </Stack>
  );
};

export default SerialNumberGroup;
