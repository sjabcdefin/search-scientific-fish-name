import enquirer from "enquirer";
import FishNameDictionary from "./fish_name_dictionary.js";
import FishNameSource from "./fish_name_source.js";

class FishNameApp {
  static #searchMethods = {
    EXACT: "完全一致",
    PREFIX: "前方一致",
    SUFFIX: "後方一致",
    PARTIAL: "部分一致",
  };

  async run() {
    try {
      const fishName = await this.#askFishName();
      const searchMethod = await this.#askSearchMethod();
      const relativeFilePath = "../data/20250123_JAFList.csv";
      const loadedFishes = new FishNameSource().loadInputFile(relativeFilePath);
      const dictionary = new FishNameDictionary(loadedFishes);

      const strategies = {
        [FishNameApp.#searchMethods.EXACT]: () =>
          dictionary.searchExactMatch(fishName),
        [FishNameApp.#searchMethods.PREFIX]: () =>
          dictionary.searchPrefixMatch(fishName),
        [FishNameApp.#searchMethods.SUFFIX]: () =>
          dictionary.searchSuffixMatch(fishName),
        [FishNameApp.#searchMethods.PARTIAL]: () =>
          dictionary.searchPartialMatch(fishName),
      };
      const searchResults = strategies[searchMethod]();
      this.#displayFishNames(searchResults);
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

  #displayFishNames(searchResults) {
    const maxDisplayCount = 30;
    const totalResultCount = searchResults.length;
    console.log(`\n検索結果: ${totalResultCount}件`);
    searchResults.slice(0, maxDisplayCount).forEach((searchResult, index) => {
      console.log(
        `\n${index + 1}. ${searchResult.japaneseName}\n  - 学名: ${searchResult.scientificName}`,
      );
    });
    if (totalResultCount > maxDisplayCount) {
      console.log(
        `\n検索結果が ${totalResultCount} 件見つかりました。そのうち、最初の ${maxDisplayCount} 件を表示しています。\nより詳細な検索結果を得るには、もう少し具体的な魚名を入力してください。`,
      );
    }
  }
}

export default FishNameApp;
