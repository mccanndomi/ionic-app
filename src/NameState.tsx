import { createContext } from "react";

export interface Name {
  name: string;
}

let NameContext = createContext({} as Name);

let NameContextProvider = NameContext.Provider;

let NameContextConsumer = NameContext.Consumer;

export { NameContext, NameContextProvider, NameContextConsumer };
