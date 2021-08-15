import { useState, useReducer } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';
import steps from './configs/steps';
import {sessionReducer, demographicReducer} from './reducers';

const NavigationButton = ({onNextClick, label, disable}) => {
  return <button disable={disable} onClick={onNextClick}>{label}</button>
}

const BackButton = ({onBackClick, label}) => {
  return <button onClick={onBackClick}>{label}</button>
}

function App() {
  const [stepId, setStepId] = useState(1)
  const [formValid, setFormValid] = useState(false)
  const [state, dispatch] = useReducer(sessionReducer, {})
  const [demographicState, demoDispatch] = useReducer(demographicReducer, {})
  const targetStep = steps.find(step => step.id === stepId)
  const {navigatorButtonLabel, backButtonLabel, component} = targetStep || {}
  const CurrentStepComponent = component
  const onNextClick = () => setStepId((stepId + 1) % 3)
  const onBackClick = () => setStepId((stepId - 1) % 3)
  console.log(111111111, state, demographicState)
  return (
    <div className='app centered'>
      <h1>Book a wellness session.</h1>
      <div>Visit one of our expert consultants to get yourself feeling 100% again.</div>
      <ProgressBar stepId={stepId}/>
      {backButtonLabel && <BackButton onBackClick={onBackClick} label={backButtonLabel}/>}
      <CurrentStepComponent setFormValid={setFormValid} dispatch={dispatch} demoDispatch={demoDispatch} state={state} demographicState={demographicState}/>
      <NavigationButton disable={!formValid} onNextClick={onNextClick} label={navigatorButtonLabel}/>
    </div>
  );
}

export default App;
