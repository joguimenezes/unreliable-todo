import { Reducer } from 'redux';

const initialState = {
  sessionId: null,
}

const sessionReducer: Reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        sessionId: action.payload.sessionId
      }
    case 'DELETE_SESSION':
      return {
        ...state,
        sessionId: null,
      }
    default:
      return state;
  }
}

export default sessionReducer;