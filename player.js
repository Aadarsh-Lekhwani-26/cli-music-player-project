const MPV = require("node-mpv");
const path = require("path");

let mpvPlayer = new MPV({
    audio_only: true,
});

mpvPlayer.on("started", () => {
    console.log("MPV STARTED");
});

mpvPlayer.on("stopped", () => {
    console.log("MPV STOPPED");
});


let currentSong = null;

async function playSong(songName) {
    try {
        const songPath = path.join(
            __dirname,
            "songs",
            songName
        );

        console.log("STOPPING OLD SONG...");
        await mpvPlayer.stop();

        console.log("LOADING:", songPath);

        await mpvPlayer.loadFile(songPath);

        currentSong = songName;

        console.log(`Now Playing: ${songName}`);

    } catch (error) {
        console.error(
            "Playback Error:",
            error.message
        );
    }
}

function getCurrentSong() {
    return currentSong;
}


async function stopSong() {
    try {
        await mpvPlayer.stop();

        currentSong = null;

        console.log("\nPlayback Stopped");
    } catch (error) {
        console.error(
            "Stop Error:",
            error.message
        );
    }
}

async function quitPlayer() {
    try {
        await mpvPlayer.stop();
        await mpvPlayer.quit();
    } catch (error) {
        console.error(error.message);
    }
}

async function pauseSong() {
    try {
        await mpvPlayer.pause();

        console.log("\nPlayback Paused");
    } catch (error) {
        console.error(
            "Pause Error:",
            error.message
        );
    }
}

async function resumeSong() {
    try {
        await mpvPlayer.resume();

        console.log("\nPlayback Resumed");
    } catch (error) {
        console.error(
            "Resume Error:",
            error.message
        );
    }
}

module.exports = {
    playSong,
    stopSong,
    pauseSong,
    resumeSong,
    quitPlayer,
    getCurrentSong,
};

