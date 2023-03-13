import { toast } from "react-toastify";

const ToastMessage = ({ type, message }) => {
    const toastConfig = {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
    };
  
    const showToast = () => {
      switch (type) {
        case 'error':
          return toast.error(message, toastConfig);
        case 'warning':
          return toast.warning(message, toastConfig);
        case 'success':
          return toast.success(message, toastConfig);
        default:
          return toast(message, toastConfig);
      }
    };
  
    showToast();
  
    return null;
  };
  
  export default ToastMessage;