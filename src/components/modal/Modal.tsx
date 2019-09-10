import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { updateTodoAsync, createAsyncTodo } from '../../redux/actions/todos/todosAction';

import AddTodoModal from './components/AddTodoModal';
import COLORS from '../../utils/constants/color.constant';
import HeaderImage from '../../assets/images/modal-background-image.svg';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import UpdateTodoModal from './components/UpdateTodoModal';
import useModal from '../../hooks/useModal';

import { UpdatedTodo } from '../../redux/reducers/todos/types';
import { AppState } from '../../redux/reducers';
import SessionModal from './components/SessionModal';
import getLocalStorageSession from '../../utils/helpers/localStorage';

const Modal = () => {
  const dispatch = useDispatch();

  const { selectedTodo } = useSelector((state: AppState) => state.todoList);
  const { isModalOpen, type } = useSelector((state: AppState) => state.modal);

  const [todo, setTodo] = useState();
  const [isLoadingUpdateTodo, setIsLoadingUpdateTodo] = useState(false);

  const { handleCloseModal } = useModal();
  const session = getLocalStorageSession();

  const handleUpdateSelectedTodo = (field: string, value: boolean | string | number) => {
    setTodo({
      ...todo,
      [field]: value,
    });
  };

  useEffect(() => {
      setTodo(selectedTodo);
  }, [selectedTodo]);

  const handleSaveTodo = async () => {
    setIsLoadingUpdateTodo(true);

    if (session && todo) {
      const { sessionId } = JSON.parse(session);
      const updateTodo: UpdatedTodo = {
        data: {
          text: todo.text,
          isCompleted: todo.isCompleted,
          urgency: todo.urgency,
        },
        sessionId,
        todoId: todo.id,
      };

      await dispatch(updateTodoAsync(updateTodo));
      setIsLoadingUpdateTodo(false);
    }
  };

  const handleCreateTodo = () => {
    if (session) {
      const { sessionId } = JSON.parse(session);
      const newTodo = {
        ...todo,
        isCompleted: false,
      };

      dispatch(createAsyncTodo(newTodo, sessionId));
      handleCloseModal();
    };
  };

  if (!isModalOpen) return null;

  const renderModalByType = (type?: string) => {
    switch(type) {
      case 'ADD':
        return (
          <AddTodoModal
            handleCreateTodo={handleCreateTodo}
            handleUpdateTodo={handleUpdateSelectedTodo}
            isLoading={isLoadingUpdateTodo}
            todo={todo}
          />
        )
      case 'SESSION': 
        return (
          <SessionModal />
        )
      default:
        return selectedTodo && (
          <UpdateTodoModal
            handleUpdateTodo={handleUpdateSelectedTodo}
            isLoading={isLoadingUpdateTodo}
            saveTodo={handleSaveTodo}
            selectedTodo={selectedTodo}
            todo={todo}
          />
        )
    }
  };
  
  return (
    <Wrapper>
      <ModalHeader>
        <Image
          alt="Modal background image"
          src={HeaderImage}
        />
        <Title>Your to do</Title>
        <CloseCircle onClick={handleCloseModal}>X</CloseCircle>
      </ModalHeader>

      {renderModalByType(type)}
    </Wrapper>
  )
};

const Title = styled.h1`
  color: ${COLORS.WHITE};
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const CloseCircle = styled.div`
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${COLORS.WHITE};
  color: ${COLORS.WHITE};
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: absolute;
  right: 35px;
  top: 20px;
  width: 40px;

  &:hover {
    opacity: 0.8;
  }
`;

const Image = styled.img`
  display: none;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    display: block;
    height: 500px;
    position: absolute;
    right: 1300px;
    top: 50px;
    width: 450px;
  }
`;

const ModalHeader = styled.header`
  align-items: center;
  background: transparent linear-gradient(61deg, #1E2A39 0%, #364455 100%) 0% 0% no-repeat padding-box;
  display: flex;
  height: 170px;
  justify-content: center;
  position: relative;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    height: 270px;
  }
`;

const Wrapper = styled.div`
  background-color: ${COLORS.WHITE};
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export default Modal;