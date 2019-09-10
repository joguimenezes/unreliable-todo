import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../redux/reducers';
import { fetchTodos, setSelectedTodo } from '../../redux/actions/todos/todosAction';
import { openModal } from '../../redux/actions/modal';
import { SessionType } from '../../types/sessionType';
import { Title, Bold } from '../../components/texts/Texts';
import { Todo } from '../../types/todoTypes';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import COLORS from '../../utils/constants/color.constant';
import getLocalStorageSession from '../../utils/helpers/localStorage';
import Loader from '../../components/loader/Loader';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import TodoListHeader from './components/TodoListHeader';
import transformToLowerCase from '../../utils/helpers/transformToLowerCase';
import useModal from '../../hooks/useModal';

const TodoList = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const { error, isLoadingTodos, todos } = useSelector((state: AppState) => state.todoList);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const { handleOpenModal } = useModal();
  const session = getLocalStorageSession();

  useEffect(() => {
    const redirectToSessionScreen = () => {
      if (!session) {
        history.push('/');
        return;
      }
    };

    redirectToSessionScreen();
  }, []);

  const handleGetTodos = () => {
    if (session) {
      const formattedSession: SessionType = JSON.parse(session);
      dispatch(fetchTodos(formattedSession.sessionId));
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, [])

  useEffect(() => {
    setFilteredTodos(Object.values(todos));
  }, [todos]);

  const handleOnClickTodo = (todo: Todo) => {
    dispatch(openModal('EDIT_TODO'));
    dispatch(setSelectedTodo(todo));
  };

  const handleFilterTodos = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const filter = Object.values(todos)
      .filter((todo: Todo) => transformToLowerCase(todo.text).includes(transformToLowerCase(currentTarget.value)));

    setFilteredTodos(filter);
  };

  return (
    <Wrapper>
      <TodoListHeader handleFilterTodos={handleFilterTodos} />

      <BoardWrapper>
        <Header>
          <StyledTitle>To do list</StyledTitle>
          <ActionsWrapper>
            <AddCard onClick={() => handleOpenModal('ADD')}>+</AddCard>
          </ActionsWrapper>
        </Header>

        <CardsWrapper>
          {error && (
            <Button
              isLoading={isLoadingTodos}
              onClick={handleGetTodos}
              text="Retry get todos"
            />
          )}

          {!error && isLoadingTodos
            ? <Loader backgroundColor={COLORS.WHITE} />
            : filteredTodos.map((todo: Todo) => <Card todo={todo} key={todo.id} onClick={() => handleOnClickTodo(todo)} testId={`card-wrapper${todo.id}`} />)}
        </CardsWrapper>
      </BoardWrapper>
    </Wrapper>
  )
};

const AddCard = styled(Bold)`
  color: ${COLORS.SECONDARY};
  cursor: pointer;
  font-size: 55px;
  margin-right: 15px;

  &:hover {
    opacity: 0.8;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`;

const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid ${COLORS.SECONDARY};
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 25px;
  width: 100%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 120px 0 25px;
  }
`;

const BoardWrapper = styled.main`
  align-content: flex-start;
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin: 0 25px;
  width: calc(100% - 50px);

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    width: 100%;
  }
`;

const StyledTitle = styled(Title)`
  font-size: 36px;
  font-weight: bold;
  width: 100%;
`;

const Wrapper = styled.div`
  align-content: flex-start;
  align-items: center;
  background-color: ${COLORS.PRIMARY};
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    flex-direction: column;
    padding: 0 132px;
  }
`;

export default withRouter(TodoList);