import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando o component NotFound.js', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    const img = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toHaveAttribute('src', src);
  });
});
