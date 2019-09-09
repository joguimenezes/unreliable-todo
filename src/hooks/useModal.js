import { useSelector, useDispatch } from 'react-redux';

import { closeModal, openModal } from '../redux/actions/modal';
import { setSelectedTodo } from '../redux/actions/todos/todosAction';

const useModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.modal.isModalOpen);

  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(setSelectedTodo());
  };

  return {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  }
};

export default useModal;