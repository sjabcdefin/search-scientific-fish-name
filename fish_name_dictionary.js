import fs from "fs";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";

class FishNameDictionary {
  #loadedFishes;

  constructor() {
    this.loadedFishes = [];
  }

  get loadedFishes() {
    return this.#loadedFishes;
  }

  set loadedFishes(record) {
    this.#loadedFishes = record;
  }

  loadInputFile() {
    const readFile = "20250123_JAFList.csv";
    const csvFileContent = fs.readFileSync(readFile);
    const shiftJisDecodedContent = iconv.decode(csvFileContent, "shift_jis");
    this.loadedFishes = parse(shiftJisDecodedContent, { columns: true });
  }
}

export default FishNameDictionary;
