import {Sessions, BookedSessions} from "../components/Sessions"


const steps = [
    {
        id: 1,
        name: 'chooseAppointment',
        label: 'Choose Appointment',
        isFirstStep: true,
        component: Sessions,
        navigatorButtonLabel: 'Continue'
    },
    {
        id: 2,
        name: 'yourInfo',
        label: 'Your Info',
        component: BookedSessions,
        backButtonLabel: '< change',
        navigatorButtonLabel: 'Complete Appointment',
    },
    {
        id: 3,
        name: 'confirmation',
        label: 'Confirmation',
        isLastStep: true,
        navigatorButtonLabel: 'Reschedule'
    }
]


export default steps