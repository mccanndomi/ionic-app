import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React from 'react';
import {Name, NameContextProvider, NameContextConsumer } from '../NameState'
import {useState, useEffect} from 'react'
import {logInUser} from '../MyFirebase'
import {createToast} from '../toast'
import { registerFirebase, auth, db } from "../MyFirebase";

const Login: React.FC = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("");

    async function loginUser(){
      const loggedIn = await logInUser(username, password); 
      if(!loggedIn){ //didnt log in
        createToast("Inncorrect Details")
        return
      }
      else{ //logged in 
        createToast("Logging in")
        
        
        if (auth().currentUser !== null) {
            console.log("user id: " + auth().currentUser?.uid);
          } else {
          console.log("meep");
        }

        
      }
    }

    var enteredName : string;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput
            placeholder="Email"
            onIonChange={(e: any) => setUsername(e.target.value)}
          ></IonInput>
          <IonInput
            type='password'
            placeholder="Password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          ></IonInput>
          <IonButton onClick={loginUser}>Login In</IonButton>
          <IonButton href="/register">Register</IonButton>
        </IonContent>
      </IonPage>
    );
};

export default Login;
