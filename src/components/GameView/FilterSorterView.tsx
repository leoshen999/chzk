import { Fragment, MouseEvent, useState } from "react";
import styles from "./FilterSorterView.module.css";
import clsx from "clsx";

export default function FilterSorterView({
  filterGroups,
  sorters,
  keyword,
  selectedFilters,
  selectedSorter,
  onSetKeyword,
  onSelectFilters,
  onSelectSorter,
}: {
  filterGroups: any;
  sorters: any;
  keyword: string;
  selectedFilters: Array<string>;
  selectedSorter: string;
  onSetKeyword: (keyword: string) => void;
  onSelectFilters: (filters: Array<string>) => void;
  onSelectSorter: (sorter: string) => void;
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

  function handleSearchKeyword(e) {
    onSetKeyword(e.target.value);
  }

  function handleSelectFilter(id: string) {
    const newFilters = filterGroups
      .map((group: any) => group.filters)
      .flat()
      .map((filter: any) => filter.id)
      .filter((fid: any) => {
        const includes = selectedFilters.includes(fid);
        if (fid !== id) return includes;
        return !includes;
      });
    onSelectFilters(newFilters);
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
          <div className={styles.titleContainer}>
            <div className={styles.title}>絞り込み</div>
            <div
              className={clsx(
                styles.itemContainer,
                styles.itemContainerSelected,
                styles.resetButton,
                (!!keyword || selectedFilters.length > 0) &&
                  styles.resetButtonShown
              )}
              onClick={() => {
                onSetKeyword("");
                onSelectFilters([]);
              }}
            >
              <div className={styles.itemTxt}>リセット</div>
            </div>
          </div>

          <input
            type="text"
            className={styles.searchBar}
            placeholder="キーワード"
            value={keyword}
            onChange={handleSearchKeyword}
          />
          {filterGroups.map((group: any) => (
            <Fragment key={group.id}>
              {group.name && (
                <div className={styles.groupTitle}>{group.name}</div>
              )}
              <div className={styles.groupView}>
                {group.filters.map((filter: any) => (
                  <div
                    key={filter.id}
                    className={clsx(
                      styles.itemContainer,
                      filter.usesSmallButton && styles.itemContainerSmall,
                      selectedFilters.includes(filter.id) &&
                        styles.itemContainerSelected
                    )}
                    style={{ backgroundColor: filter.color }}
                    onClick={() => {
                      handleSelectFilter(filter.id);
                    }}
                  >
                    {!!filter.img ? (
                      <img className={styles.itemImg} src={filter.img} alt="" />
                    ) : (
                      <div className={styles.itemTxt}>{filter.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </Fragment>
          ))}

          <div className={styles.titleContainer}>
            <div className={styles.title}>表示順</div>
          </div>

          <div className={styles.groupView}>
            {sorters.map((sorter: any) => (
              <div
                key={sorter.id}
                className={clsx(
                  styles.itemContainer,
                  sorter.usesSmallButton && styles.itemContainerSmall,
                  selectedSorter === sorter.id && styles.itemContainerSelected
                )}
                style={{ backgroundColor: sorter.color }}
                onClick={() => {
                  onSelectSorter(sorter.id);
                }}
              >
                {!!sorter.img ? (
                  <img className={styles.itemImg} src={sorter.img} alt="" />
                ) : (
                  <div className={styles.itemTxt}>{sorter.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
