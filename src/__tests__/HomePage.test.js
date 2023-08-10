import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomePage from '../components/HomePage';

const mockStore = configureStore([]);

test('HomePage component snapshot', () => {
  const initialState = {
    pokemons: {
      pokemons: [
        { id: 1, name: 'Pikachu', value: 25 },
        { id: 2, name: 'Charmander', value: 4 },
      ],
    },
  };
  const store = mockStore(initialState);

  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
