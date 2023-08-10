import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowCircleRight } from 'react-icons/fa';
import { fetchPokemons, selectPokemon } from '../redux/pokemon/pokemonSlice';
import '../assets/styles/HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemons());
    }
  }, [dispatch, pokemons]);

  const handlePokemonClick = (pokemon) => {
    dispatch(selectPokemon(pokemon));
  };

  const filterPokemons = (pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredPokemons = pokemons.filter(filterPokemons);

  return (
    <div>
      <div className="input-container">
        <span className="search-icon">
          <FaSearch className="search" />
        </span>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.id} className="pokemon-grid-item">
            <FaArrowCircleRight />
            <Link to={`/details/${pokemon.name}`} onClick={() => handlePokemonClick(pokemon)}>
              <p>
                {(pokemon.name).toUpperCase()}
              </p>
              <p>
                Number:
                {pokemon.value}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
