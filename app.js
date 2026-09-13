const loadSongs = require("./songLoader");
const displaySongs = require("./ui");

const songs = loadSongs();

displaySongs(songs);