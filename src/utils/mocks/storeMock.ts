import { createStore } from "redux";
import rootReducer from "../../redux/reducers";

export const stateMock = {
  todoList: {
    error: false,
    isLoadingTodos: false,
    selectedTodo: undefined,
    todos: [{
      "id": "049d7e7b-230c-41f5-9fdf-b380d31e83ea",
      "text": "Feed the baby",
      "created": "2019-03-11T07:08:33.216Z",
      "updated": "2019-03-12T06:33:30.495Z",
      "isCompleted": false,
      "urgency": 3,
    }],
  },
  modal: {
    isModalOpen: false,
  }
};

const storeMock = createStore(
  rootReducer,
  stateMock,
);

export default storeMock;