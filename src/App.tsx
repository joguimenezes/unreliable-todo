import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './globalStyles';
import Modal from './components/modal/Modal';
import Session from './screens/session/Session.screen';
import TodoList from './screens/task/TodoList.screen';


const App = () => {
  return (
    <Router>
      <GlobalStyle />

      <Modal />

      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />

      <Route
        component={Session}
        exact
        path="/"
      />

      <Route
        component={TodoList}
        path="/todos"
      />
    </Router>
  );
}

export default App;
