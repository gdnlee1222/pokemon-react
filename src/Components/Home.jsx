// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go"; // Importing search icon from react-icons
import './Home.css';

const Home = () => {
  // State hook to store list of Pokémon fetched from API
  const [pokemon, setPokemon] = useState([]);
  // State hook to store user input for search query
  const [search, setSearch] = useState('');
  // State hook to store filtered Pokémon based on search query
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Effect hook to fetch Pokémon data from PokeAPI on component mount
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        // Map through each Pokémon URL and fetch detailed data
        const fetches = data.results.map(p => fetch(p.url).then(res => res.json()));
        // Resolve all promises and update 'pokemon' state with fetched details
        Promise.all(fetches).then(details => {
          setPokemon(details);
        });
      });
  }, []); // Dependency array ensures fetch occurs once on component mount

  // Effect hook to filter Pokémon based on search input
  useEffect(() => {
    // Filter 'pokemon' array based on 'search' input (case insensitive)
    setFilteredPokemon(
      pokemon.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemon]); // Dependencies: 'search' input and 'pokemon' data

  return (
    <div className="home">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update 'search' state on input change
        />
        <GoSearch className="search-icon" /> {/* Search icon from react-icons */}
      </div>
      <div className="pokemon-list">
        {filteredPokemon.length > 0 ? ( // Check if there are filtered Pokémon to display
          filteredPokemon.map((p, index) => (
            // Link to individual Pokémon detail page with 'p.name' as URL parameter
            <Link key={index} to={`/pokemon/${p.name}`} className="pokemon-card">
              <img src={p.sprites.front_default} alt={p.name} /> {/* Pokémon sprite */}
              <span>{p.name}</span> {/* Pokémon name */}
            </Link>
          ))
        ) : (
          <p>Results not found</p> // Display message if no Pokémon match search criteria
        )}
      </div>
    </div>
  );
};

export default Home;
