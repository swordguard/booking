
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

    return (
        <div>
            <div>
                <div>Name *</div>
                <div><input className='text-input' onChange={onFristNameChange} onBlur={onFirstNameBlur} placeholder='First Name' value={firstName}/></div>
                {firstNameError && <div>{firstNameError}</div>}
                <div><input className='text-input' onChange={onLastNameChange} onBlur={onLastNameBlur} placeholder='Last Name' value={lastName}/></div>
                {lastNameError && <div>{lastNameError}</div>}
            </div>
            <div>
                <div>Phone</div>
                <div><input className='text-input' onChange={onPhoneChange} placeholder='Phone' value={phone}/></div>
            </div>
            <div>
                <div>Email *</div>
                <div><input className='text-input' onChange={onEmailChange} onBlur={onEmailBlur} placeholder='Email' value={email}/></div>
                {emailError && <div>{emailError}</div>}
            </div>
        </div>
    )
}