function displaySongs(songs, selectedSongIndex) {
    console.clear();

    console.log("=== NODE MUSIC PLAYER ===\n");

    if (songs.length === 0) {
        console.log("No songs found.");
        return;
    }

    songs.forEach((song, index) => {
        const prefix = index === selectedSongIndex ? ">" : " ";

        console.log(`${prefix} ${song}`);
    });

    console.log("\nSelected Song:");
    console.log(songs[selectedSongIndex]);
}

module.exports = displaySongs;