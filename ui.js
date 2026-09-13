function displaySongs(
    songs,
    selectedSongIndex
) {
    console.clear();

    console.log("=== NODE MUSIC PLAYER ===\n");

    if (songs.length === 0) {
        console.log("No songs found.");
        return;
    }

    songs.forEach((song, index) => {
        const prefix =
            index === selectedSongIndex
                ? ">"
                : " ";

        console.log(`${prefix} ${song}`);
    });

    console.log(
        `\nSelected: ${songs[selectedSongIndex]}`
    );

    console.log("\nControls:");
    console.log("↑ Move Up");
    console.log("↓ Move Down");
    console.log("Enter Play Song");
    console.log("S Stop Song");
    console.log("Q Quit");
}

module.exports = displaySongs;