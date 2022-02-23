const express = require("express");
const path = require("path");

const getTranslatedServer = (lang) => {
  const distFolder = path.join(process.cwd(), `dist/personal-website/server/${lang}`);
  const server = require(`${distFolder}/main.js`);
  return server.app(lang);
};

function run() {
  const port = process.env.PORT || 4200;

  const appPL = getTranslatedServer("pl");
  const appDE = getTranslatedServer("de");
  const appEN = getTranslatedServer("en");

  const server = express();
  server.use("/pl", appPL);
  server.use("/de", appDE);
  server.use("/en", appEN);
  server.use("", appEN);

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();