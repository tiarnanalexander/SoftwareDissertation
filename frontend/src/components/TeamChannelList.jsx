import React from 'react'
import { AddChannel } from '../assets'

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setIsTicket, setIsReading }) => {

    if (error) {
        return type == 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please wait a moment.
                </p>
            </div>
        ) : null;
    }

    if (loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type == 'team' ? 'Channels' : 'Messages'}
                </p>
            </div>
        )
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type == 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel
                    isCreating={isCreating}
                    setIsTicket={setIsTicket}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setIsReading={setIsReading}
                    type={type === 'team' ? 'team' : 'messaging'}
                    setToggleContainer={setToggleContainer}
                />
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList
