import fs from "fs";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import FishName from "./fish_name.js";

class FishNameSource {
  static #JAPANESE_NAME = "和名";
  static #SCIENTIFIC_NAME = "学名";

  loadInputFile(relativeFilePath) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const absoluteFilePath = join(__dirname, relativeFilePath);
    const fileContent = fs.readFileSync(absoluteFilePath);
    const decodedContent = iconv.decode(fileContent, "shift_jis");
    const loadedFishes = parse(decodedContent, { columns: true });
    return loadedFishes.map(
      (fish) =>
        new FishName(
          fish[FishNameSource.#JAPANESE_NAME],
          fish[FishNameSource.#SCIENTIFIC_NAME],
        ),
    );
  }
}

export default FishNameSource;
