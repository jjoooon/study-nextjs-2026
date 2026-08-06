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
    (Story, context) => {
      const match = context.title?.match(/(?:page|popup)\/([A-Za-z0-9]+)/i);
      const pageId = match ? match[1] : null;
      const activeStep = context.args?.activeStep || context.initialArgs?.activeStep;
      const stepQuery = activeStep ? `?activeStep=${activeStep}` : '';

      const devUrl = pageId ? `http://localhost:3000/pub/ispl/${pageId}${stepQuery}` : null;

      return createElement(
        Fragment,
        null,
        createElement(Provider, { store, children: createElement(Story) }),
        createElement(Toaster, { style: { '--z-index': 9999 } as React.CSSProperties }),
        devUrl
          ? createElement(
              'a',
              {
                href: devUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
                style: {
                  position: 'fixed',
                  top: '10px',
                  right: '10px',
                  zIndex: 999999,
                  backgroundColor: '#ff5c2e',
                  color: '#ffffff',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  fontFamily: 'sans-serif',
                },
                title: `${pageId} Dev 페이지 새 탭으로 열기`,
              },
              `🚀 Dev 페이지 (${pageId}) ↗`
            )
          : null
      );
    },
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
