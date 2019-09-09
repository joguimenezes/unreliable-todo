const openModal = (type: string) => ({
  type: 'OPEN_MODAL',
  payload: {
    isModalOpen: true,
    type,
  }
});

const closeModal = () => ({
  type: 'CLOSE_MODAL',
  payload: {
    isModalOpen: false,
  }
});

export {
  closeModal,
  openModal,
}