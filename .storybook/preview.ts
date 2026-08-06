// @ts-ignore
import '../src/shared/styles/globals.css';
import '../src/shared/lib/browserDetector';
import { createElement, Fragment } from 'react';
import { Provider } from 'react-redux';
import type { Preview } from '@storybook/nextjs-vite';

import { store } from '../src/redux';
import { Toaster } from '../src/shared/components/uiux/Sonner';

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        Fragment,
        null,
        createElement(Provider, { store, children: createElement(Story) }),
        createElement(Toaster, { style: { '--z-index': 9999 } as React.CSSProperties })
      ),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['app', ['system', 'page', 'popup', '_excluded', 'excluded', '*']],
      },
    },
    nextjs: {
      appDirectory: true,
    },
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
      test: 'todo',
    },
  },
};

export default preview;
