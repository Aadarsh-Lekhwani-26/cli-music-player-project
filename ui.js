function displaySongs(songs) {
    console.log("\n=== SONG LIST ===\n");

    if (songs.length === 0) {
        console.log("No songs found.");
        return;
    }

    songs.forEach((song, index) => {
        console.log(`${index + 1}. ${song}`);
    });

    console.log();
}

module.exports = displaySongs;