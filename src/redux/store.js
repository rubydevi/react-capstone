import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemon/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});

export default store;
