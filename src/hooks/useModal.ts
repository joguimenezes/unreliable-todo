import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../redux/reducers';
import { closeModal, openModal } from '../redux/actions/modal';
import { setSelectedTodo } from '../redux/actions/todos/todosAction';

const useModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.modal.isModalOpen);

  const handleOpenModal = (type: string) => {
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