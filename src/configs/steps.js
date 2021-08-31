import { Sessions } from "../components/Sessions";
import { DemographicsWithSession } from "../components/Demographics";
import { Confirmation } from "../components/Confirmation";
import {
  sessionReducer,
  demographicReducer,
  scheduleAnotherReducer,
} from "../reducers";

export const stepNames = {
  0: "chooseAppointment",
  1: "yourInfo",
  2: "confirmation",
};
export const steps = [
  {
    id: 1,
    name: stepNames[0],
    label: "Choose Appointment",
    isFirstStep: true,
    component: Sessions,
    navigatorButtonLabel: "Continue",
    reducer: sessionReducer,
  },
  {
    id: 2,
    name: stepNames[1],
    label: "Your Info",
    component: DemographicsWithSession,
    navigatorButtonLabel: "Complete Appointment",
    reducer: demographicReducer,
  },
  {
    id: 3,
    name: stepNames[2],
    label: "Confirmation",
    isLastStep: true,
    component: Confirmation,
    navigatorButtonLabel: "Reschedule",
    reducer: scheduleAnotherReducer,
  },
];
