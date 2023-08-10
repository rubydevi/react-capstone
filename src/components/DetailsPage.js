import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../redux/pokemon/pokemonSlice';
import '../assets/styles/DetailsPage.css';

const DetailsPage = () => {
  const { pokemonName } = useParams();
  const selectedPokemon = useSelector((state) => state.pokemons.selectedPokemon);
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPokemon && selectedPokemon.name && selectedPokemon.value) {
      dispatch(fetchPokemonDetails(selectedPokemon.name));
    }
  }, [dispatch, pokemonName, selectedPokemon]);

  if (!selectedPokemon) {
    return (
      <div className="pokemon-details load">
        <div className="loader" />
      </div>
    );
  }

  // Find the selected Pokemon's details from the pokemons array
  const selectedPokemonObject = pokemons.find((pokemon) => pokemon.name === selectedPokemon.name);

  // Access the details from the selected Pokemon's object
  const selectedPokemonDetails = selectedPokemonObject ? selectedPokemonObject.details : null;

  if (!selectedPokemonDetails) {
    return (
      <div className="pokemon-details load">
        <div className="loader" />
      </div>
    );
  }

  const { name, value } = selectedPokemon;
  const defaultImage = selectedPokemonDetails.sprites.other.dream_world.front_default;

  return (
    <div className="pokemon-details">
      <div className="pokemon-header">
        <img className="pokemon-image" src={defaultImage} alt={name} />
        <h1 className="pokemon-name">{name.toUpperCase()}</h1>
      </div>
      <h2>
        {name}
        &apos;s Details
      </h2>
      <ul className="pokemon-profile">
        <li>
          <span>Pokemon Number</span>
          <span>{value}</span>
        </li>
        <li>
          <span>Base Experience</span>
          <span>{selectedPokemonDetails.base_experience}</span>
        </li>
        <li>
          <span>Weight</span>
          <span>{selectedPokemonDetails.weight}</span>
        </li>
        <li>
          <span>Height</span>
          <span>{selectedPokemonDetails.height}</span>
        </li>
      </ul>
    </div>
  );
};

export default DetailsPage;
