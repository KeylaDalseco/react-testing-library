import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o component App.js', () => {
  test('Testando os links de navegação da tela inicial no topo da aplicação', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', { name: /home/i });
    screen.getByRole('link', { name: /about/i });
    screen.getByRole('link', { name: /favorite pokémon/i });
  });
  test('Testando se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home', async () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    await screen.findByRole('heading', { name: /encountered pokémon/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Testando se a aplicação é redirecionada para About, na URL /about ao clicar no link About', async () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    await screen.findByRole('heading', { name: /about pokédex/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Testando se a aplicação é redirecionada para Pokémon Favoritados, na URL /favorites ao clicar no Favorite Pokémon', async () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(linkFavorite);
    await screen.findByRole('link', { name: /favorite pokémon/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Testando se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina/que-nao-existe/'); // deve ser importado da biblioteca react
    });
    screen.getByRole('heading', { name: /page requested not found/i });
  });
});
