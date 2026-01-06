import { Stack } from '@mui/material';

import CheckboxGroup from './checkboxGroup';

import FieldGroup from '../FieldGroup';
import FixCheckbox from '../FixCheckbox';
import OneCharField from '../OneCharField';

const CategoryGroup = ({ fixed, onChange, onToggle, values, width }) => {
  const categoryIndex = 3;

  return (
    <Stack>
      <FieldGroup title="Category">
        <OneCharField
          width={width}
          value={values[categoryIndex]}
          isFixed={Boolean(fixed[categoryIndex])}
          onChange={(nextChar) => onChange(categoryIndex, nextChar)}
        />
      </FieldGroup>
      <CheckboxGroup title="Fix" spacing={1.1}>
        <FixCheckbox
          width={width}
          checked={Boolean(fixed[categoryIndex])}
          disabled={!values[categoryIndex]} // prevent locking empty slot
          onToggle={(nextChecked) => onToggle(categoryIndex, nextChecked)}
        />
      </CheckboxGroup>
    </Stack>
  );
};

export default CategoryGroup;
