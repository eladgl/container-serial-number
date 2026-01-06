import { Checkbox, Box } from '@mui/material';

function FixCheckbox({ checked, onToggle, disabled = false, width = 44 }) {
  return (
    <Box
      sx={{
        width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={(e) => onToggle(e.target.checked)}
        size="small"
        inputProps={{ 'aria-label': 'Fix character' }}
      />
    </Box>
  );
}

export default FixCheckbox;
