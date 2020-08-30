import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonModal, IonButton, IonInput, 
         IonList, IonItem, IonLabel, IonItemOption, IonItemOptions, IonItemSliding, IonGrid, IonRow, IonCol, IonIcon, IonLoading, IonCard, IonCardTitle, IonCardContent, IonDatetime } from '@ionic/react';
import uuid from 'uuid';
import './ListGames.css';
import { Game, Games, GameContextConsumer, saveGames, setSelectedGame, removeGame } from '../GamesState';
import { add } from 'ionicons/icons';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "340px",
};

const center = {
  lat: -41.285472,
  lng: 174.723864,
};

const options = {
    disableDefaultUI: true,

};

const libraries = ["places"];

const MAP_API_KEY = "AIzaSyCdnfrfE_H7gGd0kfyvzl3Lw6AJaxxJVDo";

const ListGames: React.FC = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [home_team, setHomeTeam] = useState("")
  const [away_team, setAwayTeam] = useState("");
  const [location_lat, setLocationlat] = useState(0);
  const [location_lng, setLocationlng] = useState(0);

  var home_goals = 0;
  var away_goals = 0;
  

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
    libraries,
  });

  if (loadError) return <IonLabel>load error</IonLabel>;
  if (!isLoaded) return <IonLabel>Loading...</IonLabel>;

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
              <IonDatetime display-timezone="utc" onIonChange={e => setDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Home Team</IonLabel>
              <IonInput
                onIonChange={(e) => setHomeTeam(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Away Team</IonLabel>
              <IonInput
                onIonChange={(e) => setAwayTeam(e.detail.value!)}
              ></IonInput>
            </IonItem>
              <IonCard>
                <IonCardContent>Please drop a pin for the location of the game!</IonCardContent>
              </IonCard>
            <IonItem>
              <IonCard className="map_card">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      zoom={8}
                      center={center}
                      options={options}
                      onClick={(e) => {
                        setLocationlat(e.latLng.lat);
                        setLocationlng(e.latLng.lng);
                      }}
                    >
                        <Marker position={{ lat: location_lat, lng: location_lng}}></Marker>
                    </GoogleMap>
                </IonCard>
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
                        home_goals: home_goals,
                        away_goals: away_goals,
                        location_lat: location_lat,
                        location_lng: location_lng,
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
                          home_goals: home_goals,
                          away_goals: away_goals,
                          location_lat: location_lat,
                          location_lng: location_lng,
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
