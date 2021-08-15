import React, {useEffect, useState} from  'react'
import DatePicker from "react-datepicker";
import {formatDateToNumber, availableTimeSlots, getTimeLabelValue} from '../../utils'

const TimeRangeSelection = ({onTimeSelect, timeSlot}) => {
    return (
        <div>
            <div>Please select a time</div>
            <div>
            <fieldset id="group">
                {
                    Array(availableTimeSlots).fill().map((v, i) => {
                        const change= (e) => onTimeSelect()(e.target.value, i)
                        const timeLabel = getTimeLabelValue(i)
                        return <div key={i}>
                                {Number(timeSlot) === i ?
                                    <input type='radio' key={i} id={i} checked onChange={change} name="group" value={timeLabel}/> :
                                    <input type='radio' key={i} id={i} onChange={change} name="group" value={timeLabel}/>    
                                }
                                <label className='strikethrough' htmlFor={i}>{timeLabel}</label>
                        </div>
                    })
                }
                </fieldset>
            </div>
        </div>
    )
}


const MyDatePicker = ({startDate, onDatePickerChange}) => {
    return (
      <DatePicker selected={startDate} onChange={(date) => onDatePickerChange(date)} 
        inline 
        minDate={new Date()}
      />
    );
};

const MyDateAndTimePicker = ({ onDateSelect, onTimeSelect, dispatch, bookedSession }) => {
    console.log(111, bookedSession.bookedDate, Number(bookedSession.bookedDate))
    const [startDate, setStartDate] = useState(bookedSession ? new Date(Number(bookedSession.bookedDate)) : new Date());
    const [timeSlot, setTimeSlot] = useState();
    const onDatePickerChange = (dateSelected) => {
        onDateSelect(dateSelected)
        setStartDate(dateSelected)
    }

    const onTimeSelectWithDate = (date) => (label, index) => {
        // remove prepopulated timeSlot
        setTimeSlot()
        onTimeSelect({selectedDate: formatDateToNumber(date), label, index})
    }

    useEffect(() => {
        if (bookedSession) {
            setTimeSlot(bookedSession.timeSlot)
        }
    }, [])
    
    return (
        <>
            <MyDatePicker onDatePickerChange={onDatePickerChange} dispatch={dispatch} startDate={startDate}/>
            <TimeRangeSelection onTimeSelect={() => onTimeSelectWithDate(startDate)} timeSlot={timeSlot}/>  
        </>
    )
}

export default MyDateAndTimePicker