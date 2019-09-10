import axios from 'axios';
import { Todo, UpdatedTodo } from '../types/todoTypes';
import getHeaders from '../utils/constants/headers.constant';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
});

const getTodos = (sessionId: string) => instance
  .get('/todos', {
    headers: getHeaders(sessionId),
  })
  .then(response => response.data);

const createTodo = (todo: Todo, sessionId: string) => instance
  .post('/todos/', todo, {
    headers: getHeaders(sessionId),
  })
  .then(response => response.data);

const deleteTodo = (todoId: string, sessionId: string) => instance
  .delete(`/todos/${todoId}`, {
    headers: getHeaders(sessionId),
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
    headers: getHeaders(sessionId),
  })
  .then(response => response.data);


export {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
}
