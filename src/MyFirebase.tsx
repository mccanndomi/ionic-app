import firebase from "firebase"
import {createToast} from './toast'

const config = {
  apiKey: "AIzaSyDf-9JxNiEWitF6s-5dtggAl9SR9Z-b4O0",
  authDomain: "footytrackerapp.firebaseapp.com",
  databaseURL: "https://footytrackerapp.firebaseio.com",
  projectId: "footytrackerapp",
  storageBucket: "footytrackerapp.appspot.com",
  messagingSenderId: "595769591410",
  appId: "1:595769591410:web:45579b8b3dd6cd7bf3e4eb",
  measurementId: "G-SBZ3MTNB92",
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();


export async function logInUser(userName : string, password : string) {
  try{
    const tryLogin = await firebase.auth().signInWithEmailAndPassword(userName, password);
    console.log(tryLogin);
    return true;
  }catch(e){
    console.log(e)
    return false;
  }
}

export async function registerFirebase(userName : string, password : string) {
  try{
    const tryReg = await firebase.auth().createUserWithEmailAndPassword(userName, password);
    createToast("Registration Complete")
    return true
  }catch(error){
    createToast(error.message)
    return false
  }
}