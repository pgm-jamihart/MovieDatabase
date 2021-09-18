import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';

const TMDB_API_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=6893ced44ce853b0c8ad7483f6d9a541`;

(async () => {
  // Get movies collection
  let collectionRef = db.collection('movies');

  // Create a Movie
  const createMovie = (movie) => {
    // Add a document via movie object
    const data = {
      title: movie.title,
      description: movie.overview,
      thumbnailURL: 'https://image.tmdb.org/t/p/w1280' + movie.poster_path,
      ...generateTimestamps()
    };

    collectionRef.doc(movie.id.toString()).set(data).then(documentReference => {
      console.log(`Added movie.`);
    });
  };

  const createMovies = async (pageNumber) => {
    const response = await fetch(`${TMDB_API_MOVIES}&page=${pageNumber}`);
    
    const jsonData = await response.json();
    const moviesData = jsonData.results;

    const promises = [];
    moviesData.forEach(movie => {
      promises.push(createMovie(movie));
    });
    return await Promise.all(promises);
  };

  const createManyMovies = async () => {
    for (let i = 1; i < 5; i++) {
      await createMovies(i); 
    }

    const nMovies = (await db.collection('movies').get()).size;
    db.collection('counters').doc('movies').set({numAmount: nMovies}, {merge: true});
  }

  await createManyMovies(); 
})();