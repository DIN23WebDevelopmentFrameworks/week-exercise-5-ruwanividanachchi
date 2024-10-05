import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h3>{recipe.name}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {recipe.instructions.join(' ')}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
            <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
            <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
            <img src={recipe.image} alt={recipe.name} width="200" />
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
