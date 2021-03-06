import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
   apiKey: `${process.env.REACT_APP_API_KEY}`,
   authDomain: "react-clientpanel-454d8.firebaseapp.com",
   databaseURL: "https://react-clientpanel-454d8.firebaseio.com",
   projectId: "react-clientpanel-454d8",
   storageBucket: "react-clientpanel-454d8.appspot.com",
   messagingSenderId: "605675048427",
   appId: "1:605675048427:web:5fd9fd91ec64916e"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

// init firebase instance
firebase.initializeApp(firebaseConfig);

// init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);


// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// check for settings in localStorage
if(localStorage.getItem('settings') == null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  // set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

// create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
