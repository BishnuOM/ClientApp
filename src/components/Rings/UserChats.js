import React from 'react';
import { Link ,useLocation} from 'react-router-dom';

export default function UserChats(props) {
  return (
    <>

    {
      props.data.messageType==='Card' && 
      'Card'
     }
   
    {
      props.data.messageType==='Image' && 
      <>
       <div><img alt='' className="pe-3 pn-msg__image" style={{height:'200px',width:'200px'}} src={props.data.message.file.URL}/></div>
      </>
    }
    {
      props.data.messageType==='Video' && 
      <>
      <video className='pn-msg__image' width="500" height="500" controls >
        <source src={props.data.message.file.URL} type="video/mp4"/>
      </video>
      </>
    }
    {
      props.data.messageType==='Text' && 
      <>
       <div>{props.data.message}</div>
      </>
    }
   {
      props.data.messageType==='DOC' && 
      <>
        <Link to={ props.data.message.file.URL} target="_blank" style={{color:'gray',textDecoration:'underline !important'}} >
        <i  style={{fontSize:'25px',color:'red'}}></i> &nbsp;
         {props.data.message.file.name} &nbsp;&nbsp;
        <i class="fa fa-download" aria-hidden="true" ></i>
        </Link>
      </>
    }
  </>
  )
}
