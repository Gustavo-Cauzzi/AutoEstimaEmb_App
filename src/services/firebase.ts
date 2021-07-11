import firebase from '@react-native-firebase/app'

import database from '@react-native-firebase/database';
import Environment from '../../enviroment';

const firebaseConfig = {
  apiKey: Environment.API_KEY,
  authDomain: Environment.AUTH_DOMAIN,
  databaseURL: Environment.DATABASE_URL,
  projectId: Environment.PROJECT_ID,
  storageBucket: Environment.STORAGE_BUCKET,
  messagingSenderId: Environment.MESSAGING_SENDER_ID,
  appId: Environment.APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const auth = firebase.auth();
// const database = firebase.database();

export { firebase, database };
