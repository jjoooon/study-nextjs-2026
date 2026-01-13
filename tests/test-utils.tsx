import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '@/store';

// This type interface extends the default options for render from RTL
// and allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: any;
}

// Wrapper with Redux Provider
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        // Feature-based slices for client state
        auth: (state = { isAuthenticated: false, user: { id: null, name: null, email: null }, token: null, isLoading: false, error: null }) => state,
        ui: (state = { sidebar: { isOpen: true }, modal: { isOpen: false, type: null, data: null }, toast: null, theme: 'light' }) => state,
        dashboard: (state = { widgets: [], isLoading: false, lastUpdated: null }) => state,

        // Domain-specific API slices (mock reducers for testing)
        usersApi: (state = {}) => state,
        postsApi: (state = {}) => state,
        authApi: (state = {}) => state,
      } as any, // Type assertion for test store
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything from RTL
export * from '@testing-library/react';
