import React, { Fragment } from 'react';

import { ModalFooter } from './Wrappers';
import { Todo } from '../../../redux/reducers/todos/types';
import Button from '../../button/Button';
import ModalMainComponent from './ModalMainComponent';

type Props = {
  isLoading: boolean,
  handleCreateTodo: () => void,
  handleUpdateTodo: (field: string, value: string | number | boolean) => void,
  todo: Todo,
};

const AddTodoModal = ({
  handleCreateTodo,
  handleUpdateTodo,
  isLoading,
  todo
}: Props) => (
  <Fragment>
    <ModalMainComponent
      onChange={handleUpdateTodo}
      todo={todo}
    />
    <ModalFooter>
      <Button
        isLoading={isLoading}
        onClick={handleCreateTodo} 
        text="Create todo" 
      />
    </ModalFooter>
  </Fragment>
);

export default AddTodoModal;