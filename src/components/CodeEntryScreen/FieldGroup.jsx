import { Stack, Typography } from '@mui/material';

const FieldGroup = ({ title, children }) => {
  return (
    <Stack spacing={0.75} sx={{ alignItems: 'center' }}>
      <Typography variant="caption" sx={{ opacity: 0.75 }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
        {children}
      </Stack>
    </Stack>
  );
};

export default FieldGroup;
