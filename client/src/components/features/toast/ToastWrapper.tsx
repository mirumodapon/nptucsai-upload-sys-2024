import ToastAlert from '@/components/features/toast/ToastAlert';
import useToast from '@/hooks/useToast';

function ToastWrapper() {
  const toast = useToast(state => state.toast);

  return (
    <div className="fixed bottom-5 right-5 w-64 flex flex-col gap-y-3">
      {
        Object.values(toast).map(({ key, ...t }) => (
          <ToastAlert key={key} toastKey={key} {...t}>
            { t.message }
          </ToastAlert>
        ))
      }

    </div>
  );
}

export default ToastWrapper;
