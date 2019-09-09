import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const createSession = (errorRate: number) => instance
  .post('/session', {
    errorRate,
  })
  .then(response => response.data);


export {
  createSession,
}
