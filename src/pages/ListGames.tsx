import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonModal, IonButton, IonInput, 
         IonList, IonItem, IonLabel, IonItemOption, IonItemOptions, IonItemSliding, IonGrid, IonRow, IonCol, IonIcon, IonLoading } from '@ionic/react';
import uuid from 'uuid';
import './ListGames.css';
import { Game, Games, GameContextConsumer, saveGames, setSelectedGame, removeGame } from '../GamesState';
import { add } from 'ionicons/icons';
import ShowGame from './ShowGame';

const ListGames: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  //Game Vars
  var date: string;
  var home_team: string;
  var away_team: string;
  var location: string;
  var home_goals = "0";
  var away_goals = "0";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Games</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Games</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GameContextConsumer>
          { (context : Games) =>
          <IonList>
            { 
            (context.games)
              ? context.games.map((g : Game) =>
                <IonItemSliding key={uuid.v4()}>
                  <IonItem button routerLink="/showgame" onClick={() => setSelectedGame(g.id)}>
                    <IonGrid>
                      <IonRow>
            <IonLabel className="game_info">{g.home_team} {g.home_goals} - {g.away_goals} {g.away_team} </IonLabel>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() =>{
                      var i = context.games.findIndex(o => o.id === g.id);
                      if (i > -1) context.games.splice(i, 1);
                      //saveGames(context.games);
                      removeGame(g.id)
                    }}>Delete</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>)
              : {}
              }
          </IonList>
          }
        </GameContextConsumer>

        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <IonToolbar>
            <IonTitle>Game Stats</IonTitle>
          </IonToolbar>
          <IonList lines="inset">
            <IonItem>
              <IonLabel position="floating">Date</IonLabel>
              <IonInput
                onIonChange={(e) => (date = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Home Team</IonLabel>
              <IonInput
                onIonChange={(e) => (home_team = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Away Team</IonLabel>
              <IonInput
                onIonChange={(e) => (away_team = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Location</IonLabel>
              <IonInput
                onIonChange={(e) => (location = e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonList>
          <GameContextConsumer>
            {(context: Games) => (
              <IonButton
                type="submit"
                onClick={(e) => {
                  context.games
                    ? context.games.push({
                        date: date,
                        home_team: home_team,
                        away_team: away_team,
                        location: location,
                        home_goals: home_goals,
                        away_goals: away_goals,
                        id: uuid.v4(),
                        stats: {
                          home_ball_in_box: 0,
                          home_corners: 0,
                          home_passes: 0,
                          home_shots: 0,
                          home_tackles: 0,
                          away_ball_in_box: 0,
                          away_corners: 0,
                          away_passes: 0,
                          away_shots: 0,
                          away_tackles: 0
                        }
                      })
                    : (context.games = [
                        {
                          date: date,
                          home_team: home_team,
                          away_team: away_team,
                          location: location,
                          home_goals: home_goals,
                          away_goals: away_goals,
                          id: uuid.v4(),
                          stats: {
                            home_ball_in_box: 0,
                            home_corners: 0,
                            home_passes: 0,
                            home_shots: 0,
                            home_tackles: 0,
                            away_ball_in_box: 0,
                            away_corners: 0,
                            away_passes: 0,
                            away_shots: 0,
                            away_tackles: 0
                          }
                        },
                      ]);
                  saveGames(context.games);
                  setShowModal(false);
                }}
              >
                Add New Game
              </IonButton>
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
