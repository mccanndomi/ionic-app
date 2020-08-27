import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonAlert } from '@ionic/react';
import React, {useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { NameContextConsumer , NameContextProvider, Name} from '../NameState';

const Home: React.FC = () => {

  const [showAlert, setShowAlert] = useState(true);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle>Welcome to SWEN325 App</IonTitle>
        <NameContextConsumer>
          {(context: Name) => <IonHeader>You must be {context.name}</IonHeader>}
        </NameContextConsumer>
        <NameContextConsumer>
          {(context: Name) => (
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header={"Welcome!"}
              message={"Welcome to SWEN 325 App, Dear ${context.name}"}
              buttons={["OK"]}
            />
          )}
        </NameContextConsumer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
