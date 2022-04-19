import React, {useState, useEffect} from 'react';
import { CloseCreateChannel } from '../assets';
import { useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import randomize from 'randomatic';
const cookies = new Cookies();
const universityLogin = cookies.get('university');
const universitySignUp = cookies.get('institution')


const SubjectInput = ({ subjectName = '', setSubjectName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setSubjectName(event.target.value);
    }

    // const Examples = ['There is not enough food suitable for vegans around campus', 'I would like to see more picnic areas on campus ',
    //                 'There are not enough study spaces', 'I cannot find my team mate on student.connect'];
    

    return (
        <div className="create-ticket">

            <h1>Support information</h1>
            <p>Need to speak to one of our team? Open a ticket below by typing in your message and press submit. One of our team members will be in contact with you. </p>
            <h1>Subject</h1>
            <input value={subjectName} onChange={handleChange} placeholder="Type here..." />
            {/* <ul>
             {Examples.map((example) => <li> {example} </li>)}
            </ul> */}
        </div>
    )
}


const CreateTicket = ({ setIsTicket }) => {
    const { client, setActiveChannel } = useChatContext();
    const [subjectName, setSubjectName] = useState('');

    const [institution, setInstitution] = useState('');

    useEffect(() => {
      if((universityLogin == 'uwe' )|| (universitySignUp == 'uwe')){
        setInstitution('uwe');
      }
      if((universityLogin == 'bristol' )|| (universitySignUp == 'bristol')){
          setInstitution('bristol');
        }
    }, [])



    const createNewTicket = async (e) =>
    {
        e.preventDefault();
        try {
            const ref = randomize('A0', '5') 
            const concat = 'Support Ticket - ' + ref;
            if (institution == 'uwe'){
                const newChannel= await client.channel('team', ref, {
                    name: concat, members: [client.userID, 'b066467c78e870032e51d5cafce1d56c'], team: institution
                });
                await newChannel.watch();
                setActiveChannel(newChannel);
            }
            if (institution == 'bristol'){
                const newChannel= await client.channel('team', ref, {
                    name: concat, members: [client.userID, 'BRISTOL UNI ACCOUNT'], team: institution
                });
                await newChannel.watch();
                setActiveChannel(newChannel);
            }

            //Add subject name? ^ 

            

            // await newChannel.sendMessage(subjectName)
         


            setIsTicket(false);
            
           
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>Create a ticket</p>
                <CloseCreateChannel setIsTicket={setIsTicket} />
            </div>
            <SubjectInput subjectName={subjectName} setSubjectName={setSubjectName}/>
            <div className="channel-description-input__wrapper">
                <p>Ticket description</p>
                <textarea placeholder="Type here..." />
            </div>
            <div className="create-channel__button-wrapper" onClick={createNewTicket}>
                <p>Send Ticket</p>
            </div>
        </div>
    )
}

export default CreateTicket