const express = require("express");
const router = express.Router();

var client;

router.get("/login", (req, res) => {
    res.sendFile("./site/routes/html/login.html", { root: "." });
});

function init(client) {
    this.client = client;
};

module.exports = {
    init: init,
    router: router
};