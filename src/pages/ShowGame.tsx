import React, { useEffect, useState } from 'react';
import { Game, Games, GameContextConsumer, saveGames, getSelectedGame } from '../GamesState';
import uuid from 'uuid';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonItem, IonList, IonItemSliding, IonGrid, IonRow, IonItemOption, IonItemOptions, IonCol } from '@ionic/react';
import './ShowGame.css';

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


    return (
        <IonPage>
                <GameContextConsumer>
                { (context : Games) =>
                <IonContent>
                    <IonToolbar>
                        <IonTitle>Game Stats</IonTitle>
                    </IonToolbar>                    
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonButton expand="block" className="stat_button" size="large" onClick={() => passCount++}>Pass +</IonButton></IonCol>
                            <IonCol><IonButton expand="block" className="stat_button" size="large" onClick={() =>  console.log(passCount)}>Pass -</IonButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonButton expand="block" className="stat_button" size="large">Pass +</IonButton></IonCol>
                            <IonCol><IonButton expand="block" className="stat_button" size="large">Pass +</IonButton></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
                }
                </GameContextConsumer>
        </IonPage>
    );
};

export default ShowGame;