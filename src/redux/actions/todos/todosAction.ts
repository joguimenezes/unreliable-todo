import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';

import { AppState } from '../../reducers';
import { getTodos, updateTodo, deleteTodo, createTodo } from '../../../api/todosApi';
import { TodosActionTypes, UPDATE_TODOS, Todo, UpdatedTodo } from '../../reducers/todos/types';

const updateTodos = (todos: Todo[], isLoadingTodos: boolean = false, error: boolean = false): TodosActionTypes => ({
  type: UPDATE_TODOS,
  payload: {
    error,
    isLoadingTodos,
    todos,
  }
});

const fetchTodos = (sessionId: string): ThunkAction<Promise<void>, {}, {}, TodosActionTypes> => {
  return async dispatch => {
    try {
      const { todos } = await getTodos(sessionId);
      dispatch(updateTodos(todos));
    } catch(error) {
      dispatch(updateTodos([], false, true));
    }
  };
};

const setSelectedTodo = (todo?: Todo): TodosActionTypes => ({
  type: 'SET_SELECTED_TODO',
  payload: todo,
});

const updateTodoAsync = ({ 
  data,
  sessionId,
  todoId,
}: UpdatedTodo): ThunkAction<Promise<void>, AppState, {}, TodosActionTypes> => {
  return async (dispatch, getState) => {
    try {
      const { todo: newTodo } = await updateTodo({ todoId, sessionId, data });
      const { todos: currentTodos } = getState().todoList;

      const newTodos = {
        ...currentTodos,
        [newTodo.id]: {
          ...newTodo,
          ...data,
        },
      };

      dispatch(updateTodos(newTodos));
      toast('😁 Todo successfully changed', { type: toast.TYPE.SUCCESS });
    } catch {
      toast('Oops, something went wrong!!', { type: toast.TYPE.ERROR });
    }
  };
};

const deleteTodoAsync = (todoId: string, sessionId: string): ThunkAction<Promise<void>, {}, {}, TodosActionTypes> => {
  return async dispatch => {
    try {
      const { todos: newTodos } = await deleteTodo(todoId, sessionId);
      dispatch(updateTodos(newTodos));
      toast('😁 Todo successfully deleted', { type: toast.TYPE.SUCCESS });
    } catch {
      toast('🤔 Oops, something went wrong!!', { type: toast.TYPE.ERROR });
    }
  }
};

const createAsyncTodo = (todo: Todo, sessionId: string): ThunkAction<Promise<void>, AppState, {}, TodosActionTypes> => {
  return async (dispatch, getState) => {
    try {
      const { todo: newTodo } = await createTodo(todo, sessionId);
      const { todos: currentTodos } = getState().todoList;

      const newTodos = {
        ...currentTodos,
        [newTodo.id]: newTodo,
      };

      dispatch(updateTodos(newTodos));
      toast('😁 Todo successfully created', { type: toast.TYPE.SUCCESS });
    } catch {
      toast('🤔 Oops, something went wrong!!', { type: toast.TYPE.ERROR });
    }
  }
};

export {
  createAsyncTodo,
  deleteTodoAsync,
  fetchTodos,
  setSelectedTodo,
  updateTodoAsync,
}