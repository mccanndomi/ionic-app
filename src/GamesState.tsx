import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
import { gameController } from 'ionicons/icons';

export interface Game {
    //Create Fields
    date : string;
    home_team : string;
    away_team : string;
    location : string;
    home_goals : string;
    away_goals : string;
    id : string;
}

export interface Games {
    games : Game[];
    selectedGame : string;
}

const { Storage } = Plugins;

export async function saveGames(gs : Game[]) {
    await Storage.set({
        key: 'games',
        value: JSON.stringify(gs)
    });
}

export async function setSelectedGame(game : string) {
    await Storage.set({
        key: "selectedGame",
        value: game
    });
}

export async function getSelectedGame() : Promise<any>{
    const gameIdRes = await Storage.get({key : "selectedGame"});
    let selectedGameId = ""

    if(typeof gameIdRes.value === 'string'){
        selectedGameId = gameIdRes.value as string; 
    }

    let res = await Storage.get({key : "games"});
    let storageGames = [] as Game[];

    if(typeof res.value === 'string'){
        storageGames = JSON.parse(res.value) as Game[]; 
    }

    let game1 = null;

    const game = storageGames.map((game) => {
        if(game.id === selectedGameId){
            game1 = game as Game;
            return game as Game;
        }
    });

    return game1;
}

let GamesContext = createContext({} as Games);

function GameContextProvider(props: { children : React.ReactNode; }) {

    const [initialGames, setInitialGames] = useState([] as Game[]);
    const selectedGame1 = " ";

    useEffect(() => {
        Promise.resolve(Storage.get({key: 'games'}).then(
            (result) => {
                if (typeof result.value === 'string') {
                    setInitialGames(JSON.parse(result.value) as Game[]);
                }
            },
            (reason) => console.log("Failed to load games from storage because of: " + reason)
        ));
    }, []);

    return(
    <GamesContext.Provider value={{games : initialGames, selectedGame : selectedGame1}}>{props.children}</GamesContext.Provider>
    )
}

let GameContextConsumer = GamesContext.Consumer;

export { GamesContext, GameContextProvider, GameContextConsumer };