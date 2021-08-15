
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
    case 'CLEAR':
      return {};
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
      if (errors) {
        delete errors[field]
      }
      return {
        ...state,
        errors
    };
    default:
      throw new Error();
  }
}

export const scheduleAnotherReducer = (state, action) => {
  const {payload, type} = action
  switch (type) {
    case 'SCHEDULE_ANOTHER':
      const newState = {
        ...state,
        history: {
          ...state.history,
          ...payload,
        }
    }
      return newState;
    default:
      throw new Error();
  }
}