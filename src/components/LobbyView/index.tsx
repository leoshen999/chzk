import { MouseEvent } from "react";
import styles from "./index.module.css";

export default function LobbyView({
  gameList,
  onSelectGame,
}: {
  gameList: Array<string>;
  onSelectGame: (g: string) => void;
}) {
  function createLinkHandler(game: string) {
    return function (e: MouseEvent<HTMLAnchorElement>) {
      e.preventDefault();
      onSelectGame(game);
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {gameList.map((game) => (
          <a
            className={styles.imgContainer}
            href={"?game=" + game}
            key={game}
            onClick={createLinkHandler(game)}
          >
            <img
              className={styles.img}
              src={process.env.PUBLIC_URL + "/" + game + "/logo.png"}
              alt={game}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
