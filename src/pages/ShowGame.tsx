import React from 'react';
import { Game, Games, GameContextConsumer, saveGames } from '../GamesState';
import uuid from 'uuid';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonItem, IonList, IonItemSliding, IonGrid, IonRow, IonItemOption, IonItemOptions } from '@ionic/react';
import './ShowGame.css';

const ShowGame: React.FC = () => {

    return (
        <IonPage>
                <GameContextConsumer>
                { (context : Games) =>
                <IonContent>
                { (context.games)
                  ? context.games.map((g : Game) =>
                    <IonLabel>
                        Hello World
                    </IonLabel>)
                  : {} }
              </IonContent>
                }
                </GameContextConsumer>
        </IonPage>
    );
};

export default ShowGame;