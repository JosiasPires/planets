import { solarSystem } from "../data/solar-system.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const lastYear = new Date();
lastYear.setFullYear(lastYear.getUTCFullYear() - 1);

const startDate = lastYear.toISOString();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.API_KEY;
const news = {};

for (let i = 0; i < solarSystem.length; i++) {
  const { name } = solarSystem[i];

  console.log(
    `${i + 1}/${solarSystem.length} - Fetching news about ${name}...`,
  );

  const res = await fetch(
    `https://api.currentsapi.services/v1/search?category=space&domain=space.com&page_size=3&start_date=${startDate}&keywords=${name}&apiKey=${API_KEY}`,
  );

  const data = await res.json();
  news[name] = data.news;
}

const filePath = path.join(__dirname, "../data/news.json");

console.log("Writing responses to news.json file...");
await fs.writeFile(filePath, JSON.stringify(news));
console.log("Done");
