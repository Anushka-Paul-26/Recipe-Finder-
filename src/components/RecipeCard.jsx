import React from "react";

export default function RecipeCard({ meal, onView, onToggleFav, isFav }) {
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <div className="card-actions">
        <button onClick={onView}>View</button>
        <button onClick={onToggleFav}>{isFav ? "Remove" : "Save"}</button>
      </div>
    </div>
  );
}
