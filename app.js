const loadSongs = require("./songLoader");
const displaySongs = require("./ui");
const {
    playSong,
    stopSong,
    pauseSong,
    resumeSong,
    quitPlayer,
} = require("./player");

const songs = loadSongs();

let selectedSongIndex = 0;

displaySongs(songs, selectedSongIndex);

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", async (key) => {
    if (songs.length === 0) {
        return;
    }

    let shouldRedraw = false;

    switch (key) {
        case "\u001b[A": // Up Arrow

            if (selectedSongIndex > 0) {
                selectedSongIndex--;
                shouldRedraw = true;
            }

            break;

        case "\u001b[B": // Down Arrow

            if (selectedSongIndex < songs.length - 1) {
                selectedSongIndex++;
                shouldRedraw = true;
            }

            break;

        case "\r": // Enter

            await playSong(
                songs[selectedSongIndex]
            );

            break;

        case "p":
case "P":
    await pauseSong();
    break;

case "r":
case "R":
    await resumeSong();
    break;    

        case "s":
        case "S":

            await stopSong();

            break;

case "q":
case "Q":

    await quitPlayer();

    console.clear();
    process.exit();

    break;

        default:
            return;
    }

    if (shouldRedraw) {
        displaySongs(
            songs,
            selectedSongIndex
        );
    }
});