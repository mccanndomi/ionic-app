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
  IonButtons,
  IonIcon,
} from "@ionic/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "./ShowGame.css";
import { arrowBack, saveOutline, mapOutline } from "ionicons/icons";

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
  const [balls_in_box, setBallsInBoxCount] = useState(0);
  const [tackles, setTacklesCount] = useState(0);

  useEffect(() => {
    async function setGame() {
      await getSelectedGame().then((game) => {
          setSelectedGame(game);
          setHomeCount(game.home_goals);
          setAwayCount(game.away_goals);
          setPassCount(game.stats.home_passes);
          setCornerCount(game.stats.home_corners);
          setShotsOnCount(game.stats.home_shots);
          setBallsInBoxCount(game.stats.home_ball_in_box);
          setTacklesCount(game.stats.home_tackles);
        });
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
                <IonButtons slot="start">
                    <IonButton routerLink="/listgamestab">
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                <IonButton
                type="submit"
                onClick={(e) => {
                  context.games
                    ? context.games.push({
                        date: game.date,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        location_lat: game.location_lat,
                        location_lng: game.location_lng,
                        home_goals: home_goals,
                        away_goals: away_goals,
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
                          home_goals: home_goals,
                          away_goals: away_goals,
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
                </IonButtons>
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
                    {game.home_team}
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
                      {game.away_team}
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
                    <IonButton expand="block" color="tertiary" className="stat_button" routerLink="/mapPage">
                        <IonLabel>View location on Map</IonLabel>
                        <IonIcon icon={mapOutline}></IonIcon>
                    </IonButton>
                </IonCol>
              </IonRow>
              {/* <IonRow>
                <IonCol size="12">
                  <IonCard className="map_card">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      zoom={12}
                      center={{
                        lat: game.location_lat,
                        lng: game.location_lng,
                      }}
                      options={options}
                    >
                        <Marker position={{ lat: game.location_lat, lng: game.location_lng}}></Marker>
                    </GoogleMap>
                  </IonCard>
                </IonCol>
              </IonRow> */}
            </IonGrid>
          </IonContent>
        )}
      </GameContextConsumer>
    </IonPage>
  );
};

export default ShowGame;
