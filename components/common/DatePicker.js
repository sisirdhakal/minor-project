import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

function DateComp() {
    const [value, setValue] = useState(
        dayjs('2023-02-23T21:11:54'),
    );

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex justify-center items-center text-secondary-text p-3'>
                <DatePicker
                    label="Date"
                    inputFormat="YYYY/MM/DD"
                    className=''
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
    );

}

export default DateComp;
