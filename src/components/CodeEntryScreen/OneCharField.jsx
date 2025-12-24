import { TextField } from "@mui/material";

function OneCharField({ value, onChange, isFixed, width = 44 }) {
  const handleChange = (e) => {
    const raw = e.target.value ?? "";
    const next = raw.slice(0, 1); // enforce 1 char
    onChange(next);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      disabled={isFixed}
      variant="outlined"
      size="small"
      inputProps={{
        maxLength: 1,
        style: { textAlign: "center" },
      }}
      sx={{
        width,
        "& .MuiInputBase-input": {
          p: 1,
          fontSize: 16,
          fontWeight: 600,
        },

        ...(isFixed
          ? {
              // Glowing orange locked style
              "& .MuiOutlinedInput-root": {
                boxShadow: "0 0 10px rgba(255, 140, 0, 0.45)",
                "& fieldset": {
                  borderColor: "rgba(255, 140, 0, 0.95)",
                  borderWidth: 2,
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 140, 0, 0.95)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255, 140, 0, 0.95)",
                },
              },
            }
          : {}),
      }}
    />
  );
}

export default OneCharField;
