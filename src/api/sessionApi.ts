import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
});

const createSession = (errorRate: number) => instance
  .post('/session', {
    errorRate,
  })
  .then(response => response.data);

const updateSession = (errorRate: number, sessionId: string) => instance
  .patch('/session', {
    errorRate
  }, {
    headers: {
      "Content-Type":"application/json",
      sessionId,
    },
  })
  .then(response => response.data);

const deleteSession = (sessionId: string) => instance
  .delete('/session', {
    headers: {
      "Content-Type":"application/json",
      sessionId,
    }
  })
  .then(response => response.data);


export {
  createSession,
  deleteSession,
  updateSession,
}
