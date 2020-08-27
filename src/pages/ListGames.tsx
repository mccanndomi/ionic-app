import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonModal, IonButton, IonInput, 
         IonList, IonItem, IonLabel, IonItemOption, IonItemOptions, IonItemSliding, IonGrid, IonRow, IonCol, IonIcon, IonLoading } from '@ionic/react';
import uuid from 'uuid';
import './ListGames.css';

import { Game, Games, GameContextConsumer, saveGames } from '../GamesState';
import { triangle, add } from 'ionicons/icons';

const ListGames: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  
  //Game Vars
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
          <IonTitle>ListGames</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ListGames</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GameContextConsumer>
          { (context : Games) =>
          <IonList inset lines="none">
            { (context.games)
              ? context.games.map((g : Game) =>
                <IonItemSliding key={uuid.v4()}>
                  {/*Where the game tile begins*/}
                  <IonItem button>
                    <IonGrid>
                      <IonRow>
            <IonCol size="1"><IonItem><IonLabel className="game_info"><IonIcon icon={triangle} /></IonLabel></IonItem></IonCol>
            <IonCol size="4"><IonItem><IonLabel className="game_info">{g.home_team}</IonLabel></IonItem></IonCol>
            <IonCol size="2"><IonItem><IonLabel className="game_info">{g.home_goals} - {g.away_goals}</IonLabel></IonItem></IonCol>
            <IonCol size="4"><IonItem><IonLabel className="game_info">{g.away_team}</IonLabel></IonItem></IonCol>
            <IonCol size="1"><IonItem><IonLabel className="game_info"><IonIcon icon={triangle} /></IonLabel></IonItem></IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>

                  <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() =>{
                      var i = context.games.findIndex(o => o.date === g.date && o.home_team === g.home_team && o.away_team === g.away_team);
                      if (i > -1) context.games.splice(i, 1);
                      saveGames(context.games);
                    }}>Delete</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>)
              : {} }
          </IonList>
          }
        </GameContextConsumer>

        <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <IonList lines="inset">
          <IonItem>
            <IonLabel position="floating">Date</IonLabel>
            <IonInput onIonChange={e => date = e.detail.value!}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Home Team</IonLabel>
            <IonInput onIonChange={e => home_team = e.detail.value!}></IonInput>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Away Team</IonLabel>
            <IonInput onIonChange={e => away_team = e.detail.value!}></IonInput>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Location</IonLabel>
            <IonInput onIonChange={e => location = e.detail.value!}></IonInput>
          </IonItem>
        </IonList>
          <GameContextConsumer>
            {(context : Games) => (
              <IonButton type="submit" onClick={ e =>
                {
                  context.games ? context.games.push({date : date, home_team : home_team, away_team : away_team, location : location, home_goals : home_goals, away_goals : away_goals}) :
                                  context.games = [{date : date, home_team : home_team, away_team : away_team, location : location, home_goals : home_goals, away_goals : away_goals}]
                  saveGames(context.games);
                }
              }>Add New Game</IonButton>
            )}
          </GameContextConsumer>
          <IonButton onClick={() => setShowModal(false)}>Exit</IonButton>
        </IonModal>

        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default ListGames;
