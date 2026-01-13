import * as uiSelectors from '@/features/ui/store/uiSelectors';
import * as uiActions from '@/features/ui/store/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store';

export const useUI = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(uiSelectors.selectUIState);

  return {
    ...ui,
    toggleSidebar: () => dispatch(uiActions.toggleSidebar()),
    setSidebarOpen: (open: boolean) => dispatch(uiActions.setSidebarOpen(open)),
    openModal: (type: string, data?: unknown) => dispatch(uiActions.openModal({ type, data })),
    closeModal: () => dispatch(uiActions.closeModal()),
    setTheme: (theme: 'light' | 'dark') => dispatch(uiActions.setTheme(theme)),
    showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration?: number) =>
      dispatch(uiActions.showToast({ message, type, duration })),
    clearToast: () => dispatch(uiActions.clearToast()),
  };
};

export const useSidebar = () => {
  const sidebar = useAppSelector(uiSelectors.selectSidebar);
  const dispatch = useAppDispatch();

  return {
    ...sidebar,
    toggle: () => dispatch(uiActions.toggleSidebar()),
    setOpen: (open: boolean) => dispatch(uiActions.setSidebarOpen(open)),
  };
};

export const useModal = () => {
  const modal = useAppSelector(uiSelectors.selectModal);
  const dispatch = useAppDispatch();

  return {
    ...modal,
    open: (type: string, data?: unknown) => dispatch(uiActions.openModal({ type, data })),
    close: () => dispatch(uiActions.closeModal()),
  };
};
