import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  // Get all users
  let users = await auth.listUsers(1000, undefined);

  // Get all tvshows
  let tvRef = db.collection('tv');
  const query = tvRef.orderBy('createdAt', 'desc');
  const querySnapshot = await query.get();
  const tv = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  });

  tv.forEach(tvshow => {
    let commentsRef = db.collection('tv').doc(tvshow.uid).collection('comments');
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

    tvRef.doc(tvshow.uid).update({
      numComments: numComments,
      modifiedAt: Date.now(),
    });  
  });

})();