import { Stack } from "@mui/material";

import CheckboxGroup from "./checkboxGroup";

import FieldGroup from "../FieldGroup";
import FixCheckbox from "../FixCheckbox";
import OneCharField from "../OneCharField";

const ChecksumGroup = ({ fixed, onChange, onToggle, values, width }) => {
  const checksumIndex = 10;

  return (
    <Stack>
      <FieldGroup title="Checksum">
        <OneCharField
          mode="digit"
          width={width}
          value={values[checksumIndex]}
          isFixed={Boolean(fixed[checksumIndex])}
          onChange={(nextChar) => onChange(checksumIndex, nextChar)}
        />
      </FieldGroup>
      <CheckboxGroup title="Fix" spacing={1.1}>
        <FixCheckbox
          width={width}
          checked={Boolean(fixed[checksumIndex])}
          disabled={!values[checksumIndex]} // prevent locking empty slot
          onToggle={(nextChecked) => onToggle(checksumIndex, nextChecked)}
        />
      </CheckboxGroup>
    </Stack>
  );
};

export default ChecksumGroup;
