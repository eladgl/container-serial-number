import { TextField } from "@mui/material";

function OneCharField({
  value,
  onChange,
  isFixed,
  width = 44,
  mode = "letter", // "letter" | "digit"
}) {
  const normalize = (raw) => {
    const ch = (raw ?? "").slice(0, 1);

    if (!ch) return "";

    if (mode === "digit") {
      return /[0-9]/.test(ch) ? ch : "";
    }

    // mode === "letter"
    const upper = ch.toUpperCase();
    return /[A-Z]/.test(upper) ? upper : "";
  };

  const handleChange = (e) => {
    const next = normalize(e.target.value);
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
        inputMode: mode === "digit" ? "numeric" : "text",
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
