import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';

const TMDB_API_TV = `https://api.themoviedb.org/3/discover/tv?api_key=6893ced44ce853b0c8ad7483f6d9a541`;

(async () => {
  db.settings({ ignoreUndefinedProperties: true })
  // Get tv collection
  let collectionRef = db.collection('tv');

  // Create a tvshow
  const createTvshow = (tvshow) => {
    // Add a document via tvshow object
    const data = {
      title: tvshow.name,
      description: tvshow.overview,
      thumbnailURL: 'https://image.tmdb.org/t/p/w1280' + tvshow.poster_path,
      ...generateTimestamps()
    };

    collectionRef.doc(tvshow.id.toString()).set(data).then(documentReference => {
      console.log(`Added tvshow.`);
    });
  };

  const createTvshows = async (pageNumber) => {
    const response = await fetch(`${TMDB_API_TV}&page=${pageNumber}`);
    
    const jsonData = await response.json();
    const tvshowsData = jsonData.results;

    const promises = [];
    tvshowsData.forEach(tvshow => {
      promises.push(createTvshow(tvshow));
    });
    return await Promise.all(promises);
  };

  const createManyTvshows = async () => {
    for (let i = 1; i < 5; i++) {
      await createTvshows(i); 
    }

    const nTvshows = (await db.collection('tv').get()).size;
    db.collection('counters').doc('tv').set({numAmount: nTvshows}, {merge: true});
  }

  await createManyTvshows(); 
})();