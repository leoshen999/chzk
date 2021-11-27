import { useRef, useState, useEffect } from "react";
import LobbyView from "./components/LobbyView";
import GameView from "./components/GameView";

const gameList = ["aigis", "oshirore"];

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
