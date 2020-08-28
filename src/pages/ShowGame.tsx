import React, { useEffect, useState } from 'react';
import { Game, Games, GameContextConsumer, saveGames, getSelectedGame } from '../GamesState';
import uuid from 'uuid';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonItem, IonList, IonItemSliding, IonGrid, IonRow, IonItemOption, IonItemOptions } from '@ionic/react';
import './ShowGame.css';

const ShowGame: React.FC = () => {

    const [game, setSelectedGame] = useState({} as Game);


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
                    <IonLabel>{game.home_team}</IonLabel>
                </IonContent>
                }
                </GameContextConsumer>
        </IonPage>
    );
};

export default ShowGame;