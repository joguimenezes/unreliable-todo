import React from 'react'
import styled from 'styled-components';

import COLORS from '../../utils/constants/color.constant';
import MEDIA_QUERIES from '../../utils/constants/mediaQuery.constant';
import Loader from '../loader/Loader';

interface ButtonProps {
  isLoading: boolean,
  onClick?: (event: React.MouseEvent) => void,
  testId?: string,
  text: string,
}

const Button = ({ isLoading, onClick, testId, text }: ButtonProps) => {
  return (
    <Btn data-testid={testId} onClick={onClick} type="button">
      {
        isLoading
        ? <Loader backgroundColor={COLORS.PRIMARY} />
        : text 
      }
    </Btn>
  )
}

const Btn = styled.button`
  background-color: ${COLORS.SECONDARY};
  border-radius: 99px;
  border: none;
  color: ${COLORS.PRIMARY};
  cursor: pointer;
  height: 55px;
  transition: all .5s;
  width: calc(100% - 25px);

  &:hover {
    opacity: 0.8;
  }

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    width: 385px;
  }
`;

export default Button