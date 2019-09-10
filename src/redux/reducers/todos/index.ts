import { 
  SET_SELECTED_TODO,
  TodosActionTypes,
  TodosState,
  UPDATE_TODOS,
} from '../../../types/todoTypes';

const initialState: TodosState = {
    error: false,
    isLoadingTodos: false,
    selectedTodo: undefined,
    todos: [],
};

const todosReducer = (state = initialState, action: TodosActionTypes): TodosState => {
  switch(action.type) {
    case UPDATE_TODOS:
      return {
          ...state,
          error: action.payload.error,
          isLoadingTodos: action.payload.isLoadingTodos,
          todos: action.payload.todos,
      }
    case SET_SELECTED_TODO:
      return {
          ...state,
          selectedTodo: action.payload
      }
    default:
      return state;
  }
};

export default todosReducer;