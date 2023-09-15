import type from "../types";

let modalActions = {
 
    toggleModal:function(Payload) {
      return { 
        type: type.TOGGLE_MODAL,
        Payload
      }
    },
    
  }
  
  
  export default modalActions;