import filterGroups from "./filterGroups";
import sorters from "./sorters";
import characters from "./characters.json";

function keywordMatcher(ch: any, keyword: string) {
  return ch.name.includes(keyword.trim());
}

export { keywordMatcher, filterGroups, sorters, characters };
