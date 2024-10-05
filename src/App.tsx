
import React, { useState, useEffect } from 'react';

// The main App component
const App = () => {
  const [tags, setTags] = useState([]); // Store the list of tags
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // Store the selected tag
  const [recipes, setRecipes] = useState([]); // Store the list of recipes
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the recipe tags when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/recipes/tags')
      .then((response) => response.json())
      .then((data) => {
        setTags(data); // Set the tags
        setLoading(false); // Stop loading once the tags are fetched
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  // Fetch recipes when a tag is selected
  const fetchRecipes = (tag: string) => {
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/tag/${tag}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes); // Set the recipes
        setLoading(false); // Stop loading once the recipes are fetched
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false); // Stop loading if there's an error
      });
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>

      {/* If no tag is selected, show the tag list */}
      {selectedTag === null ? (
        loading ? (
          <p>Loading tags...</p>
        ) : (
          <div>
            <h2>Select a Recipe Tag</h2>
            <ul>
              {tags.map((tag) => (
                <li key={tag}>
                  <button onClick={() => {
                    setSelectedTag(tag); // Set the selected tag
                    fetchRecipes(tag); // Fetch recipes for the selected tag
                  }}>
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        // If a tag is selected, show the list of recipes
        <div>
          <button onClick={() => setSelectedTag(null)}>Back to Tag List</button>
          <h2>Recipes for {selectedTag}</h2>
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            <div>
              {recipes.length === 0 ? (
                <p>No recipes found for {selectedTag}.</p>
              ) : (
                recipes.map((recipe) => (
                  <div key={recipe.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                    <h3>{recipe.name}</h3>
                    <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions.join(' ')}</p>
                    <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
                    <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
                    <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
