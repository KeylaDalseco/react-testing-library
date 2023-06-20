import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import pokemonList from '../data';

const path = '/pokemon/25';
describe('Testando o component App.js', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', async () => {
    const { history } = renderWithRouter(<App />);
    screen.getByRole('heading', { name: /encountered pokémon/i });
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    act(() => { history.push(path); });
    const { pathname } = history.location;
    expect(pathname).toBe(path);
    await screen.findByRole('heading', { name: /pikachu details/i });
    expect(linkDetails).not.toBeInTheDocument();
    screen.getByRole('heading', { name: /summary/i });
    screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    act(() => { history.push(path); });
    const { pathname } = history.location;
    expect(pathname).toBe(path);
    await screen.findByRole('heading', { name: /game locations of pikachu/i });
    screen.getByText(/kanto viridian forest/i);
    const img = screen.getAllByRole('img', { name: /pikachu location/i });
    const map1 = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
    expect(img[0]).toHaveAttribute('src', map1);
    expect(img[0]).toHaveAttribute('alt', 'Pikachu location');
    screen.getByText(/kanto power plant/i);
    const map2 = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(img[1]).toHaveAttribute('src', map2);
    expect(img[1]).toHaveAttribute('alt', 'Pikachu location');
    // pokemonList.forEach((maps) => {
    //   maps.foundAt
    //     .filter((map) => (map.location === screen.getByText(/kanto viridian forest/i) ? map.map : map.location));
    // });
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    act(() => { history.push(path); });
    const { pathname } = history.location;
    expect(pathname).toBe(path);
    await screen.findByRole('heading', { name: /game locations of pikachu/i });
    const checkbox = await screen.findByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    screen.getByText(/pokémon favoritado\?/i);
  });
});
