import React from 'react';
import { NewsFeedIcon } from '../assets';


const NewsFeed = ({  isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, setIsTicket, setIsReading }) => {
    const handleClick = () => {
        setIsCreating(false);
        setIsEditing(false);
        setIsTicket(false); 
        setIsReading(true);
        setIsTicket(false);
        if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
    }

  return (
    <div className='feed-thread' onClick={handleClick}>
    
      <p className='feed-p pt-1.5'>Thread</p>  
      <NewsFeedIcon />
    </div>);
};

export default NewsFeed;
