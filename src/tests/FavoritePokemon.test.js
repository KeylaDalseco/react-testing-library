import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Testando o component FavoritePokemon.js', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);
    screen.getByText(/no favorite pokémon found/i);
  });
  test('Testando se apenas são exibidos os pokémons favoritados', async () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    await screen.findByRole('heading', { name: /pikachu details/i });
    await screen.findByText(/pokémon favoritado\?/i);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const favorite = await screen.findByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite).toBeInTheDocument();
    const linkFavorit = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorit);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    screen.getByText(/pikachu/i);
    screen.getByText(/electric/i);
    screen.getByText(/average weight: 6\.0 kg/i);
    await screen.findByRole('img', { name: /pikachu is marked as favorite/i });
  });
});
