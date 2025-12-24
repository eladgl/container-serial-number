import { Box, Paper } from "@mui/material";

function MainLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2, // mobile-safe padding
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 780, // enough for 11 fields
          p: 5,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

export default MainLayout;
