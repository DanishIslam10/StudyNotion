import React from 'react';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { Box } from '@mui/material';

const PhoneNumberInput = ({ label, placeholder, onChange, value, name }) => {
  return (
    <Box sx={{ margin: '0 0' }}> {/* Margin for spacing */}
      <InputMask
        mask="9999999999" // Mask format for the phone number
        maskChar="X" // Character for empty spaces
        value={value} // Controlled component value
        onChange={onChange} // Handler for input change
      >
        {({ inputRef, ...rest }) => (
          <TextField
            {...rest}
            inputRef={inputRef} // Pass the ref to the input
            variant="outlined"
            fullWidth
            label={label} // Dynamic label prop
            placeholder={placeholder} // Dynamic placeholder prop
            name={name}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#6c757d', // Custom border color
                },
                '&:hover fieldset': {
                  borderColor: '#495057', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#dbd9d9', // Border color when focused
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
