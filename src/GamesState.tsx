import React, { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';

export interface Game {
    //Create Fields
    date : string;
    home_team : string;
    away_team : string;
    location : string;
    //Fields to add later
    home_goals: string;
    away_goals: string;

}

export interface Games {
    games : Game[];
}

const { Storage } = Plugins;

export async function saveGames(gs : Game[]) {
    await Storage.set({
        key: 'games',
        value: JSON.stringify(gs)
    });
}

let GamesContext = createContext({} as Games);

function GameContextProvider(props: { children : React.ReactNode; }) {

    const [initialGames, setInitialGames] = useState([] as Game[]);

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
    <GamesContext.Provider value={{games : initialGames}}>{props.children}</GamesContext.Provider>
    )
}

let GameContextConsumer = GamesContext.Consumer;

export { GamesContext, GameContextProvider, GameContextConsumer };