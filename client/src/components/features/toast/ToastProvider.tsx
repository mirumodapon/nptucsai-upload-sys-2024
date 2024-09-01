import { createPortal } from 'react-dom';
import ToastWrapper from '@/components/features/toast/ToastWrapper';

function ToastProvider() {
  return createPortal(
    <ToastWrapper />,
    document.body
  );
}

export default ToastProvider;
