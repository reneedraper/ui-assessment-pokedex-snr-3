import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from '.';

describe('LoadingIndicator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the loading text and image', () => {
    render(<LoadingIndicator />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByAltText(/dancing pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

});
