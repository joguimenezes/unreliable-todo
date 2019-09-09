import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { deleteTodoAsync } from '../../redux/actions/todos/todosAction';
import { TODO_LIST } from '../../utils/constants/testId.constant';
import COLORS from '../../utils/constants/color.constant';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import TrashImage from '../../assets/images/delete.svg';
import getLocalStorageSession from '../../utils/helpers/localStorage';

type CardProps = {
  id: string,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  testId: string,
  title: string,
}

const Card = ({ id, onClick, testId, title }: CardProps) => {
  const dispatch = useDispatch();
  
  const handleDeleteTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const session = getLocalStorageSession();
    
    if (session) {
      const { sessionId } = JSON.parse(session);
      dispatch(deleteTodoAsync(id, sessionId))
    }
  };

  return (
    <Wrapper data-testid={testId} onClick={onClick}>
      <Title>{title}</Title>
      <PanelBoard>
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