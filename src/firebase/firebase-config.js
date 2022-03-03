import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAbHRr9pWZuGajX8vB5Zil3rU17sZEBswY',
	authDomain: 'marketing-sinergia-app.firebaseapp.com',
	projectId: 'marketing-sinergia-app',
	storageBucket: 'marketing-sinergia-app.appspot.com',
	messagingSenderId: '103255589568',
	appId: '1:103255589568:web:a36e6c685fbc937086a325',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
