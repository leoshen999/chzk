import { useState, useEffect } from "react";
import CharactersView from "./CharactersView";
import FilterSorterView from "./FilterSorterView";

function renderCharacters(CharaItem: any, charaListWithShows: any) {
  return (
    <>
      {charaListWithShows.map((cws: any) => (
        <CharaItem chara={cws.chara} key={cws.chara.id} shows={cws.shows} />
      ))}
    </>
  );
}

export default function GameView({ game }: { game: string }) {
  const [characters, setCharacters] = useState<Array<any>>([]);
  const [keywordMatcher, setKeywordMatcher] = useState<
    (ch: any, keyword: string) => boolean
  >(() => {
    return false;
  });
  const [filterGroups, setFilterGroups] = useState<Array<any>>([]);
  const [sorters, setSorters] = useState<Array<any>>([]);

  const [keyword, setKeyword] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [selectedSorter, setSelectedSorter] = useState<string>("");
  const [CharaItem, setCharaItem] = useState<any>(null);

  const [charaListWithShows, setCharaListWithShows] = useState<Array<any>>([]);

  useEffect(() => {
    setCharacters([]);
    setKeywordMatcher(() => {
      return false;
    });
    setFilterGroups([]);
    setSorters([]);
    setKeyword("");
    setSelectedFilters([]);
    setSelectedSorter("");
    setCharaItem(null);
    setCharaListWithShows([]);

    (async () => {
      if (!game) return;
      const res = await import("../../resources/" + game);
      const ci = (await import("../" + game + "/CharaItem")).default;

      setCharacters(res.characters);
      setKeywordMatcher(() => res.keywordMatcher);
      setFilterGroups(res.filterGroups);
      setSorters(res.sorters);
      setCharaItem(() => ci);
      setSelectedSorter(res.sorters.length > 0 ? res.sorters[0].id : "");
    })();
  }, [game]);

  useEffect(() => {
    const groupFuncs = filterGroups.map((group) => {
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
      if (!!keyword && !keywordMatcher(chara, keyword)) return false;
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
  }, [
    characters,
    keywordMatcher,
    filterGroups,
    sorters,
    keyword,
    selectedFilters,
    selectedSorter,
  ]);

  return (
    <>
      <CharactersView>
        {CharaItem !== null && renderCharacters(CharaItem, charaListWithShows)}
      </CharactersView>
      <FilterSorterView
        filterGroups={filterGroups}
        sorters={sorters}
        keyword={keyword}
        selectedFilters={selectedFilters}
        selectedSorter={selectedSorter}
        onSetKeyword={setKeyword}
        onSelectFilters={setSelectedFilters}
        onSelectSorter={setSelectedSorter}
      />
    </>
  );
}
