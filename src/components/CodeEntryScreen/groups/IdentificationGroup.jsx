import { Stack } from "@mui/material";

import CheckboxGroup from "./checkboxGroup";

import FieldGroup from "../FieldGroup";
import FixCheckbox from "../FixCheckbox";
import OneCharField from "../OneCharField";

const IdentificationGroup = ({ fixed, onChange, onToggle, values, width }) => {
  const ownershipIdx = [0, 1, 2];

  return (
    <Stack>
      <FieldGroup title="Identification">
        {ownershipIdx.map((val) => (
          <OneCharField
            key={`ownership-${val}`}
            width={width}
            value={values[val]}
            isFixed={Boolean(fixed[val])}
            onChange={(nextChar) => onChange(val, nextChar)}
          />
        ))}
      </FieldGroup>
      <CheckboxGroup title="Fix" spacing={1.1}>
        {ownershipIdx.map((val) => (
          <FixCheckbox
            key={`ownership-checkbox-${val}`}
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

export default IdentificationGroup;
