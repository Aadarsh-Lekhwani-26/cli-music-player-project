const fs = require("fs");
const path = require("path");

function loadSongs() {
    try {
        const songsFolder = path.join(__dirname, "songs");

        const files = fs.readdirSync(songsFolder);

        const songs = files.filter((file) =>
            file.toLowerCase().endsWith(".mp3")
        );

        return songs;
    } catch (error) {
        console.error("Error loading songs:", error.message);
        return [];
    }
}

module.exports = loadSongs;