import fs from "fs";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";
import FishName from "./fish_name.js";

class FishNameDictionary {
  static #JAPANESE_NAME = "和名";
  static #SCIENTIFIC_NAME = "学名";

  #loadedFishes;
  #matchedFishes;

  constructor() {
    this.loadedFishes = [];
    this.matchedFishes = [];
  }

  get loadedFishes() {
    return this.#loadedFishes;
  }

  get matchedFishes() {
    return this.#matchedFishes;
  }

  set loadedFishes(record) {
    this.#loadedFishes = record;
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

  loadInputFile() {
    const readFile = "20250123_JAFList.csv";
    const csvFileContent = fs.readFileSync(readFile);
    const shiftJisDecodedContent = iconv.decode(csvFileContent, "shift_jis");
    this.loadedFishes = parse(shiftJisDecodedContent, { columns: true });
  }

  findExactMatch(fishName) {
    this.matchedFishes = this.loadedFishes.filter(
      (fish) => fish[FishNameDictionary.#JAPANESE_NAME] === fishName
    );
  }

  findPrefixMatch(fishName) {
    this.matchedFishes = this.loadedFishes.filter((fish) =>
      fish[FishNameDictionary.#JAPANESE_NAME].startsWith(fishName)
    );
  }

  findSuffixMatch(fishName) {
    this.matchedFishes = this.loadedFishes.filter((fish) =>
      fish[FishNameDictionary.#JAPANESE_NAME].endsWith(fishName)
    );
  }

  findPartialMatch(fishName) {
    this.matchedFishes = this.loadedFishes.filter((fish) =>
      fish[FishNameDictionary.#JAPANESE_NAME].includes(fishName)
    );
  }
}

export default FishNameDictionary;
