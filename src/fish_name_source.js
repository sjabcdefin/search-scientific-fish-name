import fs from "fs";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import FishName from "./fish_name.js";

class FishNameSource {
  static #JAPANESE_NAME = "和名";
  static #SCIENTIFIC_NAME = "学名";

  loadInputFile() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const csvFilePath = join(__dirname, "../data/20250123_JAFList.csv");
    const fileContent = fs.readFileSync(csvFilePath);
    const decodedContent = iconv.decode(fileContent, "shift_jis");
    const loadedFishes = parse(decodedContent, { columns: true });
    return loadedFishes.map(
      (fish) =>
        new FishName(
          fish[FishNameSource.#JAPANESE_NAME],
          fish[FishNameSource.#SCIENTIFIC_NAME]
        )
    );
  }
}

export default FishNameSource;
