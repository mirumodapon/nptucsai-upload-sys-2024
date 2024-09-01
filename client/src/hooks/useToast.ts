import { create } from 'zustand';

type Toast = {
  key: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  exit?: boolean;
};

type UseToast = {
  toast: Record<string, Toast>;
  addToast: (options: AddToastOptions) => void;
  removeToast: (key: string) => void;
  exitToast: (key: string) => void;
};

type AddToastOptions = Toast & {
  during: number;
};

const useToast = create<UseToast>((set) => {
  const addToast = (options: AddToastOptions) => {
    const { during, ...opts } = options;
    set(({ toast }) => ({ toast: { ...toast, [options.key]: opts } }));
    setTimeout(() => exitToast(options.key), during);
  };

  const exitToast = (key: string) => {
    set((state) => {
      const toast = Object.assign({}, state.toast);
      toast[key].exit = true;
      return { toast };
    });

    setTimeout(() => removeToast(key), 500);
  };

  const removeToast = (key: string) => {
    set((state) => {
      const toast = Object.assign({}, state.toast);
      delete toast[key];
      return { toast };
    });
  };

  return {
    toast: {},
    addToast,
    removeToast,
    exitToast
  };
});

export default useToast;
