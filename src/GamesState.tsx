import React, { createContext, useState, useEffect } from "react";
import { Plugins } from "@capacitor/core";
import { gameController } from "ionicons/icons";
import { db } from "./MyFirebase";
import { Uuid } from "./uuidState";
import { findByAltText } from "@testing-library/react";

export interface Game {
  //Create Fields
  date: string;
  home_team: string;
  away_team: string;
  location: string;
  home_goals: string;
  away_goals: string;
  id: string;
  stats: Stats;
}

export interface Stats {
  home_corners: number;
  away_corners: number;
  home_shots: number;
  away_shots: number;
  home_passes: number;
  away_passes: number;
  home_ball_in_box: number;
  away_ball_in_box: number;
  home_tackles: number;
  away_tackles: number;
}

export interface Games {
  games: Game[];
  selectedGame: string;
}

const { Storage } = Plugins;

export async function saveGames(gs: Game[]) {
  // await Storage.set({
  //     key: 'games',
  //     value: JSON.stringify(gs)
  // });
  const currGame = gs[gs.length - 1] as Game;

  var fb = db.ref("user1/");
  fb.child(`${currGame.id}`).set({
    date: gs[gs.length - 1].date,
    home_team: gs[gs.length - 1].home_team,
    away_team: gs[gs.length - 1].away_team,
    location: gs[gs.length - 1].location,
    home_goals: gs[gs.length - 1].home_goals,
    away_goals: gs[gs.length - 1].away_goals,
    id: gs[gs.length - 1].id,
  });
}

export async function removeGame(id: string) {
  console.log(id);
  console.log(`user1/${id}`);
  db.ref(`user1/${id}`).remove();
}

export async function setSelectedGame(id: string) {
  await Storage.set({
    key: "selectedGame",
    value: id,
  });
}

export async function setUuid(uuid: string) {
  await Storage.set({
    key: "uuid",
    value: uuid,
  });
}

export async function getUuid(): Promise<string> {
  const userUuid = await Storage.get({ key: "uuid" });
  return userUuid.value as string;
}

export async function getSelectedGame(): Promise<any> {
  let selectedID = await Storage.get({ key: "selectedGame" });
  let uuid = selectedID.value as string;

  console.log(uuid);

  let database = db.ref(`/user1/${uuid}`);
  database.once("value");
  

  // const gameIdRes = await Storage.get({ key: "selectedGame" });
  // let selectedGameId = "";

  // if (typeof gameIdRes.value === "string") {
  //   selectedGameId = gameIdRes.value as string;
  // }

  // let res = await Storage.get({ key: "games" });
  // let storageGames = [] as Game[];

  // if (typeof res.value === "string") {
  //   storageGames = JSON.parse(res.value) as Game[];
  // }

  // let game1 = null;

  // const game = storageGames.map((game) => {
  //   if (game.id === selectedGameId) {
  //     game1 = game as Game;
  //     return game as Game;
  //   }
  // });

  // return game1;
}

let GamesContext = createContext({} as Games);

function GameContextProvider(props: { children: React.ReactNode }) {
  const [initialGames, setInitialGames] = useState([] as Game[]);
  const selectedGame1 = " ";

  let tripsRef = db.ref("/user1");

  useEffect(() => {
    tripsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      if (data != null) {
        setInitialGames(Object.values(data));
      }
    });
  }, []);

  console.log(initialGames);

  return (
    <GamesContext.Provider
      value={{ games: initialGames, selectedGame: selectedGame1 }}
    >
      {props.children}
    </GamesContext.Provider>
  );
}

let GameContextConsumer = GamesContext.Consumer;

export { GamesContext, GameContextProvider, GameContextConsumer };
