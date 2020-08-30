import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from "@ionic/react";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
//import {useState} from 'react'

import { useState, useEffect } from "react";
import {registerFirebase, auth} from '../MyFirebase'

import { createToast } from '../toast' 
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  async function tryRegister() {
    console.log(username, password);
    if(password !== passwordConf){
      createToast("Passwords don't match")
    }

    const tryReg = await registerFirebase(username, password);
    console.log(tryReg)

  }

  var enteredName: string;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          onIonChange={(e: any) => setUsername(e.target.value)}
        ></IonInput>
        <IonInput
          type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}
        ></IonInput>
        <IonInput
          type="password"
          placeholder="Re-enter Password"
          onIonChange={(e: any) => setPasswordConf(e.target.value)}
        ></IonInput>
        <IonButton onClick={tryRegister}>Register</IonButton>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
