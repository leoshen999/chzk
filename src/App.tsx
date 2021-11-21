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
  const [charaListWithShows, setCharaListWithShows] = useState<Array<any>>([]);

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

    const finalList = characters.sort(finalSorterFunc).map((chara) => ({
      chara,
      shows: finalFilterFunc(chara),
    }));
    setCharaListWithShows(finalList);
  }, [selectedFilters, selectedSorter]);

  return (
    <>
      <MainCharactersView>
        {charaListWithShows.map((cws) => (
          <ShiroCharaItem
            chara={cws.chara}
            key={cws.chara.id}
            shows={cws.shows}
          />
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
