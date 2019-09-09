import React, { ReactChild } from 'react';
import styled from 'styled-components';

import { Todo } from '../../../redux/reducers/todos/types';
import COLORS from '../../../utils/constants/color.constant';
import MEDIA_QUERIES from '../../../utils/constants/mediaQuery.constant';
import RoundedInput from '../../inputs/RoundedInput';
import { MODAL } from '../../../utils/constants/testId.constant';

type Props = {
  children?: ReactChild,
  onChange: (field: string, value: string | number | boolean) => void,
  todo: Todo,
};

const ModalMainComponent = ({ children, onChange, todo }: Props) => (
  <Main>
    <TextWrapper>
      <Bold>Todo text:</Bold>
      <Textarea data-testid={MODAL.TEXT_TEXTAREA} onChange={e => onChange('text', e.currentTarget.value)} value={todo && todo.text} />
    </TextWrapper>

    <TextWrapper>
      <Bold>Urgency:</Bold>
      <StyledRoundedInput
        onChange={e => onChange('urgency', parseInt(e.currentTarget.value, 10))}
        testId={MODAL.URGENCY_INPUT}
        value={todo && todo.urgency}
      />
    </TextWrapper>

    <TextWrapper>
      <Bold>Completed:</Bold>
      <Checkbox
        checked={todo && todo.isCompleted}
        onChange={e => onChange('isCompleted', e.target.checked)}
        type="checkbox"
        data-testid={MODAL.IS_COMPLETED_CHECKBOX}
      /> 
    </TextWrapper>

    {children}
  </Main>
);

const StyledRoundedInput = styled(RoundedInput)`
  border-color: ${COLORS["PRIMARY-20%"]};
  color: ${COLORS.PRIMARY};
`;

const Checkbox = styled.input``;

const Bold = styled.span`
  color: ${COLORS.PRIMARY};
  font-weight: bold;
`;

const Textarea = styled.textarea`
  border-radius: 6px;
  border: 1px solid ${COLORS["PRIMARY-20%"]};
  color: ${COLORS.PRIMARY};
  height: 100px;
  margin: 5px 0 20px;
  padding: 25px;
  resize: none;
  width: calc(100% - 50px);
  

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    height: 180px;
    padding-bottom: 0;
    width: 503px;
  }

  &:focus {
    border-color: ${COLORS.SECONDARY};
  }
`;

const TextWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  width: calc(100% - 25px);

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 0;
    width: 100%;
  }
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 50px auto 0;
    width: 550px;
  }
`;

export default ModalMainComponent;
