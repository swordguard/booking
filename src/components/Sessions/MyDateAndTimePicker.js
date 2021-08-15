import React, {useEffect, useState} from  'react'
import DatePicker from "react-datepicker";
import {formatDateToNumber, availableTimeSlots, getTimeLabelValue, formatDate} from '../../utils'

const TimeRangeSelection = ({onTimeSelect, timeSlot, disabledSlots = []}) => {
    return (
        <div>
            <div>Please select a time</div>
            <div>
            <fieldset id="group">
                {
                    Array(availableTimeSlots).fill().map((v, i) => {
                        const change= (e) => onTimeSelect()(e.target.value, i)
                        const timeLabel = getTimeLabelValue(i)
                        const disabled = disabledSlots.includes(String(i))
                        return <div key={i} className={disabled ? 'disabled-radio' : ''}>
                                {Number(timeSlot) === i ?
                                    <input type='radio' key={i} id={i} checked  onChange={change} name="group" value={timeLabel}/> :
                                    <input type='radio' key={i} id={i} disabled={disabled} onChange={change} name="group" value={timeLabel}/>    
                                }
                                <label htmlFor={i}>{timeLabel}</label>
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

const MyDateAndTimePicker = ({ occupiedSlots, scheduleAnotherState, sessionName, onDateSelect, onTimeSelect, dispatch, bookedSession }) => {
    const [startDate, setStartDate] = useState(bookedSession && bookedSession.sessionName === sessionName
         ? new Date(Number(bookedSession.bookedDate)) : new Date());
    const [timeSlot, setTimeSlot] = useState();
    const [disabledSlots, setDisabledSlots] = useState([]);
    const onDatePickerChange = (dateSelected) => {
        onDateSelect(dateSelected)
        setStartDate(dateSelected)
    }

    const onTimeSelectWithDate = (date) => (label, index) => {
        // remove prepopulated timeSlot
        setTimeSlot()
        onTimeSelect({selectedDate: formatDateToNumber(date), label, index})
    }

    if (scheduleAnotherState && scheduleAnotherState.history) {

    }
    useEffect(() => {
        if (bookedSession) {
            if (bookedSession.sessionName === sessionName) {
                setTimeSlot(bookedSession.timeSlot)
            }
        }
    }, [])

    useEffect(() => {
        // [{1629022271684: "0"}, {1629022272344: "1"}]
        if (occupiedSlots) {
            const filteredSlotsDates = occupiedSlots.filter(slot => {
                const date = Object.keys(slot)[0]
                const formattedDate = new Date(Number(date))
                const occupiedYear = formattedDate.getFullYear()
                const occupiedMonth = formattedDate.getMonth()
                const occupiedDate = formattedDate.getDate()

                const formattedSelectedDate = startDate
                const selectedYear = formattedSelectedDate.getFullYear()
                const selectedMonth = formattedSelectedDate.getMonth()
                const selectedDate = formattedSelectedDate.getDate()

                return `${occupiedYear}${occupiedMonth}${occupiedDate}` === `${selectedYear}${selectedMonth}${selectedDate}`
            })
            if (filteredSlotsDates.length > 0) {
                const updatedDisabledSlots = filteredSlotsDates.map(slot => Object.values(slot)[0])
                setDisabledSlots(updatedDisabledSlots)
            } else {
                setDisabledSlots([])
            }
        }
    }, [occupiedSlots, startDate])

    // console.log('disabledSlots in render', occupiedSlots, disabledSlots)
    
    return (
        <>
            <MyDatePicker onDatePickerChange={onDatePickerChange} dispatch={dispatch} startDate={startDate}/>
            <TimeRangeSelection onTimeSelect={() => onTimeSelectWithDate(startDate)} timeSlot={timeSlot} disabledSlots={disabledSlots}/>  
        </>
    )
}

export default MyDateAndTimePicker