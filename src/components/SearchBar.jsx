import React from "react";

export default function SearchBar({ query, setQuery, searchType, setSearchType, onSearch }) {
  return (
    <form onSubmit={onSearch} className="search-bar">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search by ${searchType}...`}
        aria-label="search"
      />
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="ingredient">Ingredient</option>
        <option value="name">Recipe name</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
