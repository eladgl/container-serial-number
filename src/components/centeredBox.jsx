import { Box, Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

function CenteredBox() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'red',
        p: 2, // padding for small screens
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 480,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Stack></Stack>
        <Typography variant="h5" gutterBottom>
          Centered Component
        </Typography>

        <Typography variant="body1">
          This component stays centered and is responsive.
        </Typography>
      </Paper>
    </Box>
  );
}

export default CenteredBox;
