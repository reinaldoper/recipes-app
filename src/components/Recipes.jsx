import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardRecipes from './CardRecipe';

function Recipes({ recipesDrinks, recipesMeals, buttonClick, categorySelected }) {
  const history = useHistory();

  const redirectDrinks = () => {
    const { idDrink } = recipesDrinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  const redirectMeals = () => {
    const { idMeal } = recipesMeals[0];
    history.push(`/meals/${idMeal}`);
  };

  const listDrinks = () => {
    console.log('categoris', categorySelected);
    if (recipesDrinks.length === 0 && buttonClick === 'drinks') {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipesDrinks && recipesDrinks.length === 1 && !categorySelected) {
      redirectDrinks();
    } else {
      const list = recipesDrinks.map((drink, i) => {
        const { idDrink: id, strDrinkThumb, strDrink } = drink;
        return (
          <CardRecipes
            key={ i }
            id={ id }
            indice={ i }
            image={ strDrinkThumb }
            name={ strDrink }
          />
        );
      });
      return list;
    }
  };

  const listMeals = () => {
    console.log('categoris, meals', categorySelected);
    console.log('recipe', recipesMeals.length);
    if (recipesMeals.length === 0 && buttonClick === 'meals') {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipesMeals && recipesMeals.length === 1 && !categorySelected) {
      redirectMeals();
    } else {
      const list = recipesMeals.map((meals, i) => {
        const { idMeal: id, strMealThumb, strMeal } = meals;
        return (
          <CardRecipes
            key={ i }
            id={ id }
            indice={ i }
            image={ strMealThumb }
            name={ strMeal }
          />
        );
      });
      return list;
    }
  };

  return (
    <ol className="cards" data-testid="cards">
      { listDrinks() }
      { listMeals() }
    </ol>
  );
}

const mapStateToProps = (state) => ({
  recipesDrinks: state.reducerFetch.recipesDrinks,
  recipesMeals: state.reducerFetch.recipesMeals,
  buttonClick: state.reducerFetch.buttonClick,
  categorySelected: state.reducerFetch.categorySelected,
});

Recipes.propTypes = {
  allRecipes: array,
}.isrequered;

export default connect(mapStateToProps, null)(Recipes);
