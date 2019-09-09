import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../redux/reducers';
import { fetchTodos, setSelectedTodo } from '../../redux/actions/todos/todosAction';
import { openModal } from '../../redux/actions/modal';
import { SessionType } from '../../types/sessionType';
import { Todo } from '../../redux/reducers/todos/types';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import COLORS from '../../utils/constants/color.constant';
import FilterImage from '../../assets/images/filter.svg';
import Loader from '../../components/loader/Loader';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import transformToLowerCase from '../../utils/helpers/transformToLowerCase';
import useModal from '../../hooks/useModal';

const TodoList = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const { error, isLoadingTodos, todos } = useSelector((state: AppState) => state.todoList);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const { handleOpenModal } = useModal();

  useEffect(() => {
    const redirectToSessionScreen = () => {
      const session = localStorage.getItem('@unreliable-todo/sessionId');

      if (!session) {
        history.push('/');
        return;
      }
    };

    redirectToSessionScreen();
  }, []);

  const handleGetTodos = () => {
    const session = localStorage.getItem('@unreliable-todo/sessionId');

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

  const handleFilterTodos = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const filter = Object.values(todos)
      .filter((todo: Todo) => transformToLowerCase(todo.text).includes(transformToLowerCase(currentTarget.value)));

    setFilteredTodos(filter);
  };

  return (
    <Wrapper>
      <SearchInput onChange={handleFilterTodos} placeholder="Search"/>

      <BoardWrapper>
        <Header>
          <Title>To do list</Title>
          <ActionsWrapper>
            <AddCard onClick={() => handleOpenModal('ADD')}>+</AddCard>
            <Filter alt="Filter Icon" src={FilterImage}/>
          </ActionsWrapper>
        </Header>

        <CardsWrapper>
          {
            error && (
              <Button
                isLoading={isLoadingTodos}
                onClick={handleGetTodos}
                text="Retry get todos"
              />
            )
          }

          {
            isLoadingTodos
            ? <Loader backgroundColor={COLORS.WHITE} />
            : filteredTodos.map((todo: Todo) => <Card id={todo.id} key={todo.id} onClick={() => handleOnClickTodo(todo)} testId={`card-wrapper${todo.id}`} title={todo.text} />)
          }
        </CardsWrapper>
      </BoardWrapper>
    </Wrapper>
  )
};

const AddCard = styled.span`
  color: ${COLORS.SECONDARY};
  cursor: pointer;
  font-size: 55px;
  font-weight: bold;
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

const Filter = styled.img`
  cursor: pointer;
  height: 33px;
  width: 32px;

  &:hover {
    opacity: 0.8;
  }
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

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${COLORS["WHITE-20%"]};
  color: ${COLORS.WHITE};
  font-size: 24px;
  height: 25px;
  margin: 50px 25px;
  padding-bottom: 10px;
  text-align: center;
  width: calc(100% - 50px);

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 80px 0 0 0;
    width: 550px;
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

const Title = styled.h1`
  color: ${COLORS.WHITE};
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  padding: 0;
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