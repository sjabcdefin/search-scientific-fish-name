class FishName {
  #japaneseName;
  #scientificName;

  constructor(japaneseName, scientificName) {
    this.japaneseName = japaneseName;
    this.scientificName = scientificName;
  }

  get japaneseName() {
    return this.#japaneseName;
  }

  get scientificName() {
    return this.#scientificName;
  }

  set japaneseName(name) {
    this.#japaneseName = name;
  }

  set scientificName(name) {
    this.#scientificName = name;
  }
}

export default FishName;
