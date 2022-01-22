import filterGroups from "./filterGroups";
import sorters from "./sorters";
import originalCharacters from "./characters.json";

const characters = originalCharacters.map((ch, key) => ({
  ...ch,
  id: key,
}));

function keywordMatcher(ch: any, keyword: string) {
  return ch.name.includes(keyword.trim());
}

export { keywordMatcher, filterGroups, sorters, characters };
