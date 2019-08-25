import {initializeApp} from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyDTYjoFGsICtTl6B8xPklseKsO7-KWkJFs",
  authDomain: "vue-fire-test-a8db1.firebaseapp.com",
  databaseURL: "https://vue-fire-test-a8db1.firebaseio.com",
  projectId: "vue-fire-test-a8db1",
  storageBucket: "",
  messagingSenderId: "198847839368"
});

export const db = app.firestore();
export const todosCollection = db.collection('todos');