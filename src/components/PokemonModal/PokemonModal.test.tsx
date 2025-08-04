
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDetailsModal } from '../PokemonModal';
import * as hookModule from 'src/hooks/useGetPokemonDetails';

// Helper mock for consistent Pokémon data
const basePokemonData = {
  name: 'pikachu',
  id: 25,
  height: 4,
  weight: 60,
  base_experience: 112,
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { id: 13, name: 'electric' } }],
  abilities: [
    { ability: { id: 1, name: 'static' }, is_hidden: false },
    { ability: { id: 2, name: 'lightning-rod' }, is_hidden: true },
  ],
  stats: [
    { base_stat: 35, effort: 0, stat: { name: 'hp' } },
    { base_stat: 55, effort: 0, stat: { name: 'attack' } },
  ],
};

const mockUseGetPokemonDetails = (custom: Partial<ReturnType<typeof hookModule.useGetPokemonDetails>> = {}) => {
  vi.spyOn(hookModule, 'useGetPokemonDetails').mockReturnValue({
    pokemonDetails: basePokemonData,
    loading: false,
    error: undefined,
  } as any); 
};

describe('PokemonDetailsModal', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('displays Pokémon data correctly', () => {
    mockUseGetPokemonDetails();

    render(<PokemonDetailsModal name="pikachu" onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute('src', 'pikachu.png');
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
    expect(screen.getByText(/\(Hidden\)/i)).toBeInTheDocument();
    expect(screen.getByText(/hp:/i)).toHaveTextContent('hp: 35');
    expect(screen.getByText(/attack:/i)).toHaveTextContent('attack: 55');
  });

  it('calls onClose when clicking outside the modal', () => {
    mockUseGetPokemonDetails();
    const onClose = vi.fn();

    render(<PokemonDetailsModal name="pikachu" onClose={onClose} />);

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside the modal', () => {
    mockUseGetPokemonDetails();
    const onClose = vi.fn();

    render(<PokemonDetailsModal name="pikachu" onClose={onClose} />);
    const modal = screen.getByRole('dialog').querySelector('[aria-describedby="modal-description"]');
    fireEvent.click(modal!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when Escape key is pressed', () => {
    mockUseGetPokemonDetails();
    const onClose = vi.fn();

    render(<PokemonDetailsModal name="pikachu" onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });


});

