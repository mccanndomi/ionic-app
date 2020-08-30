import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonModal, IonButton, IonInput, 
         IonList, IonItem, IonLabel, IonItemOption, IonItemOptions, IonItemSliding, IonGrid, IonRow, IonCol, IonIcon, IonLoading, IonCard, IonCardTitle, IonCardContent, IonDatetime, IonButtons } from '@ionic/react';
import uuid from 'uuid';
import './MapPage.css';
import { Game, Games, GameContextConsumer, saveGames, setSelectedGame, removeGame, getSelectedGame } from '../GamesState';
import { add, arrowBack } from 'ionicons/icons';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
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

const MapPage: React.FC = () => {
    const [game, setSelectedGame] = useState({} as Game);
    useEffect(() => {
        async function setGame() {
          await getSelectedGame().then((game) => {
              setSelectedGame(game);
            });
        }
        setGame();
      }, []);

    return(
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton routerLink="/listgamestab">
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <GameContextConsumer>
            {(context: Games) => (
            <IonContent>
                <IonGrid>
                <IonRow>
                <IonCol size="12">
                  <IonCard className="map_card">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      zoom={12}
                      center={{
                        lat: game.location_lat,
                        lng: game.location_lng,
                      }}
                      options={options}
                    >
                        <Marker position={{ lat: game.location_lat, lng: game.location_lng}}></Marker>
                    </GoogleMap>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
          )}
        </GameContextConsumer>
        </IonPage>
    );
};

export default MapPage;