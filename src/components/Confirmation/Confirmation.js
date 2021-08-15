import {BookedSessions} from '../Sessions'

export const Confirmation = (props) => {
    
    const {state, setStepId, dispatch, scheduleAnotherDispatch} = props

    const onScheduleAnotherClick = () => {
        setStepId(1)
        scheduleAnotherDispatch({
            type: 'SCHEDULE_ANOTHER',
            payload: state
        })
        dispatch({
            type: 'CLEAR',
        })
    }
    return (
        <div>

        <BookedSessions {...props}/>
        <button onClick={onScheduleAnotherClick}>Schedule another Appointment &gt;</button>
        </div>
    )
}