import { combineReducers } from "redux";

import modalReducer from "./modal";
import todosReducer from './todos';

const rootReducer = combineReducers({
  modal: modalReducer,
  todoList: todosReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;