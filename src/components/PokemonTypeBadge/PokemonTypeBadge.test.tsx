import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokemonTypeBadge } from './PokemonTypeBadge';

describe('PokemonTypeBadge', () => {
  it('renders a single badge when given typeName', () => {
    render(<PokemonTypeBadge typeName="electric" />);
    const badge = screen.getByText(/electric/i);

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: '#F7D02C' });
  });

  it('renders a skeleton when no typeName or types are provided', () => {
    render(<PokemonTypeBadge />);
    const skeleton = screen.getByLabelText(/loading type/i);

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
  });

  it('renders multiple badges when given types array', () => {
    const types = [
      { type: { id: 1, name: 'grass' } },
      { type: { id: 2, name: 'poison' } },
    ];

    render(<PokemonTypeBadge types={types} />);
    
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
  });
});
