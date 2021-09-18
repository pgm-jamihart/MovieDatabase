import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  // Get all users
  let users = await auth.listUsers(1000, undefined);

  // Get all Movies
  let moviesRef = db.collection('movies');
  const query = moviesRef.orderBy('createdAt', 'desc');
  const querySnapshot = await query.get();
  const movies = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  });

  movies.forEach(movie => {
    let commentsRef = db.collection('movies').doc(movie.uid).collection('comments');
    // Make commetns
    let numComments = generateValueBetweenMinAndMax(0, 100), usersCopy = JSON.parse(JSON.stringify(users.users)), userStart = null, userId = 0;
    for (let i = 0; i < numComments;i++) {
      userStart = generateValueBetweenMinAndMax(0, usersCopy.length - 1);
      userId = usersCopy.slice(userStart, userStart + 1)[0].uid;
      commentsRef.doc(userId).set({
        title: faker.lorem.sentence(),
        comment: faker.lorem.paragraphs(generateValueBetweenMinAndMax(1, 7)),
        ...generateTimestamps()
      });
    }

    moviesRef.doc(movie.uid).update({
      numComments: numComments,
      modifiedAt: Date.now(),
    });  
  });

})();