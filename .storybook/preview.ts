
import '../src/shared/styles/globals.css';
import { createElement } from 'react';
import { Provider } from 'react-redux';
import type { Preview } from '@storybook/nextjs-vite';

import { store } from '../src/redux';

const preview: Preview = {
  decorators: [
    (Story) => createElement(Provider, { store, children: createElement(Story) }),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;