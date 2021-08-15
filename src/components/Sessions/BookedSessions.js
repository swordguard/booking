import {getTimeLabelValue, formatDate} from '../../utils'

export const BookedSessions = (props) => {
    const {state} = props
    return Object.keys(state).filter(key => state[key])
        .map(key => {
            const valueObj = state[key]
            const timeSlot = Object.keys(valueObj)[0]
            const sessionName = valueObj[timeSlot]
            const time = getTimeLabelValue(timeSlot)
            const date = `${formatDate(new Date(Number(key)))} ${time}` 
            return <div key={key+timeSlot}>{sessionName} {date}</div>
            return {
                sessionName,
                date,
                time,
            }
        })
}

export default BookedSessions