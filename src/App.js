import { useState } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';
import steps from './configs/steps';

const NavigationButton = ({onNextClick, label, disable}) => {
  return <button disable={disable} onClick={onNextClick}>{label}</button>
}

function App() {
  const [stepId, setStepId] = useState(1)
  const [formValid, setFormValid] = useState(false)
  const targetStep = steps.find(step => step.id === stepId)
  const {navigatorButtonLabel, component} = targetStep || {}
  const CurrentStepComponent = component
  const onNextClick = setStepId(stepId + 1 / 3)
  return (
    <div className="App">
      <ProgressBar />
      <CurrentStepComponent setFormValid={setFormValid}/>
      <NavigationButton disable={!formValid} onNextClick={onNextClick} label={navigatorButtonLabel}/>
    </div>
  );
}

export default App;
