const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
require('dotenv').config();


const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;
const signup = async(req, res) => {
try {
    //Body of request
    const {fullName, username, password, email, institution, course} = req.body;

    //Create the User ID
    const userId = crypto.randomBytes(16).toString('hex');

    //Connect to GetStream
    const serverclient = connect(api_key, api_secret, app_id);

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create User Token
    const token = serverclient.createUserToken(userId);

    //Add users to teams for Multi-Tenancy 
    const team = addUser(course, institution, userId, username);

    //Create user for Feed display
    await serverclient.user(userId).create({ name: username });

    //Connect to feed 'user' 
    serverclient.feed('user', userId);
    
    //Return success
    res.status(200).json({token, fullName, username, userId, hashedPassword, email, team});
}
catch (error){
    console.log(error);
    res.status(409).json({message: "Error in creating user. Username taken?"})
}   
    
}

const addUser = async(courseName, teamName, id, name) => {
    const client = StreamChat.getInstance(api_key, api_secret);

    // client.updateAppSettings({ 
    //     multi_tenant_enabled: true, 

    // });

    const nameID = String(id)
    const fullName = String(name)

    //  if (teamName == "uwe"){
        try {


            await client.upsertUser({  
                    id: nameID,  
                    name: fullName,
                    username: fullName,
                    teams: [teamName, courseName],
                    role: 'user',  
                 });  


            //Creation of channels
            
            const concatUni = teamName + "-General";
            const uniChannel = client.channel("team", concatUni, {team: teamName, name: "General", created_by_id: "tiarnanalexander"});

            const state = await uniChannel.create();

            await uniChannel.addMembers([nameID]);



            const stringCourse = String(courseName);     
            const concatCourse = stringCourse + "_" + teamName;
            const courseChannel = client.channel("team", concatCourse, {team: courseName, name: stringCourse, created_by_id: "tiarnanalexander"});

            await courseChannel.create();

            await courseChannel.addMembers([nameID]);



            const concatSU = teamName + "-SU";
            const suChannel = client.channel("team", concatSU, {team: teamName, name: "Student-Union", created_by_id: "tiarnanalexander"});

            await suChannel.create();

            await suChannel.addMembers([nameID]);
            

 



            await client.updateChannelType('messaging', { 
                blocklist: 'profanity_en_2020_v1', 
                blocklist_behavior: 'block', 
            });

            await client.updateChannelType('team', { 
                blocklist: 'profanity_en_2020_v1', 
                blocklist_behavior: 'block', 
            });


            return state;
            


            } catch (error) {
                console.log(error);


            }

    
};

const login = async(req, res) => {
    
    try {
        const {username, password } = req.body;
        
        const serverclient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);
      

        const { users } = await client.queryUsers({ name: username });

        

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverclient.createUserToken(users[0].id);

        
     

        if (success) {
            await serverclient.user(users[0].id).update({ name: users[0].name });
    
            serverclient.feed('user', users[0].id);
            
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id, university: users[0].teams[0]});
        }
        else{
            res.status(400).json({message: "Incorrect username or passsword"})
        }
    }
    catch (error){
        console.log(error);
        res.status(400).json({message: "Incorrect username or passsword"});
    }   

};



module.exports = {signup, login}
