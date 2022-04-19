
const StreamChat = require('stream-chat').StreamChat;
require('dotenv').config();

const api_secret = process.env.STREAM_API_SECRET;
const api_key = process.env.STREAM_API_KEY;

const client = StreamChat.getInstance(api_key, api_secret);
const fn = async () => {
   await client.updateAppSettings({multi_tenant_enabled: false})
    
}

fn() 

// fn().then(r => console.log(r.map((channel) => { 
//             console.log(channel.data.name, channel.cid) 
//         }) ))