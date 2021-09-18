import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import MovieListItem from './MovieListItem';

const mockMovieListItemData = {
  "poster_path": "/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg",
  "title": "The Conjuring: The Devil Made Me Do It",
  "vote_average": 8.3,
};
  
test('Renders movielist item correctly', async () => {
  const { getByTestId } = render(
    <Router>
      <MovieListItem key={mockMovieListItemData.id} {...mockMovieListItemData} />
    </Router>
  );

  await waitFor(() => {
  getByTestId 
  });

  expect(getByTestId('MovieListItem')).toHaveTextContent('The Conjuring: The Devil Made Me Do It');
  expect(getByTestId('MovieListItem')).toHaveTextContent('8.3');
  expect(getByTestId('MovieListItemImage')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w1280/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg');
  expect(getByTestId('MovieListItemImage')).toHaveAttribute('alt', 'The Conjuring: The Devil Made Me Do It');
});
