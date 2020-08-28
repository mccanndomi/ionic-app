import { createContext } from "react";
import { Game } from "./GamesState"

let CurrentGameContext = createContext({} as Game);

let CurrentGameContextProvider = CurrentGameContext.Provider;

let CurrentGameContextConsumer = CurrentGameContext.Consumer;

export { CurrentGameContext, CurrentGameContextProvider, CurrentGameContextConsumer };
