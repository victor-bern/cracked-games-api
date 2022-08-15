import cheerio from "cheerio";
import Game from "../models/Game";

const loadData = (html: string) => {
  const $ = cheerio.load(html);
  const games: Game[] = [];
  const searchTable = $("#tbody_games > tr");
  searchTable.each(function () {
    const name = getName($(this));
    const status = getGameSatus($(this));
    const image = getImage($(this));
    const game: Game = {
      image,
      status,
      name,
    };
    games.push(game);
  });
  return games;
};

const getImage = (table: cheerio.Cheerio) => {
  const image = table
    .find(".border_unreleased, .border_cracked, .border_uncracked")
    .attr("data-src")!;
  return image;
};

const getName = (table: cheerio.Cheerio) => {
  const name = table.find(".text-white").text();
  return name;
};

const getGameSatus = (table: cheerio.Cheerio) => {
  const status = table
    .find(".cracked-text, .not-cracked-text, .unreleased-text")
    .text();
  return status;
};

export { loadData };
