import React from 'react';
import { AddTicket } from '../assets'




const OpenTicket = ( {  isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, setIsTicket, setIsReading }) => {

    const handleClick = () => {
        setIsCreating(false);
        setIsEditing(false);
        setIsTicket(false); 
        setIsReading(false);
        setIsTicket(true);
        if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
    }
    return (
        <div className='feed-ticket' onClick={handleClick}>
            <p className="feed-p">
                Create a ticket
            </p>
            <AddTicket/>
        </div>
    );
};

export default OpenTicket;
