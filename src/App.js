import { useState, useReducer } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import { steps } from "./configs/steps";
import { AppContextProvider } from "./provider";

const NavigationButton = ({ onNextClick, label, disable }) => {
  return (
    <button disable={String(disable)} onClick={onNextClick}>
      {label}
    </button>
  );
};

const BackButton = ({ onBackClick, label }) => {
  return <button onClick={onBackClick}>{label}</button>;
};

function App() {
  const [stepId, setStepId] = useState(1);
  // const [state, dispatch] = useReducer(sessionReducer, {});
  // const [demographicState, demoDispatch] = useReducer(demographicReducer, {});
  // const [scheduleAnotherState, scheduleAnotherDispatch] = useReducer(
  //   scheduleAnotherReducer,
  //   {}
  // );
  const targetStep = steps.find((step) => step.id === stepId);
  const {
    navigatorButtonLabel,
    backButtonLabel,
    isLastStep,
    component,
    reducer,
    name,
  } = targetStep || {};
  const [state, dispatch] = useReducer(reducer, {});
  const CurrentStepComponent = component;
  const onNextClick = () => setStepId(isLastStep ? 1 : stepId + 1);
  const onBackClick = () => setStepId(stepId - 1);
  console.log(111111, stepId, reducer, state);
  return (
    <div className="app centered">
      <h1>Book a wellness session.</h1>
      <div>
        Visit one of our expert consultants to get yourself feeling 100% again.
      </div>
      <ProgressBar stepId={stepId} />
      {backButtonLabel && (
        <BackButton onBackClick={onBackClick} label={backButtonLabel} />
      )}
      <AppContextProvider provider={state}>
        <CurrentStepComponent
          stepName={name}
          dispatch={dispatch}
          stepId={stepId}
          setStepId={setStepId}
          onBackClick={onBackClick}
        />
      </AppContextProvider>
      <NavigationButton
        onNextClick={onNextClick}
        label={navigatorButtonLabel}
      />
    </div>
  );
}

export default App;
