export interface ModalState {
  isModalOpen: boolean,
  type?: string,
};

const CLOSE_MODAL = 'CLOSE_MODAL';
const OPEN_MODAL = 'OPEN_MODAL';

interface OpenModalAction {
  type: typeof OPEN_MODAL,
  payload: {
    isModalOpen: boolean,
    type: string,
  }
};

interface CloseModalAction {
  type: typeof CLOSE_MODAL,
  payload: {
    isModalOpen: boolean,
  }
};

export type ModalActionTypes = OpenModalAction | CloseModalAction;