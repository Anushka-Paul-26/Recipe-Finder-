import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";

function App() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("ingredient"); 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null); 
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  async function handleSearch(e) {
    e?.preventDefault?.();
    if (!query.trim()) {
      setRecipes([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url =
        searchType === "ingredient"
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`
          : `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch  {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function openDetails(id) {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setSelected(data.meals?.[0] || null);
    } catch {
      setError("Failed to load details.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(meal) {
    const exists = favorites.find((f) => f.idMeal === meal.idMeal);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      
      updated = [meal, ...favorites];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return (
    <div className="container">
      <h1>Recipe Finder 🍳</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        onSearch={handleSearch}
      />

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !recipes?.length && <p className="hint">Try searching “chicken”, “pasta”, or an ingredient like “onion”.</p>}

      <RecipeList
        recipes={recipes}
        onView={openDetails}
        onToggleFav={toggleFavorite}
        favorites={favorites}
      />

      {favorites.length > 0 && (
        <>
          <h2>Favorites</h2>
          <RecipeList recipes={favorites} onView={openDetails} onToggleFav={toggleFavorite} favorites={favorites} />
        </>
      )}

      {selected && (
        <RecipeModal data={selected} onClose={() => setSelected(null)} onToggleFav={toggleFavorite} favorites={favorites} />
      )}
    </div>
  );
}

export default App;
