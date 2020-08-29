import React, { useEffect, useState } from 'react';
import { Game, Games, GameContextConsumer, saveGames, getSelectedGame } from '../GamesState';
import uuid from 'uuid';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonItem, IonList, IonItemSliding, IonGrid, IonRow, IonItemOption, IonItemOptions, IonCol, IonCard, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './ShowGame.css';


const MAP_API_KEY = "AIzaSyCdnfrfE_H7gGd0kfyvzl3Lw6AJaxxJVDo";

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};

const center = {
    lat: -41.285472,
    lng: 174.723864,
};

const libraries = ["places"];

const ShowGame: React.FC = () => {

    const [game, setSelectedGame] = useState({} as Game);

    var passCount = 0;


    useEffect(() => {

        async function setGame() {
            await getSelectedGame()
                .then(game => setSelectedGame(game))
        }
        setGame();

    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: MAP_API_KEY,
        libraries,
    });

    if(loadError) return <IonLabel>load error</IonLabel>;
    if(!isLoaded) return <IonLabel>Loading...</IonLabel>;

    return (
        <IonPage>
                <GameContextConsumer>
                { (context : Games) =>
                <IonContent>
                    <IonToolbar>
                        <IonTitle>Game Stats</IonTitle>
                        <IonButton slot="end" color="dark">Save</IonButton>
                    </IonToolbar>                    
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonButton expand="block" className="stat_button" size="large" onClick={() => passCount++}>Pass +</IonButton></IonCol>
                <IonCol><IonCard>10</IonCard></IonCol>
                            <IonCol><IonButton expand="block" className="stat_button" size="large" onClick={() =>  console.log(passCount)}>Pass -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonButton expand="block" className="stat_button" size="large">Pass +</IonButton></IonCol>
                            <IonCol><IonButton expand="block" className="stat_button" size="large">Pass +</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                        <IonCol size="12"><IonCard><GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}></GoogleMap></IonCard></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
                }
                </GameContextConsumer>
        </IonPage>
    );
};

export default ShowGame;