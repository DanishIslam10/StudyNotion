import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

const MyRadioGroup = ({name,value,onChange}) => {

    return (
        <RadioGroup
            name={name}
            value={value}
            onChange={onChange}
            row // This prop makes the radio buttons display in a row
            className='bg-[#2C333F] rounded-md py-[0.1rem] px-[0.6rem] '
        >
            <FormControlLabel className='text-[#999DAA] ' value="male" control={<Radio
                sx={{ color: '#999DAA', '&.Mui-checked': { color: '#FFD60A' } }}
            />} label="Male" />
            <FormControlLabel className='text-[#999DAA] ' value="female" control={<Radio
                sx={{ color: '#999DAA', '&.Mui-checked': { color: '#FFD60A' } }}
            />} label="Female" />
            <FormControlLabel className='text-[#999DAA] ' value="other" control={<Radio
                sx={{ color: '#999DAA', '&.Mui-checked': { color: '#FFD60A' } }}
            />} label="Other" />
        </RadioGroup>
    );
};

export default MyRadioGroup;
