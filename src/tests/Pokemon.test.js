import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o component App.js', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    screen.getByText(/pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    const peso = screen.getByText(/average weight: 6\.0 kg/i);
    expect(peso).toHaveTextContent('Average weight: 6.0 kg');
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    const src = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', async () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = await screen.findAllByRole('link', { name: /more details/i });
    userEvent.click(linkDetails[0]);
    act(() => { history.push('/pokemon/25'); });
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    await screen.findByRole('heading', { name: /pikachu details/i });
    await screen.findByText(/pokémon favoritado\?/i);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const favoriteImg = await screen.findByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
