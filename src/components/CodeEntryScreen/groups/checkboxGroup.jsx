import { Stack, Typography } from '@mui/material';

const CheckboxGroup = ({ title, spacing, children }) => {
  return (
    <Stack spacing={0.75} sx={{ alignItems: 'center' }}>
      <Typography variant="caption" sx={{ opacity: 0.75 }}>
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={spacing}
        sx={{ justifyContent: 'center' }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default CheckboxGroup;
