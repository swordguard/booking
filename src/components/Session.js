import React, {useState} from  'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const MyDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
};

const SessionTitle = ({sessionName, price}) => {
    
    return (
        <div >
                <div>{sessionName}</div>
                <div>30 minutes @ ${price}.00</div>
            
        </div>
    )
}

const DatePick = () => {
    return <MyDatePicker />
}

const Session = ({sessionName, price}) => {
    const [showDownArrow, setShowDownArrow] = useState(false);
    const onSessionTittleClick = () => {
        setShowDownArrow(!showDownArrow)
    }
    return <div onClick={onSessionTittleClick}>
        <div  className='flex-space-between'>
            <SessionTitle sessionName={sessionName} price={price}/>
            {showDownArrow && <div>\/</div>}
        </div>
        {showDownArrow &&<DatePick />}
    </div>
}

export default Session