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
              // Input Text Color
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
              },

              // Placeholder Color
              "& .MuiInputBase-input::placeholder": {
                color: "#94A3B8",
                opacity: 1,
              },

              // Label Color
              "& .MuiInputLabel-root": {
                color: "#94A3B8",
              },

              // Focused Label
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFD60A",
              },

              // Border Styling
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0F172A",
                borderRadius: "14px",

                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.08)",
                },

                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.2)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#FFD60A",
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
