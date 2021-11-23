import { useState, useEffect } from "react";
import MainCharactersView from "./components/MainCharactersView";
import FilterSorterView from "./components/FilterSorterView";

const gameList = ["oshirore"];

function getGameFromURL() {
  const searchParams = new URLSearchParams(document.location.search);
  const g = searchParams.get("game");
  if (!g || !gameList.includes(g)) return "";
  return g;
}

function renderCharacters(CharaItem: any, charaListWithShows: any) {
  return (
    <>
      {charaListWithShows.map((cws: any) => (
        <CharaItem chara={cws.chara} key={cws.chara.id} shows={cws.shows} />
      ))}
    </>
  );
}

export default function App() {
  const [game, setGame] = useState<string>(getGameFromURL());
  const [characters, setCharacters] = useState<Array<any>>([]);
  const [filtersGroups, setFiltersGroups] = useState<Array<any>>([]);
  const [sorters, setSorters] = useState<Array<any>>([]);

  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [selectedSorter, setSelectedSorter] = useState<string>("");
  const [CharaItem, setCharaItem] = useState<any>(null);

  const [charaListWithShows, setCharaListWithShows] = useState<Array<any>>([]);

  useEffect(() => {
    setCharacters([]);
    setFiltersGroups([]);
    setSorters([]);
    setSelectedFilters([]);
    setSelectedSorter("");
    setCharaItem(null);
    setCharaListWithShows([]);

    (async () => {
      if (!game) return;
      const res = await import("./resources/" + game);
      const ci = (await import("./components/" + game + "/CharaItem")).default;

      setCharacters(res.characters);
      setFiltersGroups(res.filtersGroups);
      setSorters(res.sorters);
      setCharaItem(() => ci);
      setSelectedSorter(res.sorters.length > 0 ? res.sorters[0].id : "");
    })();
  }, [game]);

  useEffect(() => {
    const groupFuncs = filtersGroups.map((group) => {
      const selected = group.filters.filter((f: any) =>
        selectedFilters.includes(f.id)
      );
      if (selected.length === 0)
        return function () {
          return true;
        };
      return function (chara: any) {
        for (var i = 0; i < selected.length; i++)
          if (selected[i].func(chara)) return true;
        return false;
      };
    });
    const finalFilterFunc = function (chara: any) {
      for (var i = 0; i < groupFuncs.length; i++)
        if (!groupFuncs[i](chara)) return false;
      return true;
    };

    let finalSorterFunc =
      sorters.length > 0
        ? sorters[0].func
        : function () {
            return false;
          };
    const targetSorters = sorters.filter(
      (sorter) => sorter.id === selectedSorter
    );
    if (targetSorters.length > 0) finalSorterFunc = targetSorters[0].func;

    const finalList = characters.sort(finalSorterFunc).map((chara) => ({
      chara,
      shows: finalFilterFunc(chara),
    }));
    setCharaListWithShows(finalList);
  }, [characters, filtersGroups, sorters, selectedFilters, selectedSorter]);

  return (
    <>
      <MainCharactersView>
        {CharaItem !== null && renderCharacters(CharaItem, charaListWithShows)}
      </MainCharactersView>
      <FilterSorterView
        filtersGroups={filtersGroups}
        sorters={sorters}
        selectedFilters={selectedFilters}
        selectedSorter={selectedSorter}
        onSelectFilters={setSelectedFilters}
        onSelectSorter={setSelectedSorter}
      />
    </>
  );
}
