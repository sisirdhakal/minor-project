import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

function DateComp(props) {
    const [value, setValue] = useState(
        dayjs(new Date()),
    );
    // console.log()
    const handleChange = (newValue) => {
        setValue(newValue);
        const date = dayjs(newValue).format("YYYY-MM-DD")
        // console.log(date)
        const lectureId = props.lectureId
        props?.getData(lectureId + "-" + date, date)
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex justify-center items-center text-secondary-text'>
                <div>
                    <p className='font-semibold'>Select Date :</p>
                    <DatePicker
                        label=""
                        inputFormat="YYYY/MM/DD"
                        className=''
                        value={value}
                        onChange={handleChange}
                        PopperProps={{
                            sx: {
                                '& .MuiPaper-root': {
                                    backgroundColor: 'white',
                                }
                            }
                        }}
                        InputProps={{
                            sx: {
                                '&:focus': {
                                    border: "0px",
                                    outline: "0px",
                                    color: "white"
                                },
                                outline: 0
                            }
                        }}
                        renderInput={(params) => <TextField variant='outlined' css={{ border: 0, outline: "none" }} style={{ outline: "none" }} sx={[
                            {
                                '&:focus': {
                                    border: "0px",
                                    outline: "0px",
                                    color: "white"
                                }
                            }
                        ]}  {...params} />}
                    />
                </div>
            </div>
        </LocalizationProvider>
    );

}

export default DateComp;
