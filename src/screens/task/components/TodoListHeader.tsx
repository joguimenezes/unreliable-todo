import React, { Fragment } from 'react';
import styled from 'styled-components';

import COLORS from '../../../utils/constants/color.constant';
import MEDIA_QUERIES from '../../../utils/constants/mediaQuery.constant';
import Button from '../../../components/button/Button';
import useModal from '../../../hooks/useModal';


type Props = {
  handleFilterTodos: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const TodoListHeader = ({ handleFilterTodos }: Props) => {
  const { handleOpenModal } = useModal();

  return (
    <Fragment>
      <SearchInput
        onChange={handleFilterTodos}
        placeholder="Search"
      />
      <StyledButton
        isLoading={false}
        onClick={() => handleOpenModal('SESSION')}
        text="Manage your session"
      />
    </Fragment>
  )
};

const StyledButton = styled(Button)`
  position: absolute;
  right: 100px;
  top: 80px;
  width: 280px;
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

export default TodoListHeader;