import React, { useContext } from 'react';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useFirebase } from './firebase.context';

const FirestoreContext = React.createContext(null);
const useFirestore = () => useContext(FirestoreContext);

const FirestoreProvider = ({children}) => {
  const { app } = useFirebase();
  const db = app.firestore();

  let lastVisibleProject = null;

  const getMovies = async () => {
    const query = db.collection('movies')
      .orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const movies = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return movies;
  };

  const getTvShows = async () => {
    const query = db.collection('tv')
      .orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const tvshows = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return tvshows;
  };

  const getPagedProjects = async (itemsPerPage = 10) => {
    let query = null;

    if (lastVisibleProject === null || lastVisibleProject === undefined) {
      query = db.collection('projects')
      .orderBy('createdAt', 'desc')      
      .limit(itemsPerPage);
    } else {
      query = db.collection('projects')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisibleProject)
      .limit(itemsPerPage);
    }
    
    const querySnapshot = await query.get();
    lastVisibleProject = querySnapshot.docs[querySnapshot.docs.length-1];
    const projects = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return {projects};
  };

  const getMovieById = async (movieId) => {
    const docRef = db.collection('movies').doc(movieId);
    const doc = await docRef.get();
    // if (!doc.exists) {
    //     throw new Error('Document does not exist!');
    // }

    return {
      uid: doc.id,
      ...doc.data()
    }
  };

  const getTvShowById = async (tvshowId) => {
    const docRef = db.collection('tv').doc(tvshowId);
    const doc = await docRef.get();
    // if (!doc.exists) {
    //     throw new Error('Document does not exist!');
    // }

    return {
      uid: doc.id,
      ...doc.data()
    }
  };

  const getMoviesReviews = async (movieId) => {
    const query = db.collection('movies').doc(movieId).collection('reviews').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const moviesReviews = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return moviesReviews;
  };

  const addReview = async (movieRef, review) => {
    let docRef = db.collection('movies').doc(movieRef.toString())
    let reviewRef = docRef.collection('reviews').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(docRef).then((res) => {
            if (!res.exists) {
              throw new Error('Document does not exist!');
            }

            // Compute new number of reviews
            var newNumReviews = res.data().numReviews + 1;

            // Compute new average rating
            var oldRatingTotal = res.data().avgRating * res.data().numReviews;
            var newAvgRating = (oldRatingTotal + parseInt(review.rating)) / newNumReviews;

            // Commit to Firestore
            transaction.update(docRef, {
                numReviews: newNumReviews,
                avgRating: newAvgRating
            });
            transaction.set(reviewRef, review);
        });
    });
  }

  const addReviewTvShow = async (tvshowRef, review) => {
    let docRef = db.collection('tv').doc(tvshowRef.toString())
    let reviewRef = docRef.collection('reviews').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(docRef).then((res) => {
            if (!res.exists) {
              throw new Error('Document does not exist!');
            }

            // Compute new number of reviews
            var newNumReviews = res.data().numReviews + 1;

            // Compute new average rating
            var oldRatingTotal = res.data().avgRating * res.data().numReviews;
            var newAvgRating = (oldRatingTotal + parseInt(review.rating)) / newNumReviews;

            // Commit to Firestore
            transaction.update(docRef, {
                numReviews: newNumReviews,
                avgRating: newAvgRating
            });
            transaction.set(reviewRef, review);
        });
    });
  }

  const addComment = async (movieRef, comment) => {
    let docRef = db.collection('movies').doc(movieRef.toString())
    let commentRef = docRef.collection('comments').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(docRef).then((res) => {
            if (!res.exists) {
              throw new Error('Document does not exist!');
            }

            // Compute new number of comments
            var newNumComments = res.data().numComments + 1;

            // Commit to Firestore
            transaction.update(docRef, {
                numComments: newNumComments,
            });
            transaction.set(commentRef, comment);
        });
    });
  }

  const addCommentTvShow = async (tvshowRef, comment) => {
    let docRef = db.collection('tv').doc(tvshowRef.toString())
    let commentRef = docRef.collection('comments').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(docRef).then((res) => {
            if (!res.exists) {
              throw new Error('Document does not exist!');
            }

            // Compute new number of comments
            var newNumComments = res.data().numComments + 1;

            // Commit to Firestore
            transaction.update(docRef, {
                numComments: newNumComments,
            });
            transaction.set(commentRef, comment);
        });
    });
  }

  const addToWatchlist = async (userRef, movieRef, movieData) => {
    let docRef = db.collection('profiles').doc(userRef.toString())
    let watchlistRef = docRef.collection('watchlist').doc(movieRef);

    return db.runTransaction((transaction) => {
        return transaction.get(docRef).then((res) => {
            if (!res.exists) {
              throw new Error('Document does not exist!');
            }

            // Commit to Firestore
            transaction.set(watchlistRef, movieData);
        });
    });
  }

  const getTvShowReviews = async (tvshowId) => {
    const query = db.collection('tv').doc(tvshowId).collection('reviews').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const tvReviews = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return tvReviews;
  };

  const getUserWatchlist = async (userId) => {
    const query = db.collection('profiles').doc(userId).collection('watchlist').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const userWatchlist = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return userWatchlist;
  };

  const getMoviesComments = async (movieId) => {
    const query = db.collection('movies').doc(movieId).collection('comments').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const moviesComments = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return moviesComments;
  };

  const getTvShowComments = async (tvshowId) => {
    const query = db.collection('tv').doc(tvshowId).collection('comments').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const tvComments = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return tvComments;
  };

  const getProfileById = async (profileId) => {
    const docRef = db.collection('profiles').doc(profileId);
    const doc = await docRef.get();
    if (!doc.exists) {
        return ''
    }

    return {
      uid: doc.id,
      ...doc.data()
    }
  };

  return (
    <FirestoreContext.Provider 
    value={{
      addReview, 
      getPagedProjects, 
      getMovieById, 
      getMovies, 
      getMoviesReviews, 
      getUserWatchlist, 
      getMoviesComments, 
      getProfileById, 
      getTvShows, 
      getTvShowReviews, 
      getTvShowComments,
      addReviewTvShow,
      getTvShowById,
      addComment,
      addCommentTvShow,
      addToWatchlist
    }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export {
  FirestoreContext,
  FirestoreProvider,
  useFirestore,
};