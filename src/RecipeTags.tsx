import React from 'react';

const RecipeTags = ({ tags, onSelectTag }) => {
  return (
    <div>
      <h2>Select a Recipe Tag</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <button onClick={() => onSelectTag(tag)}>{tag}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeTags;
