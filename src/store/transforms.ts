import { createTransform } from 'redux-persist';

/**
 * Auth State Transform
 *
 * @description
 * Filters out sensitive information from auth state before persistence.
 *
 * @security
 * - Token is NOT stored (prevents XSS attacks)
 * - Only non-sensitive user info is persisted (isAuthenticated, user id/name)
 * - Token must be re-obtained from server or cookie on app load
 *
 * @usage
 * Before persistence:
 *   { isAuthenticated: true, token: "jwt-xyz", user: {...} }
 *
 * After persistence:
 *   { isAuthenticated: true, token: null, user: {...} }
 */
const authTransform = createTransform(
  // inbound: state -> storage (before saving)
  (inboundState: Record<string, unknown>, key) => {
    if (key === 'auth') {
      // Don't store token or temporary loading states
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { token, isLoading, error, ...safeState } = inboundState as {
        token: string;
        isLoading: boolean;
        error: string | null;
        [key: string]: unknown;
      };

      return safeState;
    }
    return inboundState;
  },
  // outbound: storage -> state (after rehydration)
  (outboundState: Record<string, unknown>, key) => {
    if (key === 'auth') {
      // Ensure token is null after rehydration
      return {
        ...outboundState,
        token: null,
      };
    }
    return outboundState;
  },
  { whitelist: ['auth'] }
);

/**
 * UI State Transform
 *
 * @description
 * Only persists user preferences, not temporary UI state.
 *
 * @ux-improvement
 * - Preserves: theme, sidebar state
 * - Discards: modal state, toast notifications (these shouldn't persist)
 *
 * @rationale
 * Modals and toasts are ephemeral - showing them after page refresh is bad UX
 */
const uiTransform = createTransform(
  // inbound: state -> storage
  (inboundState: Record<string, unknown>, key) => {
    if (key === 'ui') {
      const state = inboundState as {
        sidebar: { isOpen: boolean };
        modal: { isOpen: boolean };
        theme: string;
        toast: unknown;
      };

      // Only keep theme and sidebar state
      return {
        theme: state.theme,
        sidebar: state.sidebar,
      };
    }
    return inboundState;
  },
  // outbound: storage -> state
  (outboundState: Record<string, unknown>, key) => {
    if (key === 'ui') {
      // Merge persisted values with default initial state
      return {
        ...outboundState,
        // Ensure ephemeral states are reset to defaults
        modal: {
          isOpen: false,
          type: null,
          data: null,
        },
        toast: null,
      };
    }
    return outboundState;
  },
  { whitelist: ['ui'] }
);

export const transforms = [authTransform, uiTransform];
