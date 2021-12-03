import { MouseEvent, useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import twitterIcon from "./twitter.svg";
import githubIcon from "./github.svg";
import backIcon from "./back.svg";

export default function MoreInfoView({
  isAtHome,
  onGoHome,
}: {
  isAtHome: boolean;
  onGoHome: () => void;
}) {
  const [opened, setOpened] = useState<boolean>(false);

  function handleOpen(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setOpened(true);
  }

  function handleClose(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setOpened(false);
  }

  function handleGoHome(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onGoHome();
    setOpened(false);
  }

  return (
    <>
      <input
        type="button"
        className={clsx(
          styles.floatingButton,
          opened && styles.floatingButtonOpened
        )}
        onClick={handleOpen}
      ></input>

      <div
        className={clsx(styles.mask, opened && styles.maskOpened)}
        onClick={handleClose}
      ></div>

      <div
        className={clsx(
          styles.menuContainer,
          opened && styles.menuContainerOpened
        )}
      >
        <div className={styles.scrollContainer}>
          {!isAtHome && (
            <>
              <a
                href={process.env.PUBLIC_URL + "/"}
                className={clsx(styles.rowItem, styles.rowItemLink)}
                onClick={handleGoHome}
              >
                <img className={styles.icon} src={backIcon} alt="" />
                <div className={styles.text}>ホームに戻る</div>
              </a>
              <div className={styles.separator}></div>
            </>
          )}
          <div className={styles.rowItem}>
            <div className={styles.text}>連絡先：</div>
            <a
              href="https://twitter.com/leoshen365"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.contactLink}
            >
              <img
                src={twitterIcon}
                alt="Twitter"
                className={styles.contactIcon}
              />
            </a>
            <a
              href="https://github.com/leoshen999/chzk"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.contactLink}
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className={styles.contactIcon}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
