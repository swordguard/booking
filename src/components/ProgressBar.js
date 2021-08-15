import React from  'react'
import steps from '../configs/steps'

// const ArrowRight = () => {
//     return <div class="arrow-right"></div>
// }

const StepBar = ({label, isFirstStep, isLastStep, isCurrent}) => {
    const classes = (isCurrent ? 'current-step' : '') +  ' centered stepbar'
    return (
        <span className={classes}>
            {/* {!isFirstStep && <ArrowRight />} */}
            <div>{label}</div>
            {/* {!isLastStep && <ArrowRight />} */}
        </span>
    )
}

const renderProgressBar = () => {
    return steps.map(step => {
        const  {id} = step
        return <StepBar key={id} {...step}/>
    })
}
const ProgressBar = () => {
    return <div className='progress-bar flex-center'>
        {renderProgressBar()}
    </div>
       
}

export default ProgressBar