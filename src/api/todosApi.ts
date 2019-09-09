import axios from 'axios';
import { Todo, UpdatedTodo } from '../redux/reducers/todos/types';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
});

const getTodos = (sessionId: string) => instance
  .get('/todos', {
    headers: {
      sessionId,
    }
  })
  .then(response => response.data);

const createTodo = (todo: Todo, sessionId: string) => instance
  .post('/todos/', todo, {
    headers: {
      "Content-Type": "application/json",
      sessionId,
    }
  })
  .then(response => response.data);

const deleteTodo = (todoId: string, sessionId: string) => instance
  .delete(`/todos/${todoId}`, {
    headers: {
      "Content-Type": "application/json",
      sessionId,
    }
  })
  .then(response => response.data)


const updateTodo = ({ 
  data,
  sessionId,
  todoId,
}: UpdatedTodo) => instance
  .patch(`/todos/${todoId}`, {
    data: {
      isCompleted: data.isCompleted,
      text: data.text,
      urgency: data.urgency,
    }
  }, {
    headers: {
      "Content-Type":"application/json",
      sessionId,
    },
  })
  .then(response => response.data);


export {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
}
