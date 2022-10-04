import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

/* const flushPromises = () => new Promise((r) => { setTimeout(r); }); */
const startRecipeBtnId = '0-horizontal-favorite-btn';

describe('Testand Favorite Meals', () => {
  const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    alcoholicOrNot: '',
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  /* {
    alcoholicOrNot: '',
    category: 'Pasta',
    id: '52844',
    image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    name: 'Lasagne',
    nationality: 'Italian',
    type: 'meal',
  } */];
  test('Favorite recipe Meals', async () => {
    /* jest.spyOn(global.localStorage, 'getItem'); */
    localStorage.removeItem(mockFavorites);
    localStorage.setItem(mockFavorites, JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');
    /* expect(getItem).toHaveBeenCalled(); */
    await waitFor(() => {
      const share = screen.getByTestId('0-horizontal-share-btn');
      expect(share).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();

      window.document.execCommand = jest.fn().mockImplementation(() => ' ');
      userEvent.click(share);
      const linkCopied = screen.getByText('Link copied!');
      expect(linkCopied).toBeInTheDocument();
      const startRecipeBtn = screen.getByTestId(startRecipeBtnId);
      userEvent.click(startRecipeBtn);
      localStorage.removeItem(mockFavorites);
    });
    /* const share = screen.getByTestId('0-horizontal-share-btn'); */
    /* global.fetch.mockClear(); */
  });
});
