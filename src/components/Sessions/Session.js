import {useState, useEffect} from  'react'

import 'react-datepicker/dist/react-datepicker.css';
import sessions from '../../configs/sessions'
import MyDateAndTimePicker from './MyDateAndTimePicker'

import {formatDateToNumber, checkIfSessionIsBooked} from '../../utils'

const SessionTitle = ({sessionName, price}) => {
    return (
        <div className='left'>
                <div className='bold'>{sessionName}</div>
                <div>30 minutes @ ${price}.00</div>
        </div>
    )
}

const Session = ({openedSession, setOpenedSession,bookedSession, name, price, onDateSelect, onTimeSelect, dispatch, state}) => {
    const [showDownArrow, setShowDownArrow] = useState(false);
    const onSessionTittleClick = () => {
        setShowDownArrow(!showDownArrow)
        setOpenedSession(name)
    }
    const onSessionTimeSelect = (name) => ({selectedDate, label, index}) => {
        onTimeSelect({sessionName: name, selectedDate, label, index})
    }

    useEffect(() => {
        setShowDownArrow(openedSession === name)
    }, [openedSession])

    return <div className='session-container'>
        <div onClick={onSessionTittleClick} className='flex-space-between session'>
            <SessionTitle sessionName={name} price={price}/>
            {showDownArrow && <div className='flex-center'>\/</div>}
        </div>
        {showDownArrow && <MyDateAndTimePicker
            bookedSession={bookedSession}
            onDateSelect={onDateSelect}
            onTimeSelect={onSessionTimeSelect(name)}
            dispatch={dispatch}
            state={state}
            sessionName={name}
            />
        }
    </div>
}

export const Sessions = ({state, dispatch}) => {
    const [openedSession, setOpenedSession] = useState()
    const onTimeSelect = ({sessionName, label, index, selectedDate}) => {
        console.log('onTimeSelect', sessionName,label, index, selectedDate)
        dispatch({
            type: 'UPDATE_TIME', 
            payload: {
                sessionName,
                date: formatDateToNumber(selectedDate), 
                timeSlot: index
            }
        })
    }
    const onDateSelect = (date) => {
        dispatch({type: 'UPDATE_DATE', payload: formatDateToNumber(date)})
    }

    
    const bookedSession = checkIfSessionIsBooked(state)
    useEffect(() => {
        if (bookedSession) {
            setOpenedSession(bookedSession.sessionName)
        }
    }, [])
    
    return <div className='flex-center form-body'>
    {
        sessions.map(session => {
            const {id} = session
            return <Session key={id} {...session} 
                openedSession={openedSession}
                setOpenedSession={setOpenedSession}
                bookedSession={bookedSession}
                onTimeSelect={onTimeSelect}
                onDateSelect={onDateSelect}
                state={state}
                dispatch={dispatch}
            />
        })
    }
    </div>
}
