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
import { Uuid, UuidContextProvider, UuidContextConsumer } from "../uuidState";
import { useState, useEffect } from "react";
import { logInUser } from "../MyFirebase";
import { createToast } from "../toast";
import { registerFirebase, auth, db } from "../MyFirebase";
import { GameContextConsumer, setUuid, getUuid } from "../GamesState";
import { Redirect, useHistory } from "react-router";


const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState(false);

  var usersUuid: string;

  const history = useHistory();

  async function loginUser() {
    const loggedIn = await logInUser(username, password);
    if (!loggedIn) {
      //didnt log in
      createToast("Inncorrect Details");
      return;
    } else {
      //logged in
      createToast("Logging in");

      if (auth().currentUser !== null) {
        console.log("user id: " + auth().currentUser?.uid);
        usersUuid = auth().currentUser?.uid!;
        setUuid(usersUuid);
        console.log(`some  ${usersUuid}`);
        setCorrectPassword(true);
        history.push("/listgamestab");
      } else {
        console.log("oh no");
      }
    }
  }

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
          type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}
        ></IonInput>
        <GameContextConsumer>
          {() => (
            <IonButton
              onClick={() => {
                loginUser();
                console.log(correctPassword)
                
              }}
              
            >
              Login In
            </IonButton>
          )}
        </GameContextConsumer>

        <IonButton href="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
