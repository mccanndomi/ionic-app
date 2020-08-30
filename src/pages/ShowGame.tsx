import React, { useEffect, useState } from 'react';
import { Game, Games, GameContextConsumer, saveGames, getSelectedGame } from '../GamesState';
import uuid from 'uuid';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonItem, IonList, IonItemSliding, IonGrid, IonRow, IonItemOption, IonItemOptions, IonCol, IonCard, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './ShowGame.css';
import { count } from 'console';


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
    const [home_goals, setHomeCount] = useState(0);
    const [away_goals, setAwayCount] = useState(0);
    const [pass_count, setPassCount] = useState(0);
    const [corner_count, setCornerCount] = useState(0);
    const [shots_on_target, setShotsOnCount] = useState(0);
    const [shots_off_target, setShotsOffCount] = useState(0);
    const [balls_in_box, setBallsInBoxCount] = useState(0);
    const [tackles, setTacklesCount] = useState(0);

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
                        <IonButton slot="end" color="light" className="stat_value">Save</IonButton>
                    </IonToolbar>                    
                    <IonGrid>
                        <IonRow>
                            <IonCol size="5"><IonButton expand="block" className="stat_button" size="large" onClick={() => setHomeCount(home_goals + 1)}>Home Goal</IonButton></IonCol>
                <IonCol size="2"><IonButton expand="block" className="stat_value" size="large" color="secondary" onClick={() => console.log(home_goals)}>{home_goals} - {away_goals}</IonButton></IonCol>
                            <IonCol size="5"><IonButton expand="block" className="stat_button" size="large" onClick={() =>  setAwayCount(away_goals + 1)}>Away Goal</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setPassCount(pass_count + 1)}>Pass +</IonButton></IonCol>
                <IonCol size="4"><IonButton expand="block" className="stat_value" size="large" color="secondary">{pass_count}</IonButton></IonCol>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() =>  setPassCount(pass_count - 1)}>Pass -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setCornerCount(corner_count + 1)}>Corner +</IonButton></IonCol>
                <IonCol size="4"><IonButton expand="block" className="stat_value" size="large" color="secondary">{corner_count}</IonButton></IonCol>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() =>  setCornerCount(corner_count - 1)}>Corner -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setShotsOnCount(shots_on_target + 1)}>Shots On +</IonButton></IonCol>
                <IonCol size="4"><IonButton expand="block" className="stat_value" size="large" color="secondary">{shots_on_target}</IonButton></IonCol>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setShotsOnCount(shots_on_target - 1)}>Shots On -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setShotsOffCount(shots_off_target + 1)}>Shots Off +</IonButton></IonCol>
                <IonCol size="4"><IonButton expand="block" className="stat_value" size="large" color="secondary">{shots_off_target}</IonButton></IonCol>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setShotsOffCount(shots_off_target - 1)}>Shots Off -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setBallsInBoxCount(balls_in_box + 1)}>Balls In +</IonButton></IonCol>
                <IonCol size="4"><IonButton expand="block" className="stat_value" size="large" color="secondary">{balls_in_box}</IonButton></IonCol>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setBallsInBoxCount(balls_in_box - 1)}>Balls In -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setTacklesCount(tackles + 1)}>Tackles +</IonButton></IonCol>
                <IonCol size="4"><IonButton expand="block" className="stat_value" size="large" color="secondary">{tackles}</IonButton></IonCol>
                            <IonCol size="4"><IonButton expand="block" className="stat_button" size="large" onClick={() => setTacklesCount(tackles - 1)}>Tackles -</IonButton></IonCol>
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