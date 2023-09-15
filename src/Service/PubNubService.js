import PubNub from 'pubnub';
let usrdetail=localStorage.getItem('login_data');
const user=JSON.parse(usrdetail);


const generate_uuidv4=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
       var uuid = Math.random() * 16 | 0, v = c === 'x' ? uuid : (uuid & 0x3 | 0x8);
       return uuid.toString(16);
    });
  }

const pubnub = new PubNub({
  publishKey:'pub-c-3784fe38-e277-44f4-90a6-8550bbfe3d56',
  subscribeKey:'sub-c-95425b74-e914-11ea-a728-4ec3aefbf636',
  secretKey: "sec-c-YjI4ZWFhOWQtZDU5NS00NWMxLWFmZDEtZDAyNDBkNjc1NGE2",
  uuid: user?.pubNubUserId ?user?.pubNubUserId : generate_uuidv4() ,//"pn_0BFAB2E2-B014-4E28-9740-E016A7AAF76F",//'pn_76e81f63-1e5d-47dd-82e2-c329ae335629',
});



const _pubnubservice = {
    fetchMessagesHistory: async function (channels,start,end) {
        debugger
        try {
           // alert('api')
            const response =  await pubnub.fetchMessages({
                channels: [channels],
                count: 10,
                start: start,
                end:end
             });
            return response;
        } catch (error) {
            throw error;
        }
    },

    addactions:async function (channels,messageTimetoken,message){
        try {
            const response = await pubnub.addMessageAction({
                channel: channels,
                messageTimetoken: messageTimetoken,
                message
            });
            debugger
            return response;
        } catch (status) {
            console.log(status);
        }
    },

    publishMessage: async function (channels,message) {
        try {
            const response = pubnub.publish({ channel: channels, message });
            return response;
        } catch (error) {
            throw error;
        }
    },

    

    sendFile: async function (channels,file) {
        try {
            const response = await pubnub.sendFile({
                channel: [channels],
                file: file,
              });
            return response;
        } catch (error) {
            throw error;
        }
    },
    downloadfile: async function (channels,file) {
        try {
            // in React and React Native
            const response = await pubnub.downloadFile({
                channel: channels,
                id: file.id,
                name: file.name
            });
  
         let fileContent = await response.toBlob();
            debugger
            // const response = await pubnub.sendFile({
            //     channel: [channels],
            //     file: file,
            //   });
            // return response;
        } catch (error) {
            throw error;
        }
    },
    
  hardDeleteMessges:  function (channels) {
    try {
        const response =  pubnub.deleteMessages({
            channel: [channels],
          });
        return response;
    } catch (error) {
        throw error;
    }
},

   GetFileUrl:  function (channels,file_id,file_name) {
    try {
        const response =  pubnub.deleteMessages(
            {
                channel: channels,
                id: file_id, 
                name: file_name 
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
},




}

export default _pubnubservice;