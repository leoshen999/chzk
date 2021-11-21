import { useState, useEffect } from "react";
import MainCharactersView from "./components/MainCharactersView";
import ShiroCharaItem from "./components/ShiroCharaItem";
import characters from "./resources/oshirore/characters.json";
import filtersGroups from "./resources/oshirore/filtersGroups";
import sorters from "./resources/oshirore/sorters";
import FilterSorterView from "./components/FilterSorterView";

export default function App() {
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [selectedSorter, setSelectedSorter] = useState<string>("id_asc");

  const [charaList, setCharaList] = useState<Array<any>>([]);

  useEffect(() => {
    const groupFuncs = filtersGroups.map((group) => {
      const selected = group.filters.filter((f) =>
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

    let finalSorterFunc = sorters[0].func;
    const targetSorters = sorters.filter(
      (sorter) => sorter.id === selectedSorter
    );
    if (targetSorters.length > 0) finalSorterFunc = targetSorters[0].func;

    setCharaList(
      characters
        .map((chara) => {
          return {
            ...chara,
            shows: finalFilterFunc(chara),
          };
        })
        .sort(finalSorterFunc)
    );
  }, [selectedFilters, selectedSorter]);

  return (
    <>
      <MainCharactersView>
        {charaList.map((chara) => (
          <ShiroCharaItem chara={chara} key={chara.id} shows={chara.shows} />
        ))}
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
