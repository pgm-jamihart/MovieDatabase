import React from 'react';
import MovieListItem from './MovieListItem';
import { BrowserRouter as Router } from 'react-router-dom';

const mockMovieListItemData = {
  "poster_path": "/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg",
  "title": "The Conjuring: The Devil Made Me Do It",
  "vote_average": 8.3,
};

export default {
  title: 'MovieListItem',
  component : MovieListItem
}

export const Primary = () => {
  return (
    <Router>
      <MovieListItem key={mockMovieListItemData.id} {...mockMovieListItemData} />
    </Router>
  )
}  
