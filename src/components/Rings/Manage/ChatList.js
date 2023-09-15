import React, { Component,createRef  } from 'react';
import { connect } from "react-redux";

import Service from '../../../Service/Service';
import { useParams} from 'react-router-dom';
import modalActions from '../../../redux/actions/modal';
import CreatChatmodal from '../../Modals/CreateChatModal';
import ringActions from '../../../redux/actions/ringActions';
import { ChatMessages } from '../ChatMessages';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


let query = window.location.pathname.split('/');

let User=JSON.parse(localStorage.getItem('login_data'));
const mapStateToProps = (state) => {
    return {
       modal_name: state.modal.modal_name,
       ring_detail: state.ringReducer.ring_detail,
       chat_stage:state.ringReducer.chat_stage
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    openmodla: (payload) => dispatch(modalActions.toggleModal('CreatChat')),
    setChatStage: (payload) => dispatch(ringActions.setChatStages(payload)),
  });

 class ChatList extends Component {

    constructor(props) {
        super(props);
        this.myP = createRef();
        this.state = {
            ringActiveChatMessages:[],
            ringChatMessageRequests:[],
            chat_gropu_profile:'',
            ring_detail:'',
            loading:false
        }
    }
   
    componentDidMount() { 
      
       var Ring_detal=JSON.parse( localStorage.getItem('Ring_Detail'));
         this.setState({ring_detail:Ring_detal});
         
        if (query  && query[2]) {
          this.setState({loading:true})
          this.getGroupChats(query[2])
        }
    }

    getGroupChats(ringID){
      Service.ChatGetList(ringID).then((response => {
        var ringActiveChatMessages=[];
        var ringChatMessageRequests=[];
        if(response.data.ringActiveChatMessages){ 
             ringActiveChatMessages=  this.getUnique(response.data.ringActiveChatMessages,'ringChatId');
        }
        if(response.data.ringChatMessageRequests){
             ringChatMessageRequests=this.getUnique(response.data.ringChatMessageRequests,'ringChatId');
        }
        ringActiveChatMessages.map((el)=>el.ringChatPhotoId=Service.imageURL(el.ringChatPhotoId));
        ringChatMessageRequests.map((el)=>el.ringChatPhotoId=Service.imageURL(el.ringChatPhotoId));
        
        console.log(ringActiveChatMessages)
        console.log(ringChatMessageRequests)
        this.setState({ringActiveChatMessages:ringActiveChatMessages})
        this.setState({ringChatMessageRequests:ringChatMessageRequests})
        this.setState({loading:false})
        console.log(response);
     }))
    }

     getUnique(arr, index) {
        const unique = arr
             .map(e => e[index])
             // store the keys of the unique objects
             .map((e, i, final) => final.indexOf(e) === i && i)
             // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      
         return unique;
      }
      

    creatChat(){
      this.myP.current.refreshList();
       this.props.openmodla();
    }
     startChating(ringchatID,name){
      localStorage.setItem('Chat_GroupName',name);
     // window.location.replace(`/chat/${query[2]}`);
     window.location.replace(`/ChatMessages/${ringchatID}/${query[2]}`);
    } 

     AcceptChatrequest(data){
        var param={
            "ringChatRequestId": data.ringChatRequestId,
            "ringId": query[2],
            "ringChatId": data.ringChatId,
            "userId": User.id,
            "status": 2,
            "roleId": 1
          }
        Service.AcceptChatReq(param).then((res)=>{
            alert(' req accepted')
         }).catch((err)=>{
    
         })
         }
     
         

    setChatStage(){
      this.props.setChatStage('group_chats');

    }     
    gotoRings(){
      window.location.replace(`/RingList`);
    }
    refresh(){
      if (query  && query[2]) {
        this.getGroupChats(query[2])
      }
    }
   
  
  render() {
    return (

   <div className="height-96 pt-1 px-lg-5 px-2">
    <i class="fa fa-arrow-left" aria-hidden="true" onClick={this.gotoRings}></i>
   <div className="container">
   <CreatChatmodal eventmodal={this.refresh} ref={this.myP}/>
       <div className="home-name-main-content d-inline-flex align-items-center justify-content-between p-3 bg-color w-auto main-top-section radius-10">
          <div class="d-flex align-items-center justify-content-between">
          <div class="fs-3 breadcrumb d-flex align-items-center  ">
              <span class="text-dark font-bold me-5" style={{fontSize:"28px"}}>
               {/* <img src={this.state.ring_detail.imageurl} alt="" className="profile-img " />{this.state.ring_detail.name} */}
               <img 
                    src={this.state.ring_detail.imageurl} className='profile-img rounded-circle me-3' alt='' 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; 
                        currentTarget.src="./img/svg/add_chat.svg";
                }}/>
              {this.state.ring_detail.name}
              </span>
              <strong onClick={()=>this.creatChat()}>
                  <img alt=''src='./img/svg/add_chat.svg'   />
              </strong>
          </div>
         </div>
       </div>
       <div className="text-dark" style={{ paddingTop: "15px", paddingBottom: "7px", fontSize: "18px", fontWeight: "700" }}>


<div className=' mb-5'>Requested Chats
{
  this.state.loading?
  <div className="list-group list-group-numbered d-flex justify-content-between mt-2 " role="alert" style={{width:'450px'}}>
    {
      [1,2,3,4,5].map((el)=>{
       return(
          <div key={el.id} className="d-flex justify-content-between align-items-start   border-bottom" >
           <Skeleton circle width={50} height={50}/>
          <div className="me-auto ms-2">
          <Skeleton   width={450} height={50}/>
          </div>
      </div>
       )
      })
    }
  </div>
  :
  <div className="list-group list-group-numbered d-flex justify-content-between mt-2" role="alert" style={{width:'500px'}} >
 { this.state.ringChatMessageRequests.length===0 ? 
 <><p>No new groupchat request.</p></>
 :
 <>
 {
  this.state.ringChatMessageRequests?.map((el)=>{
    return(
      <div key={el.id} className="d-flex justify-content-between align-items-start border-bottom p-2" >
        <img 
          src={el.ringChatPhotoId} className='chat_image rounded-circle' alt='' style={{ height:'50px'}}
          onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src="./img/svg/group_chat.svg";
      }}/>
  
      <div className="me-auto ms-2 mt-2">
          <p className="img_align">{el.ringChatName} </p>
      </div>
      <div className='row mt-2'>
        <div className='col ' >
        <i className="fa fa-times-circle-o fa-2x " aria-hidden="true" style={{color:'#FF4339'}}></i>
        </div>
        <div className='col ' onClick={()=>this.AcceptChatrequest(el)}>
            <i className="fa fa-check-circle-o fa-2x  " aria-hidden="true" style={{color:'#17BE3C'}}></i>
        </div>
      </div>
      </div>
      )
  })
  }
 </>
 }
 
 </div>
}

