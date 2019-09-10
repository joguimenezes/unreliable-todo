import { ModalState, ModalActionTypes } from "../../../types/modalTypes";

const CLOSE_MODAL = 'CLOSE_MODAL';
const OPEN_MODAL = 'OPEN_MODAL';

const initialState: ModalState = {
  isModalOpen: false,
}

const modalReducer = (state = initialState, action:ModalActionTypes): ModalState => {
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