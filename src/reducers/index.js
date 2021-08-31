export const sessionReducer = (state, action) => {
  const { payload, type, stepName } = action;
  switch (type) {
    case "UPDATE_DATE":
      return {
        ...state,
        [stepName]: {
          [payload]: "",
        },
      };
    case "UPDATE_TIME":
      const { date, timeSlot, sessionName } = payload;
      return {
        ...state,
        [stepName]: {
          [date]: {
            [timeSlot]: sessionName,
          },
        },
      };
    case "CLEAR":
      return { [stepName]: {} };
    case "SCHEDULE_ANOTHER":
      return { [stepName]: {} };
    default:
      throw new Error();
  }
};

export const demographicReducer = (state, action) => {
  const { payload: { field, value, message } = {}, type, stepName } = action;
  console.log(1112, state, action);
  switch (type) {
    case "UPDATE_DEMO":
      return {
        ...state,
        [stepName]: {
          ...state[stepName],
          [field]: value,
        },
      };
    case "UPDATE_DEMO_ERROR":
      return {
        ...state,
        [stepName]: {
          ...state[stepName],
          errors: {
            ...state[stepName]?.errors,
            [field]: message,
          },
        },
      };
    case "CLEAR_DEMO_ERROR":
      const errors = state[stepName].errors;
      if (errors) {
        delete errors[field];
      }
      return {
        ...state,
        [stepName]: {
          ...state[stepName],
          errors,
        },
      };
    default:
      throw new Error();
  }
};

export const scheduleAnotherReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SCHEDULE_ANOTHER":
      const newState = {
        ...state,
        history: {
          ...state.history,
          ...payload,
        },
      };
      return newState;
    default:
      throw new Error();
  }
};
