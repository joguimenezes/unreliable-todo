import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from "react-router-dom";

import TodoListScreen from '../../../../screens/task/TodoList.screen';
import storeMock, { stateMock } from '../../../../utils/mocks/storeMock';
import { Provider } from 'react-redux';

describe('TodoListScreen tests', () => {
  describe('when screen render', () => {
    it('should display mocked todo item', () => {
      const [todo] = stateMock.todoList.todos;

      const { getByText, unmount } = render(
        <Provider store={storeMock}>
          <Router>
            <TodoListScreen />
          </Router>
        </Provider>
      );
      
      expect(getByText(todo.text)).toBeInTheDocument();
      unmount();
    });
  });
});