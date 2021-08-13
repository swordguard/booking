import Session from "../components/Session"

const steps = [
    {
        id: 1,
        name: 'chooseAppointment',
        label: 'Choose Appointment',
        isFirstStep: true,
        component: Session,
        navigatorButtonLabel: 'Continue'
    },
    {
        id: 2,
        name: 'yourInfo',
        label: 'Your Info',
        // component: Session,
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