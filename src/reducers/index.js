
const dateReducer = (state, action) => {
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

export default dateReducer