import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCCr15q1Tna0S9s2g6K5SQQM3FlLF9fSoY",
    authDomain: "resumarked.firebaseapp.com",
    databaseURL: "https://resumarked.firebaseio.com",
    projectId: "resumarked",
    storageBucket: "",
    messagingSenderId: "926171589839",
    appId: "1:926171589839:web:2f8b5d9ebe988f2dfb5bba"
};
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp