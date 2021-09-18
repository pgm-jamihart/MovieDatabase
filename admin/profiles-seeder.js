import { admin, app, db, generateTimestamps, auth, generateValueBetweenMinAndMax } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import faker from 'faker';

(async () => {
  // Get profiles collection
  let collectionRef = db.collection('profiles');

  let users = await auth.listUsers(1000, undefined);

   // Create a Profile
  const createProfile = (uid, firstName, lastName, age, city, country, tel, photoURL) => {
    const data = {
      firstName,
      lastName,
      age,
      city,
      country,
      tel,
      photoURL,
      ...generateTimestamps()
    };

    collectionRef.doc(uid).set(data).then(documentReference => {
      console.log(`Added profile.`);
    });
  };

  const createProfiles = async () => {
    const promises = [];
     users.users.forEach(async (user) => {
      const gender = generateValueBetweenMinAndMax(0, 1);
      promises.push(await createProfile(
        user.uid,
        faker.name.firstName(gender),
        faker.name.lastName(gender),
        faker.datatype.number({min: 1, max: 100}), 
        faker.address.city(),
        faker.address.country(),
        faker.phone.phoneNumberFormat(5),
        `https://robohash.org/${uuidv4()}?gravatar=hashed`
      ));
    });
    const nProfiles = await (await db.collection('profiles').get()).size;
    db.collection('counters').doc('profiles').set({numAmount: nProfiles}, {merge: true});

    return await Promise.all(promises);
  };

 
  await createProfiles();
})();