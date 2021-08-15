import {Sessions, BookedSessions} from "../components/Sessions"
import {Demographics} from '../components/Demographics'

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
        component: Demographics,
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