</div>
<div >Active Chats
  {
  this.state.loading?
  <div className="list-group list-group-numbered d-flex justify-content-between mt-2 " role="alert" style={{width:'450px'}}>
    {
      [1,2,3,4,5].map((el)=>{
       return(
          <div key={el.id} className="d-flex justify-content-between align-items-start   border-bottom" >
           <Skeleton circle width={50} height={50}/>
          <div className="me-auto ms-2">
          <Skeleton   width={450} height={50}/>
          </div>
      </div>
       )
      })
    }
  </div>
    :
  <div className="list-group list-group-numbered d-flex justify-content-between mt-2 " role="alert"  style={{width:'500px'}} >
  {
   this.state.ringActiveChatMessages?.map((el)=>{
    return(
       <div key={el.id} className="d-flex justify-content-between align-items-start p-2  border-bottom" onClick={()=>this.startChating(el.ringChatId,el.ringChatName)}>
        <img 
          src={el.ringChatPhotoId} className='chat_image rounded-circle' alt='' style={{ height:'50px'}}
          onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src="./img/svg/group_chat.svg";
      }}/>
       <div className="me-auto ms-2 mt-2">
           <p className="img_align">{el.ringChatName}  </p>
       </div>
     
   </div>
    )
   })
  }
  </div>
  }
  
</div>
  </div>
  </div>
   </div>
    
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);



