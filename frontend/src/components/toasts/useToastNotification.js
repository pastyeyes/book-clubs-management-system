import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast();

const defaultOptions = {
    position: 'top-right',
    queue: true
}

export const showToast = (message = 'Error', type = 'default') => {
    switch (type) {
        case 'success':
        toast.success(message, defaultOptions)
        break
        case 'error':
        toast.error(message, defaultOptions)
        break
        case 'warning':
        toast.warning(message, defaultOptions)
        break
        case 'info':
        toast.info(message, defaultOptions)
        break
        default:
        toast(message, defaultOptions)
    }

  return showToast;
}