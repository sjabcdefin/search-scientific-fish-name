import enquirer from "enquirer";
import FishNameDictionary from "./fish_name_dictionary.js";

class FishNameApp {
  static #searchMethods = {
    EXACT: "完全一致",
    PREFIX: "前方一致",
    SUFFIX: "後方一致",
    PARTIAL: "部分一致",
  };

  #dictionary;

  constructor() {
    this.#dictionary = new FishNameDictionary();
  }

  async run() {
    try {
      const fishName = await this.#askFishName();
      const searchMethod = await this.#askSearchMethod();
      this.#dictionary.loadInputFile();
      console.log(this.#dictionary.loadedFishes[0]);

      switch (searchMethod) {
        case FishNameApp.#searchMethods.EXACT:
          console.log(
            `fishName: ${fishName}, searchMethod: ${FishNameApp.#searchMethods.EXACT}`
          );
          break;
        case FishNameApp.#searchMethods.PREFIX:
          console.log(
            `fishName: ${fishName}, searchMethod: ${FishNameApp.#searchMethods.PREFIX}`
          );
          break;
        case FishNameApp.#searchMethods.SUFFIX:
          console.log(
            `fishName: ${fishName}, searchMethod: ${FishNameApp.#searchMethods.SUFFIX}`
          );
          break;
        case FishNameApp.#searchMethods.PARTIAL:
          console.log(
            `fishName: ${fishName}, searchMethod: ${FishNameApp.#searchMethods.PARTIAL}`
          );
          break;
      }
    } catch (err) {
      console.error(`エラー：${err.message}`);
    }
  }

  async #cleanupAndExit() {
    console.log("\nCtrl+C was detected during operation.");
    process.exit(1);
  }

  async #askFishName() {
    try {
      const question = [
        {
          type: "input",
          name: "fishName",
          message: "検索したい魚の名前をカタカナで入力してください。：",
        },
      ];
      const response = await enquirer.prompt(question);
      return response.fishName ? response.fishName : undefined;
    } catch (err) {
      if (err === "") {
        await this.#cleanupAndExit();
      } else {
        throw err;
      }
    }
  }

  async #askSearchMethod() {
    try {
      const question = [
        {
          type: "select",
          name: "searchMethod",
          message: "検索方法を選択してください。：",
          choices: Object.values(FishNameApp.#searchMethods),
        },
      ];
      const answer = await enquirer.prompt(question);
      return answer.searchMethod;
    } catch (err) {
      if (err === "") {
        await this.#cleanupAndExit();
      } else {
        throw err;
      }
    }
  }
}

export default FishNameApp;
