import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { deleteTodoAsync, createAsyncTodo } from '../../redux/actions/todos/todosAction';
import { showErrorNotification } from '../../utils/helpers/displayNotifications';
import { Todo } from '../../redux/reducers/todos/types';
import { TODO_LIST } from '../../utils/constants/testId.constant';
import COLORS from '../../utils/constants/color.constant';
import CopyImage from '../../assets/images/copy.svg';
import getLocalStorageSession from '../../utils/helpers/localStorage';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import TrashImage from '../../assets/images/delete.svg';

type CardProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  testId: string,
  todo: Todo,
}

const Card = ({ todo, onClick, testId }: CardProps) => {
  const dispatch = useDispatch();
  
  const handleDeleteTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const session = getLocalStorageSession();
    
    if (session) {
      const { sessionId } = JSON.parse(session);
      dispatch(deleteTodoAsync(todo.id, sessionId))
    }
  };

  const handleDuplicateTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const session = getLocalStorageSession();

    if (!session) {
      throw showErrorNotification();
    }

    try {
      const { sessionId } = JSON.parse(session);
      dispatch(createAsyncTodo(todo, sessionId));
    } catch {
      throw showErrorNotification();
    }
  };

  return (
    <Wrapper data-testid={testId} onClick={onClick}>
      <Title>{todo.text}</Title>
      <PanelBoard>
        <DuplicateIcon
          alt="Trash Icon"
          data-testid={TODO_LIST.COPY_WRAPPER} 
          onClick={handleDuplicateTodo}
          src={CopyImage}
        />

        <TrashIcon
          alt="Trash Icon"
          data-testid={TODO_LIST.TRASH_WRAPPER} 
          onClick={handleDeleteTodo}
          src={TrashImage}
        />
      </PanelBoard>
    </Wrapper>
  );
}

const DuplicateIcon = styled.img`
  cursor: pointer;
  height: 20px;
  margin: 5px 5px 0 0;
  width: 16px;
`;

const TrashIcon = styled.img`
  cursor: pointer;
  height: 20px;
  margin-top: 5px;
  width: 16px;
`;

const PanelBoard = styled.section`
  border-top: 1px solid ${COLORS.PRIMARY};
  display: flex;
  justify-content: flex-end;
  margin: 0 25px 10px 25px;
`;

const Title = styled.h3`
  color: ${COLORS.PRIMARY};
  flex: 1;
  font-weight: bold;
  margin: 25px 25px 0 25px;
  padding: 0;
`;

const Wrapper = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 133px;
  margin: 10px 0 0 0;
  width: 100%;

  &:hover {
    opacity: 0.9;
    transition: all 0.25s;
  }

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 0 10px 10px 0;
    width: 393px;
  }
`;

export default Card;