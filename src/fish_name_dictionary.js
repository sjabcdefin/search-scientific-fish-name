class FishNameDictionary {
  #loadedFishes;

  constructor(loadedFishes) {
    this.loadedFishes = loadedFishes;
  }

  get loadedFishes() {
    return this.#loadedFishes;
  }

  set loadedFishes(loadedFishes) {
    this.#loadedFishes = loadedFishes;
  }

  searchExactMatch(fishName) {
    return this.loadedFishes.filter((fish) => fish.japaneseName === fishName);
  }

  searchPrefixMatch(fishName) {
    return this.loadedFishes.filter((fish) =>
      fish.japaneseName.startsWith(fishName),
    );
  }

  searchSuffixMatch(fishName) {
    return this.loadedFishes.filter((fish) =>
      fish.japaneseName.endsWith(fishName),
    );
  }

  searchPartialMatch(fishName) {
    return this.loadedFishes.filter((fish) =>
      fish.japaneseName.includes(fishName),
    );
  }
}

export default FishNameDictionary;
