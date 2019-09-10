import React, { Fragment } from 'react';

import { Bold, Label } from '../../text/Texts';
import { DatesWrapper, ModalFooter } from './Wrappers';
import { Todo } from '../../../types/todoTypes';
import Button from '../../button/Button';
import getFormattedDate from '../../../utils/helpers/formatDate';
import ModalMainComponent from './ModalMainComponent';

type Props = {
  handleUpdateTodo: (field: string, value: string | number | boolean) => void,
  isLoading: boolean,
  saveTodo: () => void,
  selectedTodo: Todo,
  todo: Todo,
};

const UpdateTodoModal = ({
  isLoading,
  handleUpdateTodo,
  saveTodo,
  selectedTodo,
  todo,
}: Props) => (
  <Fragment>
      <ModalMainComponent
        onChange={handleUpdateTodo}
        todo={todo}
      >
        <DatesWrapper>
          <Bold>Updated at: </Bold>
          <Label>{getFormattedDate(selectedTodo.updated)} | </Label>
          <Bold>Created at: </Bold>
          <Label>{getFormattedDate(selectedTodo.created)}</Label>
        </DatesWrapper>
      </ModalMainComponent>

      <ModalFooter>
        <Button
          isLoading={isLoading}
          onClick={saveTodo} 
          text="Save" 
        />
      </ModalFooter>
  </Fragment>
);

export default UpdateTodoModal;