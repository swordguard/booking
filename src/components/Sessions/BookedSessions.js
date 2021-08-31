import { useContext } from "react";
import { getTimeLabelValue, formatDate } from "../../utils";
import { ContextProvider } from "../../provider";
import { stepNames } from "../../configs/steps";

export const BookedSessions = () => {
  const state = useContext(ContextProvider)[stepNames[0]];
  console.log(1113, useContext(ContextProvider), stepNames[0]);
  return Object.keys(state)
    .filter((key) => state[key])
    .map((key) => {
      const valueObj = state[key];
      const timeSlot = Object.keys(valueObj)[0];
      const sessionName = valueObj[timeSlot];
      const time = getTimeLabelValue(timeSlot);
      const date = `${formatDate(new Date(Number(key)))} ${time}`;
      return (
        <div key={key + timeSlot}>
          {sessionName} {date}
        </div>
      );
    });
};

export default BookedSessions;
