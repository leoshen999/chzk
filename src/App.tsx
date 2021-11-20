import MainCharactersView from "./components/MainCharactersView";
import ShiroCharaItem from "./components/ShiroCharaItem";
import characters from "./resources/oshirore/characters.json";

export default function App() {
  return (
    <MainCharactersView>
      {characters.map((chara) => (
        <ShiroCharaItem chara={chara} key={chara.id} />
      ))}
    </MainCharactersView>
  );
}
