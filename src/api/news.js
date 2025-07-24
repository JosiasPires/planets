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

async function fetchNews(topic) {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(
      `https://api.currentsapi.services/v1/search?category=space&domain=space.com&page_size=3&start_date=${startDate}&keywords=${topic}&apiKey=${API_KEY}`,
    );
    const data = await response.json();

    if (data.status !== "500") {
      console.log("News fetched successfully!");
      return data.news;
    } else {
      console.log("error, trying again");
    }
    await new Promise((res) => setTimeout(res, 2000));
  }
  console.log(`failed to fetch news about ${topic}`);
  return {}
}

for (let i = 0; i < solarSystem.length; i++) {
  const { name } = solarSystem[i];

  console.log(
    `${i + 1}/${solarSystem.length} - Fetching news about ${name}...`,
  );

  news[name] = await fetchNews(name);
}

const filePath = path.join(__dirname, "../data/news.json");

console.log("Writing responses to news.json file...");
await fs.writeFile(filePath, JSON.stringify(news));
console.log("Done");
