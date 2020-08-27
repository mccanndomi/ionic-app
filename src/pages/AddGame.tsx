import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import './AddGame.css';

import {saveGames, Games, GameContextConsumer} from '../GamesState';

const AddGame: React.FC = () => {
  var date : string;
  var home_team : string;
  var away_team : string;
  var location : string;

  var home_goals = "0";
  var away_goals = "0";
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AddGame</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">AddGame</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default AddGame;
