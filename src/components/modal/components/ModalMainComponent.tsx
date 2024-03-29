import React, { ReactChild } from 'react';
import styled from 'styled-components';

import { Todo } from '../../../types/todoTypes';
import COLORS from '../../../utils/constants/color.constant';
import MEDIA_QUERIES from '../../../utils/constants/mediaQuery.constant';
import RoundedInput from '../../input/RoundedInput';
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
        onChange={e => onChange('urgency', e.currentTarget.value)}
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
  width: 100%;
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
  margin: 5px 0;
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
  position: relative;
  width: 100%;

  @media ${MEDIA_QUERIES.DESKTOP_SCREEN} {
    margin: 50px auto 0;
    width: 550px;
  }
`;

export default ModalMainComponent;
