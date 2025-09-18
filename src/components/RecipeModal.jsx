import React from "react";

function parseIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${measure ? measure : ""} ${ing}`.trim());
  }
  return list;
}

export default function RecipeModal({ data, onClose, onToggleFav, favorites = [] }) {
  if (!data) return null;
  const ingredients = parseIngredients(data);
  const isFav = favorites.some((f) => f.idMeal === data.idMeal);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h2>{data.strMeal}</h2>
        <img src={data.strMealThumb} alt={data.strMeal} />
        <p>
          <strong>Category:</strong> {data.strCategory}
        </p>
        <p>
          <strong>Area:</strong> {data.strArea}
        </p>

        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p style={{ whiteSpace: "pre-line" }}>{data.strInstructions}</p>

        <div className="modal-actions">
          <button onClick={() => onToggleFav(data)}>{isFav ? "Remove Favorite" : "Save to Favorites"}</button>
          {(data.strSource || data.strYoutube) && (
            <a href={data.strSource || data.strYoutube} target="_blank" rel="noreferrer">
              Open Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
