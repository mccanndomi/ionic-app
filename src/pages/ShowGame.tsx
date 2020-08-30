import React, { useEffect, useState } from "react";
import {
  Game,
  Games,
  GameContextConsumer,
  saveGames,
  getSelectedGame,
} from "../GamesState";
import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
} from "@ionic/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "./ShowGame.css";
import { gameController, search } from "ionicons/icons";

const MAP_API_KEY = "AIzaSyCdnfrfE_H7gGd0kfyvzl3Lw6AJaxxJVDo";

const mapContainerStyle = {
  width: "100vw",
  height: "340px",
};

const center = {
  lat: -41.285472,
  lng: 174.723864,
};

const options = {
    disableDefaultUI: true,

}

const libraries = ["places"];

const ShowGame: React.FC = () => {
  const [game, setSelectedGame] = useState({} as Game);
  const [home_goals, setHomeCount] = useState(0);
  const [away_goals, setAwayCount] = useState(0);
  const [pass_count, setPassCount] = useState(0);
  const [corner_count, setCornerCount] = useState(0);
  const [shots_on_target, setShotsOnCount] = useState(0);
  const [shots_off_target, setShotsOffCount] = useState(0);
  const [balls_in_box, setBallsInBoxCount] = useState(0);
  const [tackles, setTacklesCount] = useState(0);

  useEffect(() => {
    async function setGame() {
      await getSelectedGame().then((game) => setSelectedGame(game));
    }
    setGame();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
    libraries,
  });

  if (loadError) return <IonLabel>load error</IonLabel>;
  if (!isLoaded) return <IonLabel>Loading...</IonLabel>;

  return (
    <IonPage>
      <GameContextConsumer>
        {(context: Games) => (
          <IonContent>
            <IonToolbar>
              <IonTitle>Game Stats</IonTitle>
              <IonButton
                type="submit"
                slot="end"
                color="light"
                className="stat_value"
                onClick={(e) => {
                  context.games
                    ? context.games.push({
                        date: game.date,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        location_lat: game.location_lat,
                        location_lng: game.location_lng,
                        home_goals: "0",
                        away_goals: "0",
                        id: game.id,
                        stats: {
                          home_ball_in_box: balls_in_box,
                          home_corners: corner_count,
                          home_passes: pass_count,
                          home_shots: shots_on_target,
                          home_tackles: tackles,
                          away_ball_in_box: 0,
                          away_corners: 0,
                          away_passes: 0,
                          away_shots: 0,
                          away_tackles: 0,
                        },
                      })
                    : (context.games = [
                        {
                          date: game.date,
                          home_team: game.home_team,
                          away_team: game.away_team,
                          location_lat: game.location_lat,
                          location_lng: game.location_lng,
                          home_goals: "0",
                          away_goals: "0",
                          id: game.id,
                          stats: {
                            home_ball_in_box: balls_in_box,
                            home_corners: corner_count,
                            home_passes: pass_count,
                            home_shots: shots_on_target,
                            home_tackles: tackles,
                            away_ball_in_box: 0,
                            away_corners: 0,
                            away_passes: 0,
                            away_shots: 0,
                            away_tackles: 0,
                          },
                        },
                      ]);
                  saveGames(context.games);
                }}
              >
                Save
              </IonButton>
            </IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol size="5">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setHomeCount(home_goals + 1)}
                  >
                    Home Goals
                  </IonButton>
                </IonCol>
                <IonCol size="2">
                  <IonButton
                    expand="block"
                    className="stat_value"
                    size="large"
                    color="secondary"
                    onClick={() => console.log(home_goals)}
                  >
                    {home_goals} - {away_goals}
                  </IonButton>
                </IonCol>
                <IonCol size="5">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setAwayCount(away_goals + 1)}
                  >
                    Away Goal
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setPassCount(pass_count + 1)}
                  >
                    Pass +
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_value"
                    size="large"
                    color="secondary"
                  >
                    {pass_count}
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setPassCount(pass_count - 1)}
                  >
                    Pass -
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setCornerCount(corner_count + 1)}
                  >
                    Corner +
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_value"
                    size="large"
                    color="secondary"
                  >
                    {corner_count}
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setCornerCount(corner_count - 1)}
                  >
                    Corner -
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setShotsOnCount(shots_on_target + 1)}
                  >
                    Shots +
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_value"
                    size="large"
                    color="secondary"
                  >
                    {shots_on_target}
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setShotsOnCount(shots_on_target - 1)}
                  >
                    Shots -
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setBallsInBoxCount(balls_in_box + 1)}
                  >
                    Balls In +
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_value"
                    size="large"
                    color="secondary"
                  >
                    {balls_in_box}
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setBallsInBoxCount(balls_in_box - 1)}
                  >
                    Balls In -
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setTacklesCount(tackles + 1)}
                  >
                    Tackles +
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_value"
                    size="large"
                    color="secondary"
                  >
                    {tackles}
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton
                    expand="block"
                    className="stat_button"
                    size="large"
                    onClick={() => setTacklesCount(tackles - 1)}
                  >
                    Tackles -
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonCard className="map_card">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      zoom={8}
                      center={center}
                      options={options}
                    >
                        <Marker position={{ lat: center.lat, lng: center.lng}}></Marker>
                    </GoogleMap>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        )}
      </GameContextConsumer>
    </IonPage>
  );
};

export default ShowGame;
