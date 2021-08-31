import { useState, useEffect, useContext } from "react";

import "react-datepicker/dist/react-datepicker.css";
import sessions from "../../configs/sessions";
import MyDateAndTimePicker from "./MyDateAndTimePicker";
import { ContextProvider } from "../../provider";

import { formatDateToNumber, checkIfSessionIsBooked } from "../../utils";

const SessionTitle = ({ sessionName, price }) => {
  return (
    <div className="left">
      <div className="bold">{sessionName}</div>
      <div>30 minutes @ ${price}.00</div>
    </div>
  );
};

const Session = ({
  openedSession,
  setOpenedSession,
  bookedSession,
  occupiedSlots,
  name,
  price,
  onDateSelect,
  onTimeSelect,
  // dispatch,
}) => {
  const [showDownArrow, setShowDownArrow] = useState(false);
  const onSessionTittleClick = () => {
    setShowDownArrow(!showDownArrow);
    setOpenedSession(name);
  };
  const onSessionTimeSelect =
    (name) =>
    ({ selectedDate, label, index }) => {
      onTimeSelect({ sessionName: name, selectedDate, label, index });
    };

  useEffect(() => {
    setShowDownArrow(openedSession === name);
  }, [openedSession]);

  return (
    <div className="session-container">
      <div
        onClick={onSessionTittleClick}
        className="flex-space-between session"
      >
        <SessionTitle sessionName={name} price={price} />
        {showDownArrow && <div className="flex-center">\/</div>}
      </div>
      {showDownArrow && (
        <MyDateAndTimePicker
          bookedSession={bookedSession}
          occupiedSlots={occupiedSlots}
          onDateSelect={onDateSelect}
          onTimeSelect={onSessionTimeSelect(name)}
          // dispatch={dispatch}
          // state={state}
          sessionName={name}
        />
      )}
    </div>
  );
};

export const Sessions = ({ dispatch, scheduleAnotherState, stepName }) => {
  const sessionContext = useContext(ContextProvider)[stepName];
  const [openedSession, setOpenedSession] = useState();
  const [occupiedSlots, setOccupiedSlots] = useState();
  const onTimeSelect = ({ sessionName, label, index, selectedDate }) => {
    dispatch({
      type: "UPDATE_TIME",
      stepName,
      payload: {
        sessionName,
        date: formatDateToNumber(selectedDate),
        timeSlot: index,
      },
    });
  };
  const onDateSelect = (date) => {
    dispatch({
      type: "UPDATE_DATE",
      stepName,
      payload: formatDateToNumber(date),
    });
  };

  const bookedSession = checkIfSessionIsBooked(sessionContext)[0];
  useEffect(() => {
    if (bookedSession) {
      setOpenedSession(bookedSession.sessionName);
    }
  }, []);

  useEffect(() => {
    if (scheduleAnotherState && scheduleAnotherState.history) {
      const historyState = scheduleAnotherState.history;
      const occupiedSessions = checkIfSessionIsBooked(historyState);
      if (Array.isArray(occupiedSessions)) {
        const slots = occupiedSessions.map(({ bookedDate, timeSlot }) => ({
          [bookedDate]: timeSlot,
        }));
        setOccupiedSlots(slots);
      }
    }
  }, []);

  return (
    <div className="flex-center form-body">
      {sessions.map((session) => {
        const { id } = session;
        return (
          <Session
            key={id}
            {...session}
            openedSession={openedSession}
            setOpenedSession={setOpenedSession}
            bookedSession={bookedSession}
            occupiedSlots={occupiedSlots}
            onTimeSelect={onTimeSelect}
            onDateSelect={onDateSelect}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
};
