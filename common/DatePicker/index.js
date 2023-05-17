import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';

function DateComp(props) {

    const dispatch = useDispatch()
    const { setAttendanceDate } = bindActionCreators(actionCreators, dispatch)
    const { attendanceDate } = useSelector(state => state.teachersData)

    const handleChange = (newValue) => {
        setAttendanceDate(newValue)
        // const date = dayjs(newValue).format("YYYY-MM-DD")
        // const lectureId = props.lectureId
        // props?.getData(lectureId + "-" + date)
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex justify-center items-center text-secondary-text'>
                <div>
                    <DatePicker
                        label=""
                        inputFormat="YYYY/MM/DD"
                        className='bg-[#caf0f8] border-none outline-none h-8'
                        value={attendanceDate}
                        onChange={handleChange}
                        style={{ height: "32px"}}
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
