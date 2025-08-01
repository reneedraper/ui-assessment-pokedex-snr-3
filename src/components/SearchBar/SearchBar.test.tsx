import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders input with label', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/search pokémon by name/i)).toBeInTheDocument();
  });

  it('calls onChange with new value', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/pikachu/i);
    fireEvent.change(input, { target: { value: 'char' } });
    expect(handleChange).toHaveBeenCalledWith('char');
  });
});
