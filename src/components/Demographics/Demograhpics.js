import {BookedSessions} from '../Sessions'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const onFieldChange = ({dispatch, field, value}) => {
    dispatch({
        type: 'UPDATE_DEMO',
        payload: {
            field,
            value
        }
    })
}

const onFieldBlur = ({dispatch, payload, type}) => {
    dispatch({
        type,
        payload,
    })
}

export const Demographics = ({demographicState, demoDispatch}) => {
    const {firstName, lastName, phone, email, errors} = demographicState
    const firstNameError = errors?.firstName
    const lastNameError = errors?.lastName
    const emailError = errors?.email
    const onFristNameChange = (e) => onFieldChange({
        dispatch: demoDispatch,
        field: 'firstName',
        value: e.target.value,
    })
    const onLastNameChange = (e) => onFieldChange({
        dispatch: demoDispatch,
        field: 'lastName',
        value: e.target.value,
    })
    const onPhoneChange = (e) => onFieldChange({
        dispatch: demoDispatch,
        field: 'phone',
        value: e.target.value,
    })
    const onEmailChange = (e) => onFieldChange({
        dispatch: demoDispatch,
        field: 'email',
        value: e.target.value,
    })

    const onFirstNameBlur = (e) => {
        if ((e.target.value)?.trim()?.length < 1) {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'UPDATE_DEMO_ERROR',
                payload: {
                    field: 'firstName',
                    message: 'Required'
                }
            })
        } else {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'CLEAR_DEMO_ERROR',
                payload: {
                    field: 'firstName',
                }
            })
        }
    }
    const onLastNameBlur = (e) => {
        if ((e.target.value)?.trim()?.length < 1) {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'UPDATE_DEMO_ERROR',
                payload: {
                    field: 'lastName',
                    message: 'Required'
                }
            })
        } else {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'CLEAR_DEMO_ERROR',
                payload: {
                    field: 'lastName',
                }
            })
        }
    }
    const onEmailBlur = (e) => {
        const {value} = e.target
        const trimmedValue = String(value).trim()
        if (trimmedValue.length < 1) {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'UPDATE_DEMO_ERROR',
                payload: {
                    field: 'email',
                    message: 'Required'
                }
            })
        } else
        if (!emailRegex.test(trimmedValue.toLowerCase())) {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'UPDATE_DEMO_ERROR',
                payload: {
                    field: 'email',
                    message: 'Not a valid email'
                }
            })
        } else {
            onFieldBlur({
                dispatch: demoDispatch,
                type: 'CLEAR_DEMO_ERROR',
                payload: {
                    field: 'email',
                }
            })
        }
    }

    const nameClass = (firstNameError || lastNameError ? ' line-input-error' : '') + ' line-input' 
    const emailClass = (emailError ? ' line-input-error' : '') + ' line-input' 
    return (
        <div className='demographics'>
            <div className={nameClass}>
                <div className='field-label'>Name *</div>
                <div className='name-field'>
                    <div className="first-name"><input className='text-input' onChange={onFristNameChange} onBlur={onFirstNameBlur} placeholder='First Name' value={firstName}/>{firstNameError && <div className='error'>{firstNameError}</div>}</div>
                    
                    <div className="last-name"><input className='text-input' onChange={onLastNameChange} onBlur={onLastNameBlur} placeholder='Last Name' value={lastName}/>{lastNameError && <div className='error'>{lastNameError}</div>}</div>
                    
                </div>
                
            </div>
            <div className='line-input'>
                <div className='field-label'>Phone</div>
                <div><input className='text-input' onChange={onPhoneChange} placeholder='Phone' value={phone}/></div>
            </div>
            <div className={emailClass}>
                <div className='field-label'>Email *</div>
                <div><input className='text-input' onChange={onEmailChange} onBlur={onEmailBlur} placeholder='Email' value={email}/></div>
                {emailError && <div className='error'>{emailError}</div>}
            </div>
        </div>
    )
}

const ChangeLink = ({onClick}) => {
    return <button onClick={onClick} >&lt; change</button>
}

export const DemographicsWithSession = props => {
    return (
        <div className='form-body'>
            <BookedSessions {...props}/>
            <ChangeLink onClick={props.onBackClick}/>
            <Demographics {...props} />
        </div>
    )
}