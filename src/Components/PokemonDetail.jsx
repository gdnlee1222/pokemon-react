// src/components/PokemonDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  // Fetching parameters from the URL
  const { name } = useParams();
  // Navigation hook for programmatically navigating between routes
  const navigate = useNavigate();
  // State hook to manage the Pokemon data fetched from API
  const [pokemon, setPokemon] = useState(null);

  // Effect hook to fetch Pokemon data when 'name' parameter changes
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, [name]); // Dependency array ensures fetch occurs when 'name' changes

  // Function to calculate the width of the stat bar based on base_stat
  const calculateBarWidth = (baseStat) => {
    const maxWidth = 200; // Maximum base_stat assumed (adjust as needed)
    return `${(baseStat / maxWidth) * 100}%`; // Calculate percentage width
  };

  return (
    <div className="pokemon-detail">
      {pokemon ? ( // Conditionally render when Pokemon data is loaded
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
          <h2>Type</h2>
          <ul>
            {pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <h2>Stats</h2>
          <ul className="stats-list">
            {pokemon.stats.map((stat, index) => (
              <li key={index}>
                <span className="stat-name">{stat.stat.name}</span>
                <div className="stat-bar">
                  <div
                    className="stat-bar-inner"
                    style={{ width: calculateBarWidth(stat.base_stat) }}
                  ></div>
                </div>
                <span className="stat-value">{stat.base_stat}</span>
              </li>
            ))}
          </ul>
          <button className="back-button" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </>
      ) : (
        <p>Loading...</p> // Display while Pokemon data is being fetched
      )}
    </div>
  );
};

export default PokemonDetail;
