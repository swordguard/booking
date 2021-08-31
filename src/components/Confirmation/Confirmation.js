import { BookedSessions } from "../Sessions";

export const Confirmation = (props) => {
  const { state, setStepId, dispatch } = props;

  const onScheduleAnotherClick = () => {
    setStepId(1);
    dispatch({
      type: "SCHEDULE_ANOTHER",
      payload: state,
    });
    // dispatch({
    //   type: "CLEAR",
    // });
  };
  return (
    <div>
      <BookedSessions />
      <button onClick={onScheduleAnotherClick}>
        Schedule another Appointment &gt;
      </button>
    </div>
  );
};
