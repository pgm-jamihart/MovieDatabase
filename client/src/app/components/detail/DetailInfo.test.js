import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import DetailInfo from './DetailInfo';

const mockDetailMovieData = {
  "overview": "Overview Description",
  "poster_path": "/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg",
  "title": "The Conjuring: The Devil Made Me Do It",
  "vote_average": 8.2,
  "genres": [
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 53,
      "name": "Thriller"
    }
  ]
};
  
test('Renders movielist item correctly', async () => {
  const { getByTestId } = render(
  <Router>
    <DetailInfo {...mockDetailMovieData} mediaType="movie" />
  </Router>
  );

  await waitFor(() => {
  getByTestId 
  });

  expect(getByTestId('DetailInfo')).toHaveTextContent('The Conjuring: The Devil Made Me Do It');
  expect(getByTestId('DetailInfo')).toHaveTextContent('8.2');
  expect(getByTestId('DetailInfo')).toHaveTextContent('Overview Description');
  expect(getByTestId('DetailInfoImage')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w1280/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg');
  expect(getByTestId('DetailInfoImage')).toHaveAttribute('alt', 'The Conjuring: The Devil Made Me Do It');
});
