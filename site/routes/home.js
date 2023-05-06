const express = require("express");
const router = express.Router();

var client;

router.get("/", (req, res) => {
    res.sendFile("./site/routes/html/home.html", { root: "." });
});

function init(client) {
    this.client = client;
};

module.exports = {
    init: init,
    router: router
};