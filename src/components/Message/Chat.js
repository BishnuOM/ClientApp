import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { useParams} from 'react-router-dom';
import Service from '../../Service/Service';
import _pubnubservice from '../../Service/PubNubService';




export const Chat = () => {
  const pubnub = new PubNub({
    publishKey: 'pub-c-3784fe38-e277-44f4-90a6-8550bbfe3d56',
    subscribeKey: 'sub-c-95425b74-e914-11ea-a728-4ec3aefbf636',
    secretKey: "sec-c-YjI4ZWFhOWQtZDU5NS00NWMxLWFmZDEtZDAyNDBkNjc1NGE2",
    uuid: JSON.parse(localStorage.getItem("login_data")).pubNubUserId ,
  });
 
return(
    <div className="height-95 pt-3 px-5">
    <div class="d-flex align-items-center justify-content-between">
        <div class="fs-3 breadcrumb d-flex align-items-center  ">
            <span class="" style={{fontSize:"28px"}}>Rings</span>
            <span class="px-2 fs-3"><i class="bi bi-chevron-right"></i></span>
            <span class="text-dark font-bold" style={{fontSize:"28px"}}>Message Design II</span>
        </div>
    </div>
    <PubNubProvider client={pubnub}> 
      <Chats />
     </PubNubProvider> 
    </div>
)

function Chats() {
  const params = useParams();
   const pubnub = usePubNub();
    const [channels] = useState(["BE8CCC83-6A2C-4188-915F-0912B8901806"]);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
   
 
    const handleMessage = (event) => {
     alert('handleMessage')
      const message = event.message;
      if (typeof message === 'string' || message.hasOwnProperty('text')) {
          const text = message.text || message;
          addMessage((messages) => [...messages, text]);
          console.log(messages);
      }
    };

    const sendMessage = (message) => {
 
      if (message) {
        pubnub
          .publish({ channel: channels[0], message })
          .then((res) => console.log(res), setMessage(''));
      }
    };

    useEffect(() => {
      alert('useEffect')
      pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
        debugger;
        const response = _pubnubservice.fetchMessagesHistory(channels,'','').then((response) => {
            debugger;
            console.log(response.channels[channels]);
            var res=response.channels[channels].filter((el)=>el.messageType==null)
            addMessage(res)
        }).catch(() => {
            debugger;
        });;
       
    }, [pubnub, channels]);
    

    const listStyles = {
        alignItems: 'flex-end',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        // flexGrow: 1,
        overflow: 'auto',
        padding: '10px',
      };
      
  
      const messageStyles = {
        backgroundColor: '#eee',
        borderRadius: '5px',
        color: '#333',
        fontSize: '1.1rem',
        margin: '5px',
        padding: '8px 15px',
      };
      const footerStyles = {
      marginBottom:"2rem",
      position:'fixed'
      };
      // const pageStyles = {
      //   alignItems: 'center',
      //   background: 'white',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   minHeight: '100vh',
      // };
  
      const chatStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: '60vh',
        width: '100%',
      };
  

    return (
        <div className='chat-box'>
    
        <div style={chatStyles}>
              <div style={listStyles} >
            {messages.map((message, index) => {
              debugger
              return (
                <div key={`message-${index}`} style={messageStyles}>
                  {message.message}
                </div>
              );
            })}
          </div>
          mmm
          
          
           
             <div>
               <i className="fa fa-camera small_icons"></i>
               <i className="fa fa-calendar small_icons icons_align" ></i>
               <i className="fa fa-plus-circle small_icons icons_align "></i>
               <input type="text" className="form-control form-control-customstyls  ml-5 input_msgbox" placeholder="Send a message" name="fname"    value={message}
              onKeyPress={(e) => {
                if (e.key !== 'Enter') return;
                sendMessage(message);
              }}
              onChange={(e) => setMessage(e.target.value)}
             />
           <button  onClick={(e) => {
                e.preventDefault();
                sendMessage(message);
              }}><i class="fa fa-paper-plane  mike_imgs" aria-hidden="true"></i></button>  

                {/* <i className="bi bi-mic small_icons mike_img "></i> */}
                    </div>
                </div>
             
            
        </div>
    )

}

}


