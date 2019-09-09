import { Reducer } from 'redux';

const CLOSE_MODAL = 'CLOSE_MODAL';
const OPEN_MODAL = 'OPEN_MODAL';

const initialState = {
  isModalOpen: false,
}

const modalReducer: Reducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: action.payload.isModalOpen,
        type: action.payload.type,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: action.payload.isModalOpen,
      }
    
    default:
      return state
  }
}

export default modalReducer;