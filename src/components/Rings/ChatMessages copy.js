import React, { useEffect, useState,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {authHeader} from '../../redux/auth-header';
import { Link ,useLocation} from 'react-router-dom';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import _pubnubservice from '../../Service/PubNubService';

import UserChats from './UserChats';
import '../../stylechat.css';
import ringActions from '../../redux/actions/ringActions';

let query = window.location.pathname.split('/');
let User=JSON.parse(localStorage.getItem('login_data'));

export const ChatMessages = () => {
    const pubnub = new PubNub({
      publishKey: 'pub-c-3784fe38-e277-44f4-90a6-8550bbfe3d56',
      subscribeKey: 'sub-c-95425b74-e914-11ea-a728-4ec3aefbf636',
      secretKey: "sec-c-YjI4ZWFhOWQtZDU5NS00NWMxLWFmZDEtZDAyNDBkNjc1NGE2",
      uuid: JSON.parse(localStorage.getItem("login_data")).pubNubUserId ,
    });
   
  return(
      <PubNubProvider client={pubnub}>
        <Chats />
      </PubNubProvider>
  )

function Chats()  {
    let query = window.location.pathname.split('/');
     const pubnub = usePubNub();
     const dispatch = useDispatch();
     const [channels] = useState([query[2]]);;
      const [messages, addMessage] = useState([]);
      const [selectedFile, setSelectedFile] = useState('');
      const [text, setText] = useState('');
      const message_list=useSelector(state=>state.ringReducer.message_list);
      const messages_grupuByDate=useSelector(state=>state.ringReducer.messages_grupuByDate);

    const handleFile = event => {
    var filedata={
        channel: event.channel,
        message:
        { 
        file:{
        id: event.file.id,
        name: event.file.name,
        }
    },
        messageType: 4,
        timetoken: event.timetoken,
        uuid: event.publisher,
    };
    appendTolist(filedata)
    };
    
    const handleMessage = event => {
     //alert('handleMessage')
        var mesag={
            channel:event.channel,
            message: event.message,
            messageType:null,
            timetoken: event.timetoken,
            uuid: event.publisher,
        }
        debugger
        appendTolist(mesag)
    };

    const handleFileChange = async(e) => {
    setText('')
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    var filename=e.target.files[0].name;//.split(".");
        var extenssion=filename[0];
    alert(filename)
    debugger
    setText(filename)
    };
          
        useEffect(() => {
            alert('useEffect')
    //     pubnub.addListener({message: handleMessage});
    //     pubnub.addListener({file: handleFile});
    //     pubnub.subscribe({ channels });
    //     dispatch(ringActions.messageList([]));
    //     dispatch(ringActions.updateMessageList([]));
        
    //    _pubnubservice.fetchMessagesHistory(channels,'','').then((response) => {
    //         debugger;
    //         if(response.channels[channels]!==undefined){
    //             console.log(response.channels[channels]);
    //             re_arrange(response.channels[channels])
    //         }
    //     }).catch(() => {
    //         debugger;
    //     });;

    //    // fetctmessge(channels,'','');
    //         return () => {
    //         pubnub.unsubscribe({ channels })
    //         pubnub.removeListener({message: handleMessage});
    //         pubnub.removeListener({file: handleFile})
    //     }
        }, [pubnub, channels]);

        const fetctmessge=(channels,start,end)=>{
        _pubnubservice.fetchMessagesHistory(channels,start,end)
        .then((response)=>{
            debugger
              
        }).catch(()=>{ 
    
        });
        }
    
        const appendTolist=(data)=>{
        data.time=timesatmpConvert(data.timetoken);
        data.groupbyDate=convertdate(data.timetoken);
        if(data.messageType===4){
    
            const fileName =data.message.file.name;
            const fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
            const result = pubnub.getFileUrl(
            { 
                channel: channels,
                id: data.message.file.id, 
                name: data.message.file.name 
            });
            data.messageType=fileExtensiontype(fileExtension.toUpperCase());
            data.message.file.URL=result;
        }
        if(data.messageType===null){
            data.messageType=isJSON(data.message)?'Card':'Text';
            if(data.messageType==='Card'){
            data.message=JSON.parse(data.message);
            data.message.farmateDate=getFormattedDate(data.message.StartDateTime);
            data.message.startTime=new Date(data.message.StartDateTime).toLocaleString('en-US', { hour: '2-digit', hour12: true });
            data.message.endTime=new Date(data.message.EndDateTime).toLocaleString('en-US', { hour: '2-digit', hour12: true });
            data.message.timetoken=data.timetoken;
            
            }
        }
        debugger
        var apendData=[data];
        const res=[...messages,...apendData];
        //addMessage(res);
        dispatch(ringActions.updateMessageList(apendData));
        }
        const re_arrange=(list)=>{
            const formated_list= list?.map((el)=>
             {
               el.time=timesatmpConvert(el.timetoken);
               el.groupbyDate=convertdate(el.timetoken);
               if(el.messageType===4){
                 const fileName =el.message.file.name;
                 const fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
                 const result = pubnub.getFileUrl(
                   { 
                    channel: channels,
                    id: el.message.file.id, 
                    name: el.message.file.name 
                   });
                  el.messageType=fileExtensiontype(fileExtension.toUpperCase());
                  el.fileExtension=fileExtension;
                 el.message.file.URL=result;
               }
               if(el.messageType===null){
                 el.messageType=isJSON(el.message)?'Card':'Text';
                 if(el.messageType==='Card'){
                   el.message= Number.isInteger(el.message)?el.message:JSON.parse(el.message);
                   
                   el.message.farmateDate=getFormattedDate(el.message.StartDateTime);
                   el.message.startTime=new Date(el.message.StartDateTime).toLocaleString('en-US', { hour: '2-digit',minute: '2-digit', hour12: true });
                   el.message.endTime=new Date(el.message.EndDateTime).toLocaleString('en-US', { hour: '2-digit',minute: '2-digit', hour12: true });
                   var stime=new Date(el.message.StartDateTime).getTime();
                   var etime=new Date(el.message.EndDateTime).getTime();
                   var dtime=new Date(etime-stime).getMinutes();
                   el.message.duration=dtime;
                   el.message.timetoken=el.timetoken;
                   
                 }
               }
               return el
             })
             console.log(formated_list);
             //addMessage(formated_list);
             dispatch(ringActions.updateMessageList(formated_list))
         }
        const timesatmpConvert=(timestamp)=>{
        let str = timestamp.toString();
        str = str.slice(0, -4);
        str = parseInt(str);
        
        let date = new Date(str);
        // console.log(date);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes =  date.getMinutes();
        // Seconds part from the timestamp
        let seconds =  date.getSeconds();
        // Will display time in 11:10:22 format
    
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        var timeformat = hours + ':' + minutes + ' ' + ampm;
        return timeformat;
        }
        
        const convertdate=(dd)=>{
        let str = dd.toString();
        str = str.slice(0, -4);
        str = parseInt(str);
        let givenDate = new Date(str);
        let today = new Date();
        let  resultDate ='';
        var diffDays = today.getDate() - givenDate.getDate(); 
        let year = givenDate.getFullYear();
        let month = givenDate.getMonth()+1;
        let dt = givenDate.getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        
        
        switch (diffDays) {
            case 0:
            resultDate='Today'
            break;
            case 1:
            resultDate='Yesterday'
            break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            resultDate=givenDate.toLocaleString('default', { weekday:'long' });
            break;
            default:
            console.log('default')
            var dateFormate= givenDate.toLocaleString('default', {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }).toUpperCase(); 
            dateFormate=dateFormate.split(',');    
            dateFormate=dateFormate[0]+','+ dateFormate[1]+'TH ,'+ dateFormate[2];     
            resultDate=dateFormate;
            break;
        }
            return resultDate;
        }  
        
        const  fileExtensiontype=(fileExtension)=>{
        var FileExtensionType='';
        switch (fileExtension) {
            case "PNG": case "JPG":case "GIF":
            FileExtensionType='Image';
            break;
            case "PDF": case "TXT": case "CSV": case "XLSX": case "XLS":
            FileExtensionType='DOC';
            break;
            case "MP4":
            FileExtensionType='Video';
            break;
            default:
            break;
        }
        return FileExtensionType;
        }
        const  getFormattedDate=(data)=>
        {
            var today = new Date(data);
            var week =['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'] ;
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var month= monthNames[today.getMonth()]
            var day  = week[today.getDay()];
            var dd   = today.getDate();
            var yyyy = today.getFullYear();
            return month+' ' + dd + ' , '+ yyyy + '('+day+') ' ;
        }
        // Function to test valid JSON
        function isJSON(str) {
            try {
                return JSON.parse(str) && !!str;
            } catch (e) {
                return false;
            }
        }
    
        const sendMessage = message => {
            if(selectedFile){
                _pubnubservice.sendFile(channels,selectedFile)
            .then((response)=>{
                setText('');
                    if(response.channels[channels]!==undefined){
                }
            }).catch(()=>{
            });
            }
            if (message && selectedFile==='') {
                _pubnubservice.publishMessage(channels, message)
                .then((d)=>{
                setText('');
                }).catch(()=>{
                });;
            }
            };

    
        const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e.target.value)
        }
        }

        const generate_uuidv4=()=> {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(c) {
            var uuid = Math.random() * 16 | 0, v = c === 'x' ? uuid : (uuid & 0x3 | 0x8);
            return uuid.toString(16);
        });
          }
        const chat_group=()=>{
            window.location.replace(`/ChatList/${query[3]}`);
        }  
   
  return(
      <div className="height-95 pt-3 px-5">
      <div class="d-flex align-items-center justify-content-between">
          <div class="fs-3 breadcrumb d-flex align-items-center  ">
              <span class="" style={{fontSize:"28px",cursor:'pointer'}} onClick={chat_group}>Rings</span>
              <span class="px-2 fs-3"><i class="bi bi-chevron-right"></i>Your chat history with</span>
              <span class="text-dark font-bold" style={{fontSize:"28px"}}>
               
                {localStorage.getItem('Chat_GroupName')}
              </span>
          </div>
      </div>
       <>
        <div className='chat-box' style={{overflow:'auto'}}>
            {message_list.length}
        <div  className='' >
        {message_list.length===0 ?
          <div>
            <div className='row justify-content-center'>           
                <img src="./img/svg/Mask Group.svg" className="profile_size " alt='' style={{width:'150px'}}/>   
             </div>
            <div className='row justify-content-center'>Send a message to begin chatting.</div>
          </div>
         :
         <>
         {
          Object.keys(messages_grupuByDate).map((key,index)=>{ 
            return <div key={index}>  
            <div className="sectittle2 mt-3 mb-3" style={{textAlign: 'center'}}>{key}</div>
                {messages_grupuByDate[key].map((el,index)=>{
                 return  <div key={el.time}> {
                el.uuid!==User.pubNubUserId?
                
              <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                <img src="./img/svg/add_chat.svg" className="profile_size " alt=''  class="rounded-circle user_img_msg"/>          
                </div>
                <div class="msg_cotainer">
                  <UserChats data={el}/>
                  <span class="msg_time">{el.time}</span>
                </div>
              </div>
              :
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">
                <UserChats data={el}/>
                  <span class="msg_time_send">{el.time} </span>
                </div>
                <div class="img_cont_msg">
                 <img src={User.photoId} alt="profile" class="rounded-circle user_img_msg" /> 
                </div>
              </div>
              }
              </div>
               }
               )
               }  
            </div>
           })
          }
         </>
         }   
           
           </div>
         
        </div>
        <div class="d-flex mt-3 mb-3">
          <div className='p-1'>
            <label  for="file-input" className=' cursor-pointer'> 
                <img src="./img/svg/camera.svg" className="profile_size " alt=''  class="chat_img_msg"/>          
                <input id="file-input" type="file" onChange={handleFileChange} /> 
            </label>
          </div>
          <div className='p-1'>
            <img src="./img/svg/clarity_calendar-solid.svg" className="profile_size " alt=''  class="chat_img_msg"/>          
          </div>
          <div className='p-1'>
            <img src="./img/svg/add_circle_24px.svg" className="profile_size " alt=''  class="chat_img_msg"/>          
          </div>
          <div className='ms-2' style={{width:'100%'}}>
          {/* <input value={text} className='chat_input p-2' 
                onChange={e => {setText(e.target.value);setSelectedFile('')}}
                onKeyDown={_handleKeyDown}
                placeholder='Send Message'
                />
            <div class="input-group-append" onClick={()=>sendMessage(text)}>
                <span class="input-group-text send_btn"><i class="fa fa-send-o"></i></span>
            </div> */}
            <div class="input-group">
            <input type="text" class="form-control chat_input p-2" placeholder="Send Message" aria-label="" aria-describedby="basic-addon1"
            value={text} onChange={e => {setText(e.target.value);setSelectedFile('')}} onKeyDown={_handleKeyDown}
            />
            <div class="input-group-append" onClick={()=>sendMessage(text)}>
                <span class="input-group-text send_btn"><i class="fa fa-send-o"></i></span>
            </div>
        </div>
          </div>
          <div className='p-1' >
         
           <img src="./img/svg/audio.svg" className="profile_size " alt=''  class=" chat_img_msg"/>          
          </div>
          </div>
         
        {/* <div class="card-footer">
              <div class="input-group">
                <div class="input-group-append">
                  <label  for="file-input" className=' cursor-pointer'> 
                    <span class="input-group-text attach_btn"><i class="fa fa-paperclip"></i></span>
                    <input id="file-input" type="file" onChange={handleFileChange} /> 
                  </label>
                </div>
                <div className='row'>
                <div className='col'>
                <input value={text} 
                onChange={e => {setText(e.target.value);setSelectedFile('')}}
                onKeyDown={_handleKeyDown}
                />
                <div class="input-group-append" onClick={()=>sendMessage(text)}>
                  <span class="input-group-text send_btn"><i class="fa fa-send-o"></i></span>
                </div>
              </div>
              <br/>
            <div>Input value: {text}</div>
            </div>
            </div>
          </div> */}
        </> 
      </div>
  )

  }
}
