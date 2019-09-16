import firebase from 'firebase/app'
import React, { Component } from 'react';
import 'firebase/firebase-firestore';
import 'firebase/firebase-firestore';
const config = {
    apiKey: "AIzaSyCCr15q1Tna0S9s2g6K5SQQM3FlLF9fSoY",
    authDomain: "resumarked.firebaseapp.com",
    databaseURL: "https://resumarked.firebaseio.com",
    projectId: "resumarked",
    storageBucket: "",
    messagingSenderId: "926171589839",
    appId: "1:926171589839:web:2f8b5d9ebe988f2dfb5bba"
};
export const firebaseApp = firebase.initializeApp(config);

const defaultFirebaseContext = {
    authStatusReported: false,
    isUserSignedIn: false
};

export const FirebaseAuthContext = React.createContext(defaultFirebaseContext);

export default class FirebaseAuth extends Component {
    state = defaultFirebaseContext;
    componentDidMount() {
        firebase.auth.onAuthStateChanged(user => {
            this.setState({
                authStatusReported: true,
                isUserSignedIn: !!user
            })
        })
    }
    render() {
        const { children } = this.props;
        const { authStatusReported, isUserSignedIn } = this.state
        return (
            <FirebaseAuthContext.Provider value={{ isUserSignedIn, authStatusReported }}>
                {authStatusReported && children}
            </FirebaseAuthContext.Provider>
        )
    }
}
