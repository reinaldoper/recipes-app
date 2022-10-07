import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
/* import App from '../App'; */
/* import DrinksPage from '../pages/DrinksPage'; */
/* import DrinksPage from '../pages/DrinksPage'; */
/* import MealsPage from '../pages/MealRecipe'; */
import Corba from './helpers/Corba';
/* import drinks from './helpers/drinks'; */
/* import drinks from './helpers/drinks'; */
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testand details Drinks', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(Corba));
      /* .mockReturnValueOnce(mockFetch(drinks)); */
    global.fetch = mockMultFetch;
  });
  /* const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    alcoholicOrNot: 'Alcoholic',
    id: '14610',
    type: 'drink',
    name: 'ACID',
    category: 'Shot',
    nationality: '',
    image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
  }]; */
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  const mockFavorites = 'favoriteRecipes';
  const listFavorites1 = [{
    alcoholicOrNot: 'Alcoholic',
    id: '14610',
    type: 'drink',
    name: 'ACID',
    category: 'Shot',
    nationality: '',
    image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
  },
  {
    alcoholicOrNot: '',
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }];
  const listFavorites = [{
    alcoholicOrNot: 'Alcoholic',
    id: '14610',
    type: 'drink',
    name: 'ACID',
    category: 'Shot',
    nationality: '',
    image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
  }];
  setLocalStorage(mockFavorites, listFavorites);
  test('Drinks details', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals/52977/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('Corba')).toBeInTheDocument();

    /* const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    const recomendation = screen.getByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument(); */
    /* localStorage.removeItem(mockFavorites);
    setLocalStorage(newmockFavorites, newlistFavorites); */
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(share);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
    userEvent.click(btnFavorite);
    localStorage.removeItem(mockFavorites);
    setLocalStorage(mockFavorites, listFavorites1);
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites1));

    global.fetch.mockClear();
  });
});
