import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContentLoader, PageLoader, CardLoader, AsyncContent } from '@/shared/components';

describe('ContentLoader Components', () => {
  describe('ContentLoader', () => {
    it('renders spinner by default', () => {
      render(<ContentLoader />);
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('renders skeleton type', () => {
      render(<ContentLoader type="skeleton" />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders dots type', () => {
      render(<ContentLoader type="dots" />);
      const dots = document.querySelectorAll('.animate-bounce');
      expect(dots.length).toBe(3);
    });

    it('renders correct size classes', () => {
      const { rerender } = render(<ContentLoader size="sm" />);
      expect(screen.getByRole('status')?.firstChild).toHaveClass('h-4');

      rerender(<ContentLoader size="lg" />);
      expect(screen.getByRole('status')?.firstChild).toHaveClass('h-12');
    });
  });

  describe('PageLoader', () => {
    it('renders full page loader', () => {
      render(<PageLoader />);
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    });
  });

  describe('CardLoader', () => {
    it('renders specified number of cards', () => {
      render(<CardLoader count={3} />);
      const cards = document.querySelectorAll('.animate-pulse');
      expect(cards.length).toBe(3);
    });

    it('renders one card by default', () => {
      render(<CardLoader />);
      const cards = document.querySelectorAll('.animate-pulse');
      expect(cards.length).toBe(1);
    });
  });

  describe('AsyncContent', () => {
    it('renders children when not loading and no error', () => {
      render(
        <AsyncContent loading={false} error={null}>
          <div>Content</div>
        </AsyncContent>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders fallback when loading', () => {
      render(
        <AsyncContent loading={true} error={null}>
          <div>Content</div>
        </AsyncContent>
      );
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
    });

    it('renders error fallback when error', () => {
      const error = new Error('Test error');
      render(
        <AsyncContent loading={false} error={error}>
          <div>Content</div>
        </AsyncContent>
      );
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    it('renders custom error fallback', () => {
      const error = new Error('Test error');
      render(
        <AsyncContent
          loading={false}
          error={error}
          errorFallback={<div>Custom Error</div>}
        >
          <div>Content</div>
        </AsyncContent>
      );
      expect(screen.getByText('Custom Error')).toBeInTheDocument();
    });
  });
});
