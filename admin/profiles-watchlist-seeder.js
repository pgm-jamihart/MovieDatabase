import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  db.settings({ ignoreUndefinedProperties: true })
  
  // Get all Movies
  let moviesRef = db.collection('movies');
  const queryMovie = moviesRef.orderBy('createdAt', 'desc');
  const querySnapshotMovie = await queryMovie.get();
  const movies = querySnapshotMovie.docs.map((doc) => {
    return {
      uid: doc.id,
      title: doc._fieldsProto.title.stringValue, 
      image: doc._fieldsProto.thumbnailURL.stringValue,
    }
  });

  // Get all tvshows
  let tvRef = db.collection('tv');
  const queryTvshow = tvRef.orderBy('createdAt', 'desc');
  const querySnapshotTvshow = await queryTvshow.get();
  const tvshows = querySnapshotTvshow.docs.map((doc) => {
    return {
      uid: doc.id,
      title: doc._fieldsProto.title.stringValue, 
      image: doc._fieldsProto.thumbnailURL.stringValue,
    }
  });

  // Get all Profiles
  let profilesRef = db.collection('profiles');
  const query = profilesRef.orderBy('createdAt', 'desc');
  const querySnapshot = await query.get();
  const profiles = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  });

  profiles.forEach(profile => {
    let watchlistRef = db.collection('profiles').doc(profile.uid).collection('watchlist');
    // Make watchlist
    
    let movieStart = null, movieData = 0;
    let numWatchlists = generateValueBetweenMinAndMax(0, 100);
    for (let i = 0; i < numWatchlists;i++) {
      movieStart = generateValueBetweenMinAndMax(0, movies.length - 1);
      movieData = movies.slice(movieStart, movieStart + 1)[0];
      watchlistRef.doc(movieData.uid).set({
        watched: faker.datatype.boolean(),
        title: movieData.title,
        image: movieData.image,
        type: 'movie',
        ...generateTimestamps(),
      });
    }

    profilesRef.doc(profile.uid).update({
      modifiedAt: Date.now(),
    });  
  });

  profiles.forEach(profile => {
    let watchlistRef = db.collection('profiles').doc(profile.uid).collection('watchlist');
    // Make watchlist
    
    let tvshowStart = null, tvshowData = 0;
    let numWatchlists = generateValueBetweenMinAndMax(0, 100);
    for (let i = 0; i < numWatchlists;i++) {
      tvshowStart = generateValueBetweenMinAndMax(0, tvshows.length - 1);
      tvshowData = tvshows.slice(tvshowStart, tvshowStart + 1)[0];
      console.log(tvshowData)
      watchlistRef.doc(tvshowData.uid).set({
        watched: faker.datatype.boolean(),
        title: tvshowData.title,
        image: tvshowData.image,
        type: 'tv',
        ...generateTimestamps(),
      });
    }

    profilesRef.doc(profile.uid).update({
      modifiedAt: Date.now(),
    });  
  });

})();