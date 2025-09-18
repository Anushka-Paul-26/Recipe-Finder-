import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes = [], onView, onToggleFav, favorites = [] }) {
  if (!recipes || recipes.length === 0) return null;
  return (
    <div className="grid">
      {recipes.map((r) => (
        <RecipeCard
          key={r.idMeal}
          meal={r}
          onView={() => onView(r.idMeal)}
          onToggleFav={() => onToggleFav(r)}
          isFav={favorites.some((f) => f.idMeal === r.idMeal)}
        />
      ))}
    </div>
  );
}
