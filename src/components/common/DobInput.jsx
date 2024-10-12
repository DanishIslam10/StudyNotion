import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'; // Import the locale to format date

// Set the locale globally if needed
dayjs.locale('en-gb');

export default function DobInput({ onChange, name, value }) {
  // Ensure the value is a Day.js object or null
  const dayjsValue = value ? dayjs(value, 'DD/MM/YYYY') : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name={name}
        value={dayjsValue}
        onChange={(newValue) => {
          // Convert the new value to a format your form can handle (DD/MM/YYYY)
          onChange({
            target: {
              name,
              value: newValue ? newValue.format('DD/MM/YYYY') : '', // Format to DD/MM/YYYY
            },
          });
        }}
        slots={{
          textField: (params) => (
            <TextField
              {...params}
              placeholder={"Date of Birth"}
             
              sx={{
                backgroundColor: "#2C333F",
                borderRadius: "0.5rem",
                '& .MuiInputBase-root .MuiSvgIcon-root': {
                  color: 'white', // Change icon color to white
                },
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
                // Change placeholder color
                '& .MuiInputBase-input::placeholder': {
                  color: '#999DAA', // Custom placeholder color
                  opacity: 1, // Ensure the color is applied correctly
                },
              }}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
}
