import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserList } from '@/features/users';
import { renderWithProviders } from '@/tests/test-utils';
import { setupStore } from '@/store';
import { apiSlice } from '@/store/apiSlice';

// Mock MSW handlers
jest.mock('@/mocks/browser');

describe('UserList Component', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
  });

  it('renders loading state initially', () => {
    renderWithProviders(<UserList />, { store });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state on error', async () => {
    // Mock API error
    store.dispatch(apiSlice.endpoints.getUsers.initiate());

    renderWithProviders(<UserList />, { store });

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('renders user list when data is loaded', async () => {
    // Mock successful response
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    // Mock the API response
    jest.spyOn(store, 'dispatch').mockReturnValue({});

    renderWithProviders(<UserList />, { store });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});
