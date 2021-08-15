import {Sessions} from "../components/Sessions"
import {DemographicsWithSession} from '../components/Demographics'
import {Confirmation} from '../components/Confirmation'

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
        component: DemographicsWithSession,
        navigatorButtonLabel: 'Complete Appointment',
    },
    {
        id: 3,
        name: 'confirmation',
        label: 'Confirmation',
        isLastStep: true,
        component: Confirmation,
        navigatorButtonLabel: 'Reschedule'
    }
]


export default steps