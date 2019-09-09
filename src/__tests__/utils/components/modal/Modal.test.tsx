import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { MODAL } from '../../../../utils/constants/testId.constant';
import { stateMock } from '../../../../utils/mocks/storeMock';
import Modal from "../../../../components/modal/Modal";
import rootReducer from '../../../../redux/reducers';

describe('Modal tests', () => {
  const withSelectedTodoState = {
    modal: {
      isModalOpen: true,
      type: 'UPDATE',
    },
    todoList: {
      ...stateMock.todoList,
      selectedTodo: {
        "id": "049d7e7b-230c-41f5-9fdf-b380d31e83ea",
        "text": "Feed the baby",
        "created": new Date(),
        "updated": new Date(),
        "isCompleted": false,
        "urgency": "3",
      },
    }
  };

  const storeMock = createStore(
    rootReducer,
    withSelectedTodoState,
  );

  describe('when render', () => {
    describe('and type is UPDATE', () => {
      it('should display selected todo ', () => {
        const { getByTestId } = render(
          <Provider store={storeMock}>
            <Router>
              <Modal />
            </Router>
          </Provider>
        );
  
        const todoText = getByTestId(MODAL.TEXT_TEXTAREA);
        expect(todoText.value).toBe(withSelectedTodoState.todoList.selectedTodo.text);
  
        const urgencyInput = getByTestId(MODAL.URGENCY_INPUT);
        expect(urgencyInput.value).toBe(withSelectedTodoState.todoList.selectedTodo.urgency);
  
        const completedCheckbox = getByTestId(MODAL.IS_COMPLETED_CHECKBOX);
        expect(completedCheckbox.checked).toBe(withSelectedTodoState.todoList.selectedTodo.isCompleted);
      });
    });

    describe('and type is ADD', () => {
      const withEmptySelectedTodo = {
        todoList: stateMock.todoList,
        modal: {
          isModalOpen: true,
          type: 'ADD',
        }
      };

      const storeMock = createStore(
        rootReducer,
        withEmptySelectedTodo,
      );

      it('should render inputs with initial state', () => {
        const { debug, getByTestId } = render(
          <Provider store={storeMock}>
            <Router>
              <Modal />
            </Router>
          </Provider>
        );

        const todoText = getByTestId(MODAL.TEXT_TEXTAREA);
        expect(todoText.value).toBe("");
  
        const urgencyInput = getByTestId(MODAL.URGENCY_INPUT);
        expect(urgencyInput.value).toBe("");
  
        const completedCheckbox = getByTestId(MODAL.IS_COMPLETED_CHECKBOX);
        expect(completedCheckbox.checked).toBe(false);
      });
    })
  })
});