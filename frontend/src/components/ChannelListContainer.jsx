import React, { useState, useEffect } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import uwe from '../assets/uwe.png'
import bristol from '../assets/uniofbristol.png'
import { ChannelSearch, TeamChannelList, TeamChannelPreview, ProfileInfo, NewsFeed, OpenTicket } from '.';

const cookies = new Cookies();
const universityLogin = cookies.get('university');
const universitySignUp = cookies.get('institution')

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}



const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, setIsTicket, setIsReading }) => {
    const { client } = useChatContext();
    const [image, setImage] = useState(false)
    const filters = { members: { $in: [client.userID] } };



    useEffect ( () => {
        if ((universityLogin == 'uwe' )|| (universitySignUp == 'uwe')) {
            setImage(true)
        }
        if ((universityLogin == 'bristol' )|| (universitySignUp == 'bristol')) {
            setImage(false)
        }
    }, [])

    
    

    // handleImage(university);
    return (
        <>  
            
          
            <div className="channel-list__list__wrapper">
                <ProfileInfo />
               
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <OpenTicket 
                           isCreating={isCreating}
                           setIsCreating={setIsCreating}
                           setCreateType={setCreateType} 
                           setIsEditing={setIsEditing}
                           setIsTicket={setIsTicket}
                           setIsReading={setIsReading}
                           setToggleContainer={setToggleContainer}
                
                />
                <NewsFeed 
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType} 
                        setIsEditing={setIsEditing}
                        setIsTicket={setIsTicket}
                        setIsReading={setIsReading}
                        setToggleContainer={setToggleContainer}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setIsTicket={setIsTicket}
                            setIsReading={setIsReading}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setIsTicket={setIsTicket}
                            setIsReading={setIsReading}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setIsTicket={setIsTicket}
                            setIsReading={setIsReading}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            setIsTicket={setIsTicket}
                            setIsReading={setIsReading}
                            type="messaging"
                        />
                    )}
                />
                <div className='university-logo'>
                        <img src={image? uwe : bristol}/>
                  

                </div>
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, setIsTicket, setIsReading }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
       
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
                setIsTicket={setIsTicket}
                setIsReading={setIsReading}
              />
            </div>

            <div className="channel-list__container-responsive">
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setIsTicket={setIsTicket}
                setIsReading={setIsReading}
                setToggleContainer={setToggleContainer}
              />
            </div>
        
        </>
    )

}

export default ChannelListContainer;