import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from '../components/Nav';

test('Nav component snapshot', () => {
  const tree = renderer
    .create(
      <Router>
        <Nav />
      </Router>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
