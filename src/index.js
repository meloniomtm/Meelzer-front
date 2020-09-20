import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDvRyyEACBlrsyA0FYhhU_t83T5l_qnhsU",
  authDomain: "meelzer-mtm.firebaseapp.com",
  databaseURL: "https://meelzer-mtm.firebaseio.com",
  projectId: "meelzer-mtm",
  storageBucket: "meelzer-mtm.appspot.com",
  messagingSenderId: "568952923005",
  appId: "1:568952923005:web:8a8cd84bfad9e5a79b2214"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
