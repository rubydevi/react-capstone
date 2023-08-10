import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

// Async thunk for fetching pokemons from the API
export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}?limit=151`);
      const data = await response.json();
      return data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        value: index + 1, // You can customize this value as needed
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Async thunk for fetching pokemon details
export const fetchPokemonDetails = createAsyncThunk(
  'pokemons/fetchPokemonDetails',
  async (pokemonName, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/${pokemonName}`);
      const data = await response.json();
      return { name: pokemonName, details: data, image: data.sprites.front_default };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [],
    selectedPokemon: null,
  },
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    selectPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    updatePokemonDetails: (state, action) => {
      const { name, details } = action.payload;
      const pokemonToUpdate = state.pokemons.find((pokemon) => pokemon.name === name);
      if (pokemonToUpdate) {
        pokemonToUpdate.details = details;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload;
    });
    builder.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
      const { name, details } = action.payload;
      const pokemonToUpdate = state.pokemons.find((pokemon) => pokemon.name === name);
      if (pokemonToUpdate) {
        pokemonToUpdate.details = details;
      }
    });
  },
});

export const { setPokemons, selectPokemon, updatePokemonDetails } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
