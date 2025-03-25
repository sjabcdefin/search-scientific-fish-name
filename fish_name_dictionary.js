import FishName from "./fish_name.js";

class FishNameDictionary {
  static #JAPANESE_NAME = "和名";
  static #SCIENTIFIC_NAME = "学名";

  #matchedFishes;

  constructor() {
    this.matchedFishes = [];
  }

  get matchedFishes() {
    return this.#matchedFishes;
  }

  set matchedFishes(results) {
    this.#matchedFishes = results.map(
      (result) =>
        new FishName(
          result[FishNameDictionary.#JAPANESE_NAME],
          result[FishNameDictionary.#SCIENTIFIC_NAME]
        )
    );
  }

  findExactMatch(loadedFishes, fishName) {
    this.matchedFishes = loadedFishes.filter(
      (fish) => fish[FishNameDictionary.#JAPANESE_NAME] === fishName
    );
  }

  findPrefixMatch(loadedFishes, fishName) {
    this.matchedFishes = loadedFishes.filter((fish) =>
      fish[FishNameDictionary.#JAPANESE_NAME].startsWith(fishName)
    );
  }

  findSuffixMatch(loadedFishes, fishName) {
    this.matchedFishes = loadedFishes.filter((fish) =>
      fish[FishNameDictionary.#JAPANESE_NAME].endsWith(fishName)
    );
  }

  findPartialMatch(loadedFishes, fishName) {
    this.matchedFishes = loadedFishes.filter((fish) =>
      fish[FishNameDictionary.#JAPANESE_NAME].includes(fishName)
    );
  }
}

export default FishNameDictionary;
