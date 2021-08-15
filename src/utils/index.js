export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString(undefined, options)
}

export const formatDateToNumber = (date) => date.valueOf()

const timeInterval = 0.5
const timeStart = 10
const timeEnd = 16

export const availableTimeSlots = (timeEnd - timeStart) / timeInterval

export const getTimeLabelValue = (i) => {
    const minutes = i % 2 === 0 ? '00' : '30'
    let hours = Math.floor(timeStart + (i) / 2)
    if (hours >= 13) {
        hours = hours - 12
    }
    const amOrPm = timeStart + i / 2 < 12 ? 'am' : 'pm'
    const minuteLabel = minutes + amOrPm
    return `${hours}:${minuteLabel}`
}

export const checkIfSessionIsBooked = (state) => {
    const bookedSessionDates = Object.keys(state)
    // ['168932165979']
    const bookedSessions = Object.values(state)
    // [{0: "Physiotheropy"}]
    if (bookedSessionDates.length === 0 || bookedSessions.length === 0) {
        return false
    }
    return bookedSessionDates.map(date => {
        const valueObj = state[date]
        const timeSlot = Object.keys(valueObj)[0]
        const sessionName = Object.values(valueObj)[0]
        return {
            bookedDate: date,
            timeSlot,
            sessionName,
        }
    })
    // const bookedDate = bookedSessionDates[0]
    // const timeSlot = Object.keys(bookedSession[0])[0]
    // const sessionName = Object.values(bookedSession[0])[0]
    // if (bookedDate) {
    //     return {
    //         bookedDate,
    //         timeSlot,
    //         sessionName,
    //     }
    // }
}