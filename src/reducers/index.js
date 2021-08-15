
export const sessionReducer = (state, action) => {
    const {payload, type} = action
  switch (type) {
    case 'UPDATE_DATE':
      return {
        [payload]: ''
    };
    case 'UPDATE_TIME':
        const {date, timeSlot, sessionName} = payload
      return {
        [date]: {
            [timeSlot]: sessionName
        }
    };
    default:
      throw new Error();
  }
}

export const demographicReducer = (state, action) => {
  const {payload: {field, value, message} = {}, type} = action
  switch (type) {
    case 'UPDATE_DEMO':
      return {
        ...state,
        [field]: value
    };
    case 'UPDATE_DEMO_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [field]: message,
        }
    };
    case 'CLEAR_DEMO_ERROR':
      const errors = state.errors
      delete errors[field]
      return {
        ...state,
        errors
    };
    default:
      throw new Error();
  }
}