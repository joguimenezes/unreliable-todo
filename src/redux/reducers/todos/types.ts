export interface TodosState {
  error: boolean,
  isLoadingTodos: boolean,
  selectedTodo: Todo | undefined,
  todos: Todo[],
};

export type Todo = {
  created: Date,
  id: string,
  isCompleted: boolean,
  text: string,
  updated: Date,
  urgency: number,
};

export type TodoState = Todo;

export interface UpdatedTodo {
  data: {
    isCompleted?: boolean,
    text?: string,
    urgency?: number,
  }
  sessionId: string,
  todoId: string,
};

//// actions
export const SET_SELECTED_TODO = 'SET_SELECTED_TODO';
export const UPDATE_TODOS = 'UPDATE_TODOS';

interface UpdateTodosAction {
  type: typeof UPDATE_TODOS,
  payload: {
    error: boolean,
    isLoadingTodos: boolean,
    todos: Todo[],
  },
};

interface SetSelectedTodoAction {
  type: typeof SET_SELECTED_TODO,
  payload: Todo | undefined,
};

export type TodosActionTypes = UpdateTodosAction | SetSelectedTodoAction;