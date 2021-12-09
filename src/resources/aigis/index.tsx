import filterGroups from "./filterGroups";
import sorters from "./sorters";
import originalCharacters from "./characters.json";

const characters = originalCharacters.map((ch, key) => ({
  ...ch,
  id: key,
}));

export { filterGroups, sorters, characters };
