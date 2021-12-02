import { useRef, useState, useEffect } from "react";
import LobbyView from "./components/LobbyView";
import GameView from "./components/GameView";

const gameList = ["aigis", "oshirore"];

function setupServiceWorker() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register(process.env.PUBLIC_URL + "/sw.js");
}

function getGameFromURL() {
  const searchParams = new URLSearchParams(document.location.search);
  const g = searchParams.get("game");
  if (!g || !gameList.includes(g)) return "";
  return g;
}

export default function App() {
  const [game, setGame] = useState<string>(getGameFromURL());
  const setGameRef = useRef<(g: string) => void>(() => {});

  useEffect(() => {
    setGameRef.current = setGame;
  }, [setGame]);

  useEffect(() => {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      setupServiceWorker();
    } else {
      document.addEventListener("DOMContentLoaded", setupServiceWorker, true);
    }

    const popStateFunc = () => {
      const g = getGameFromURL();
      setGameRef.current(g);
    };

    window.addEventListener("popstate", popStateFunc);
    return function () {
      window.removeEventListener("popstate", popStateFunc);
    };
  }, []);

  function handleSelectGame(g: string) {
    if (!gameList.includes(g)) return;
    window.history.pushState({}, "", "?game=" + g);
    setGame(g);
  }

  if (game === "")
    return <LobbyView gameList={gameList} onSelectGame={handleSelectGame} />;

  return <GameView game={game} />;
}
