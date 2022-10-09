import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
/* import App from '../App'; */
import DrinksPage from '../pages/DrinksPage';
/* import DrinksPage from '../pages/DrinksPage'; */
/* import MealsPage from '../pages/MealRecipe'; */
/* import meals from './helpers/meals'; */
import oneDrink from './helpers/oneDrink';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(oneDrink),
});

/* const flushPromises = () => new Promise((r) => { setTimeout(r); }); */

describe('Testand details Drinks', () => {
  const mockFavorites = 'inProgressRecipes';
  const listFavorites = [{ id: '178319', recipesFinish: [] }];
  /* const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    id: '15997',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  }];
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage(mockFavorites, listFavorites); */
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  const serch = 'search-input';
  const exet = 'exec-search-btn';
  setLocalStorage(mockFavorites, listFavorites);
  test('Drinks details', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<DrinksPage />);
    history.push('/drinks');
    expect(history.location.pathname).toEqual('/drinks');
    const butoSet = screen.getByTestId('set-search');
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    expect(butoSet).toBeInTheDocument();
    userEvent.click(butoSet);
    const input = screen.getByTestId(serch);
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'Aquamarine');

    userEvent.click(nameRadio);

    const exet2 = screen.getByTestId(exet);
    userEvent.click(exet2);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/drinks/178319');
    global.fetch.mockClear();
  });
});
