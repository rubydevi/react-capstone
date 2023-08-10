import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DetailsPage from '../components/DetailsPage';

const mockStore = configureStore([]);

test('DetailsPage component snapshot', () => {
  const initialState = {
    pokemons: {
      selectedPokemon: {
        name: 'Pikachu',
        value: 25,
      },
      pokemons: [
        {
          name: 'Pikachu',
          details: {
            sprites: {
              other: {
                dream_world: {
                  front_default: 'path/to/pikachu-image.png',
                },
              },
            },
            base_experience: 112,
            weight: 60,
            height: 4,
          },
        },
      ],
    },
  };
  const store = mockStore(initialState);

  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <DetailsPage />
        </Router>
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
