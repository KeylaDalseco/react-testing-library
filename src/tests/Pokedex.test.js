import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando o component About.js', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<App />);
    const botão = screen.getByText(/Próximo Pokémon/i);
    pokemonList.forEach(async (pokemon) => {
      userEvent.click(botão);
      await screen.findByText(`${pokemon.name}`);
      await screen.findByText(`${pokemon.type}`);
      userEvent.click(botão);
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);
    const name = screen.getAllByText('Pikachu');
    expect(name).toHaveLength(1);
  });
  test('Teste se é mostrado apenas um botão de filtragem para cada tipo de Pokémon;', () => {
    renderWithRouter(<App />);
    const btns = screen.getAllByTestId('pokemon-type-button'); // crio um array usando o getall com todos ids
    // console.log(btn[1]);
    // expect(btns[0].textContent).toBe('Electric');
    // expect(btns[1].textContent).toBe('Fire');
    btns.forEach((btn) => {
      screen.getAllByRole('button', { name: btn.textContext }); // pego pelo texto do elemento
    });
  });
  test('Teste se a partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    renderWithRouter(<App />);
    screen.getByText(/pikachu/i);
    const btnPsy = await screen.findByRole('button', { name: /psychic/i });
    userEvent.click(btnPsy);
    screen.getByText(/alakazam/i);
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    screen.getByText(/mew/i);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);
    screen.getByText(/pikachu/i);
    userEvent.click(await screen.findByRole('button', { name: /dragon/i }));
    screen.getByText(/dragonair/i);
    userEvent.click(await screen.findByRole('button', { name: /all/i }));
    screen.getByText(/pikachu/i);
  });
});
