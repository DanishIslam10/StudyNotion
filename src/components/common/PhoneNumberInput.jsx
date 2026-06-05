import React from 'react';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { Box } from '@mui/material';

const PhoneNumberInput = ({ label, placeholder, onChange, value, name }) => {
  return (
    <Box sx={{ margin: "0 0" }}>
      <InputMask
        mask="9999999999"
        maskChar="X"
        value={value}
        onChange={onChange}
      >
        {({ inputRef, ...rest }) => (
          <TextField
            {...rest}
            inputRef={inputRef}
            variant="outlined"
            fullWidth
            label={label}
            placeholder={placeholder}
            name={name}
            sx={{
              // Input text
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
                fontSize: "14px",
              },

              // Placeholder
              "& .MuiInputBase-input::placeholder": {
                color: "#475569",
                opacity: 1,
              },

              // Label
              "& .MuiInputLabel-root": {
                color: "#64748b",
                fontSize: "14px",
              },

              // Focused label
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#818cf8",
              },

              // Input root
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#111c35",
                borderRadius: "16px",

                // Default border
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.10)",
                  borderWidth: "1px",
                },

                // Hover border
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.18)",
                },

                // Focused border + bg
                "&.Mui-focused": {
                  backgroundColor: "#152040",
                  "& fieldset": {
                    borderColor: "rgba(99,102,241,0.6)",
                    borderWidth: "1px",
                    boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
                  },
                },
              },
            }}
          />
        )}
      </InputMask>
    </Box>
  );
};

export default PhoneNumberInput;