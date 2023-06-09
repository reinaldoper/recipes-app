const DrinkIngredientsApi = async (token) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${token}`;
  const request = await fetch(url);
  const response = await request.json();
  const NUMBER_MAGIC = 11;
  const currencyDrinks = response.drinks.filter((_d, i) => i <= NUMBER_MAGIC);
  return currencyDrinks;
};

export default DrinkIngredientsApi;
