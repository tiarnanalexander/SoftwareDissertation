import React from 'react';

import {Channel, useChatContext, MessageTeam} from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel, CreateTicket, ActivityFeed} from '.';


const ChannelContainer = ({
    isCreating, setIsCreating, isEditing, setIsEditing, createType, isTicket, setIsTicket, isReading, setIsReading}) => {
  

    if(isCreating) {
        return(
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isTicket) {
        return(
            <div className="channel__container">
                <CreateTicket setIsTicket={setIsTicket} />
            </div>
        )
    }

    if(isReading) {
        return(
            <div className="channel__container">
                <ActivityFeed setIsReading={setIsReading} />
            </div>
        )
    }

    if(isEditing) {
        return(
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        )
    }
   

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history</p>
            <p className="channel-empty__second">Send messages, attachments, links and more!</p>
        </div>
    )
    return (
        <div className="channel__container">
             
       
                
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    )
}

export default ChannelContainer
