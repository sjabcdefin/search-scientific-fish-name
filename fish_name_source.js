import fs from "fs";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";
import FishName from "./fish_name.js";

class FishNameSource {
  static #JAPANESE_NAME = "和名";
  static #SCIENTIFIC_NAME = "学名";

  loadInputFile() {
    const readFile = "20250123_JAFList.csv";
    const csvFileContent = fs.readFileSync(readFile);
    const shiftJisDecodedContent = iconv.decode(csvFileContent, "shift_jis");
    const parsedContent = parse(shiftJisDecodedContent, { columns: true });
    return parsedContent.map(
      (fish) =>
        new FishName(
          fish[FishNameSource.#JAPANESE_NAME],
          fish[FishNameSource.#SCIENTIFIC_NAME]
        )
    );
  }
}

export default FishNameSource;
