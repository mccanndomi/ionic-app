import { createContext } from "react";

export interface Uuid {
  uuid: string;
}

let UuidContext = createContext({} as Uuid);

let UuidContextProvider = UuidContext.Provider;

let UuidContextConsumer = UuidContext.Consumer;

export { UuidContext, UuidContextProvider, UuidContextConsumer };
