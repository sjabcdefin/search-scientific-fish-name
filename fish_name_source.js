import fs from "fs";
import iconv from "iconv-lite";
import { parse } from "csv-parse/sync";

class FishNameSource {
  loadInputFile() {
    const readFile = "20250123_JAFList.csv";
    const csvFileContent = fs.readFileSync(readFile);
    const shiftJisDecodedContent = iconv.decode(csvFileContent, "shift_jis");
    return parse(shiftJisDecodedContent, { columns: true });
  }
}

export default FishNameSource;
