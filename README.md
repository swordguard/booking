steps to run the app

1. npm install
2. npm start


Functionality:

1. only being able to book a session at a time, if wanting to book multiple session, have to finish one and click "Schedule another Appointment" button on the confirmation page to start another one, all booked sessions will be saved only in client end.

2. booked time slots are saved, can't book multiple sessions at the same time slots of the same day.

3. no state management libs are used here, only local states at the root component level are used as the global states

4. states structure

4.1 sessionState: points to step one

    {
        [bookedDateTimeInNumberFormat]: [indexOfTimeSlots]
    }

each day available time period is from 10am to 4pm, every 30 minutes as a slot, so there are 12 slots in a single day, indexOfTimeSlots starts from 0 to 11

4.2 demographicState: poinst to step two

    {
        [fieldName]: value
    }

fieldName includes: firstName, lastName, phone and email

4.3 Schedule another Appointment state

scheduleAnotherState: points to booking history

    {
        history: [sessionState]
    }

scheduleAnotherState is used to make sure already booked time slots are not available to next bookings, will grey out the the slots selection in UI

5. TODO

5.1 Code refactoring on step 2, refacotr demographic form generating process

5.2 form validation to be improved

5.3 styling to be made better

5.4 confirmation page

5.5 fix warnings in console

6. Anything else

may use useContext() from react to replace current props drilling which might be cumbersome.

7. Testing

just run 'npm test'

8. UI reference

https://www.figma.com/file/aHRZE4apW18XaCkHMr3OMv/Veyor-Wellness---design-exercise?node-id=0