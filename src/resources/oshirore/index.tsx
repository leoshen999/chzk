import filterGroups from "./filterGroups";
import sorters from "./sorters";
import charactersNormal from "./characters.json";
import charactersSpecial from "./characters_special.json";

function keywordMatcher(ch: any, keyword: string) {
  return ch.name.includes(keyword.trim());
}

const characters = charactersNormal.concat(charactersSpecial);

export { keywordMatcher, filterGroups, sorters, characters };
