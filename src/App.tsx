import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import ListGames from './pages/ListGames';
import AddGame from './pages/AddGame';
import Highlights from './pages/Highlights';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { GameContextProvider } from './GamesState';

const App: React.FC = () => (
  <IonApp>
    <GameContextProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/listgamestab" component={ListGames} exact={true} />
            <Route path="/addgametab" component={AddGame} exact={true} />
            <Route path="/highlightstab" component={Highlights} />
            <Route path="/" render={() => <Redirect to="/listGames" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="listgamestab" href="/listgamestab">
              <IonIcon icon={triangle} />
              <IonLabel>List Games</IonLabel>
            </IonTabButton>
            <IonTabButton tab="addgametab" href="/addgametab">
              <IonIcon icon={ellipse} />
              <IonLabel>Add Games</IonLabel>
            </IonTabButton>
            <IonTabButton tab="highlightstab" href="/highlightstab">
              <IonIcon icon={square} />
              <IonLabel>Highlights</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </GameContextProvider>
  </IonApp>
);

export default App;
