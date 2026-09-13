const loadSongs = require("./songLoader");
const displaySongs = require("./ui");

const songs = loadSongs();

let selectedSongIndex = 0;

displaySongs(songs, selectedSongIndex);