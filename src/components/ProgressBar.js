import React from  'react'
import steps from '../configs/steps'

const ArrowRight = () => {
    return <div class="arrow-right"></div>
}

const StepBar = ({label, isFirstStep, isLastStep, isCurrent}) => {
    const classes = (isCurrent ? 'current-step' : '') +  ' centered stepbar'
    return (
        <div className={classes}>
            {!isFirstStep && <ArrowRight />}
            {label}
            {!isLastStep && <ArrowRight />}
        </div>
    )
}
const ProgressBar = () => {
    return steps.map(step => {
        const  {id} = step
        return <StepBar key={id} {...step}/>
    })
}

export default ProgressBar