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

  findExactMatch(fishName) {
    return this.loadedFishes.filter((fish) => fish.japaneseName === fishName);
  }

  findPrefixMatch(fishName) {
    return this.loadedFishes.filter((fish) =>
      fish.japaneseName.startsWith(fishName),
    );
  }

  findSuffixMatch(fishName) {
    return this.loadedFishes.filter((fish) =>
      fish.japaneseName.endsWith(fishName),
    );
  }

  findPartialMatch(fishName) {
    return this.loadedFishes.filter((fish) =>
      fish.japaneseName.includes(fishName),
    );
  }
}

export default FishNameDictionary;
