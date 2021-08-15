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
    const bookedSessionDate = Object.keys(state)
    const bookedSession = Object.values(state)
    // ['168932165979']
    // [{0: "Physiotheropy"}]
    if (bookedSessionDate.length === 0 || bookedSession.length === 0) {
        return false
    }
    const bookedDate = bookedSessionDate[0]
    const timeSlot = Object.keys(bookedSession[0])[0]
    const sessionName = Object.values(bookedSession[0])[0]
    if (bookedDate) {
        return {
            bookedDate,
            timeSlot,
            sessionName,
        }
    }

    return false
}