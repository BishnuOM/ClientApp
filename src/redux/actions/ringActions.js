import type from "../types";

let ringActions = {

    setChatStages:function(payload) {
      return { 
        type: type.SET_CHAT_STAGE,
        payload
      }
    },
 
    setRingDetail:function(payload) {
      return { 
        type: type.SET_RING_DETAIL,
        payload
      }
    },
    messageList:function(payload){
      return{
          type:type.MESSAGE_LIST,
          payload
      }
  },
  updateMessageList:function(payload){
      return{
          type:type.UPDATE_MESSAGE_LIST,
          payload
      }
  },
    
  }
  
  
  export default ringActions;