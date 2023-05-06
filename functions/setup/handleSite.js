const fs = require("fs");
const express = require("express");
const app = express();

module.exports = (client) => {
  client.handleSite = async () => {
    const siteFolders = fs.readdirSync("./site");
    for (const folder of siteFolders) {
      const siteFiles = fs
        .readdirSync(`./site/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "routes":
            for (const file of siteFiles) {
                const route = require(`../../site/${folder}/${file}`);
                route.init(client);
                app.use(`/`, route.router);
            }
            break;
        case "static":
          app.use("/assets",express.static(`./site/${folder}`));
        default:
          break;
      }
    }
    app.listen(3000, () => {
        console.log(`Site is running on port 3000`);
    });
  };
};
