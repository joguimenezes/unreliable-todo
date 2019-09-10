import { toast } from 'react-toastify';

const showSuccessNotification = (message: string) => {
  toast(message, { type: toast.TYPE.SUCCESS });
};

const errorMessageDefault = '🤔 Oops, something went wrong!!';
const showErrorNotification = (message: string = errorMessageDefault) => {
  toast(message, { type: toast.TYPE.ERROR });
};

export {
  showErrorNotification,
  showSuccessNotification,
}