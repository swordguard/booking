import React from  'react'
import steps from '../configs/steps'

// const ArrowRight = () => {
//     return <div class="arrow-right"></div>
// }

const StepBar = ({label, isFirstStep, isLastStep, isCurrent, id, stepId}) => {
    const classes = (id === stepId ? 'current-step' : '') +  ' centered stepbar'
    return (
        <span className={classes}>
            {/* {!isFirstStep && <ArrowRight />} */}
            <div>{label}</div>
            {/* {!isLastStep && <ArrowRight />} */}
        </span>
    )
}

const renderProgressBar = ({stepId}) => {
    return steps.map(step => {
        const  {id} = step
        return <StepBar key={id} {...step} stepId={stepId}/>
    })
}
const ProgressBar = ({stepId}) => {
    return <div className='progress-bar flex-center'>
        {renderProgressBar({stepId})}
    </div>
       
}

export default ProgressBar