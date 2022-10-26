// @ts-nocheck
import { Fragment, useEffect, useState } from "react";
import { throttle } from "lodash";
import { sorters, characters as originalCharacters } from "./resources/aigis";
import styles from "./App2.module.css";
import clsx from "clsx";

const characters = originalCharacters.sort((c1, c2) => {
  return sorters[0].func(c1, c2);
});

const rarities = [
  "black",
  "platinum",
  "sapphire",
  "gold",
  "silver",
  "bronze",
  "iron",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function CharIcon(props: any) {
  return (
    <img
      src={process.env.PUBLIC_URL + "/aigis/ch/" + props.ch.name + ".png"}
      className={clsx(styles.charIcon, props.dark && styles.charIconDark)}
      onClick={props.onClick}
    />
  );
}

let enabledCharsToSave = [];
const save = () => {
  window.localStorage.setItem(
    "enabledChars",
    JSON.stringify(enabledCharsToSave)
  );
};
const throttledSave = throttle(save, 3000);

export default function App2() {
  const [enabledChars, setEnabledChars] = useState([]);
  const [party, setParty] = useState([]);
  function handleToggle(ch) {
    const newEnabledChars = characters
      .filter((ch2) => {
        if (ch2.name === ch.name) return !enabledChars.includes(ch2.name);
        return enabledChars.includes(ch2.name);
      })
      .map((ch2) => ch2.name);
    setEnabledChars(newEnabledChars);
    enabledCharsToSave = newEnabledChars;
    throttledSave();
  }

  function handleSave() {
    save();
  }

  function handleGenerate() {
    let newParty = [];
    rarities.forEach((r) => {
      const v = document.getElementById(r + "-input").value.trim();
      if (v === "") return;
      const count = parseInt(v);

      const matchedChars = characters.filter(
        (ch) => ch.rarity === r && enabledChars.includes(ch.name)
      );
      shuffle(matchedChars);
      newParty = [...newParty, ...matchedChars.slice(0, count)];
    });
    setParty(newParty);
  }

  useEffect(() => {
    const ec = window.localStorage.getItem("enabledChars");
    if (ec) {
      try {
        const tmp = JSON.parse(ec);
        setEnabledChars(tmp);
        enabledCharsToSave = tmp;
      } catch {}
    }
    const beforeUnload = () => {
      save();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      save();
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  return (
    <div>
      {characters.map((ch) => (
        <CharIcon
          key={ch.name}
          ch={ch}
          dark={!enabledChars.includes(ch.name)}
          onClick={() => handleToggle(ch)}
        />
      ))}

      <div className={styles.separator} />

      <div className={styles.inputContainer}>
        <input
          type="button"
          className={styles.button}
          value="Save"
          onClick={handleSave}
        />

        {rarities.map((r) => (
          <Fragment key={r}>
            <span className={styles.rarityLabel}>{r + ""}</span>
            <input
              type="text"
              id={r + "-input"}
              className={styles.rarityInput}
            />
          </Fragment>
        ))}
        <input
          type="button"
          className={styles.button}
          value="Generate"
          onClick={handleGenerate}
        />
      </div>

      <div className={styles.separator} />

      <div className={styles.partyContainer}>
        {party.map((ch, idx) => (
          <Fragment key={idx}>
            <CharIcon key={ch.name} ch={ch} dark={false} onClick={() => {}} />
            {(idx + 1) % 5 === 0 && <br />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
