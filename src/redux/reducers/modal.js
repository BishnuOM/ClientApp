import type from "../types";

const initialState = {
    modal_name:'',
  } 

const modal = (state =initialState, action) => {
    switch (action.type) {
      case type.TOGGLE_MODAL:
        return {
          ...state,
          modal_name: action.Payload,
        }

      default:
        return state
    }
}
export default modal;