import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCDpQMrZ8BkyREUX_PSQpVYQNdMjTKs7ko",
  authDomain: "m-city-5fed4.firebaseapp.com",
  databaseURL: "https://m-city-5fed4.firebaseio.com",
  projectId: "m-city-5fed4",
  storageBucket: "m-city-5fed4.appspot.com",
  messagingSenderId: "883489603929",
  appId: "1:883489603929:web:39564f1400630d84450c48",
  measurementId: "G-7L50K89VPC",
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");
const firebasePromotions = firebaseDB.ref("promotions");

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers,
};
