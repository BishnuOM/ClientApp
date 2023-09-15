import type from "../types";

const initialState = {
    ring_detail:'',
    message_list:[],
    messages_grupuByDate:[],
    chat_stage:''
  } 

const ringReducer = (state =initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
      case type.SET_RING_DETAIL:
        return {
          ...state,
          ring_detail: action.payload,
        }
      case type.MESSAGE_LIST:
          return{
              ...state,
              message_list:action.payload,
              messages_grupuByDate:action.payload
          } 
      case type.SET_CHAT_STAGE:
          return{
              ...state,
              chat_stage:action.payload
             
          } 
      case type.UPDATE_MESSAGE_LIST:
          
          const res=[...state.message_list,...action.payload];
          const final=res.sort((a,b) => a.timetoken - b.timetoken);

          const groupBy = final.reduce((acc, currentValue) => {
              let groupKey = currentValue.groupbyDate;
              if (!acc[groupKey]) {
                acc[groupKey] = [];
              }
              acc[groupKey].push(currentValue);
              return acc;
            }, {});
            debugger
          return{
              ...state,
              message_list:final,
              messages_grupuByDate:groupBy
          } 
      default:
        return state
    }
}
export default ringReducer;