import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers --to do

const firebaseConfig = {
   apiKey: `${process.env.REACT_APP_API_KEY}`,
   authDomain: "reactclientpanel-8c062.firebaseapp.com",
   databaseURL: "https://reactclientpanel-8c062.firebaseio.com",
   projectId: "reactclientpanel-8c062",
   storageBucket: "reactclientpanel-8c062.appspot.com",
   messagingSenderId: "272159566345",
   appId: "1:272159566345:web:3907edc5f02494c0"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

// init firebase instance
firebase.initializeApp(firebaseConfig);

// init firestore
// const firestore = firebase.firestore();


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);


// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// create initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
