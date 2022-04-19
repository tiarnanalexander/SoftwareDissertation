import React, {useState} from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ChannelListContainer, ChannelContainer, Navbar } from './components';
import Home from './pages/Home'



import { Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';
import './ResponsiveLanding.css';
import "@material-tailwind/react/tailwind.css";

const cookies = new Cookies();


//ADD API KEY to .env
const apiKey = process.env.API_KEY;

//const apiKey = process.env.REACT_APP_API_KEY;
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({   
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName:cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        email: cookies.get('email'),
    }, authToken)


    ;
}




const App = () => {
    const [createType, setCreateType] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isTicket, setIsTicket] = useState(false)
    const [isReading, setIsReading] = useState(false)
    const customStyles = {
        '--primary-color': '#308dd9',
    }
    
    const Chatroom =  () => {
        
        return (  
        <><Navbar />
            <div className="app__wrapper">
              
                <Chat client={client} customStyles={customStyles} theme="team light">
                    <ChannelListContainer
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        isTicket={isTicket}
                        setIsTicket={setIsTicket}
                        isReading={isReading}
                        setIsReading={setIsReading}
                  
                    />
                    <ChannelContainer
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        createType={createType} 
                        isTicket={isTicket}
                        setIsTicket={setIsTicket}
                        isReading={isReading}
                        setIsReading={setIsReading}
                        />
                </Chat>
            </div>
            </>
        )
    }

    if(!authToken) return (
    
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Auth}/>
        </Switch> 
        )
    return (
        <Switch>
            <Route exact path="/" component={Chatroom} />
            <Redirect from="*" to="/" />
        </Switch>
    )
}

export default App
