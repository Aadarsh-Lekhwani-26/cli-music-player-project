const loadSongs = require("./songLoader");
const displaySongs = require("./ui");

const songs = loadSongs();

let selectedSongIndex = 0;

displaySongs(songs, selectedSongIndex);

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (key) => {
    if (songs.length === 0) {
        return;
    }

    switch (key) {
        case "\u001b[A": // Up Arrow

            if (selectedSongIndex > 0) {
                selectedSongIndex--;
            }

            break;

        case "\u001b[B": // Down Arrow

            if (selectedSongIndex < songs.length - 1) {
                selectedSongIndex++;
            }

            break;

        case "q":

            console.clear();
            process.exit();

        default:
            return;
    }

    displaySongs(songs, selectedSongIndex);
});