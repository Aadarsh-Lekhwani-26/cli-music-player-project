const mm = require("music-metadata");
const MPV = require("node-mpv");
const path = require("path");

let currentDuration = 0;
let currentPosition = 0;
let progressTimer = null;

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

        // Stop old song
        await mpvPlayer.stop();

        // Clear old timer
        clearInterval(progressTimer);
        progressTimer = null;

        // Get duration
        const metadata =
            await mm.parseFile(songPath);

        currentDuration =
            metadata.format.duration || 0;

        currentPosition = 0;

        // Play song
        await mpvPlayer.loadFile(songPath);

        currentSong = songName;

        console.log(`Now Playing: ${songName}`);

        console.log(
            `Duration: ${formatTime(currentDuration)}`
        );

        // Start progress timer
        progressTimer = setInterval(() => {

            currentPosition++;

            process.stdout.write(
                `\rProgress: ${formatTime(
                    currentPosition
                )} / ${formatTime(
                    currentDuration
                )}`
            );

        }, 1000);

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

        clearInterval(progressTimer);
        progressTimer = null;

        currentPosition = 0;

        await mpvPlayer.stop();

        currentSong = null;

        console.log(
            "\nPlayback Stopped"
        );

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

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs
        .toString()
        .padStart(2, "0")}`;
}

function getProgressBar() {
    if (!currentDuration) {
        return "";
    }

    const totalBars = 20;

    const filledBars = Math.floor(
        (currentPosition / currentDuration)
        * totalBars
    );

    return `[${"#".repeat(filledBars)}${"-".repeat(
        totalBars - filledBars
    )}] ${formatTime(currentPosition)} / ${formatTime(currentDuration)}`;
}

module.exports = {
    playSong,
    stopSong,
    pauseSong,
    resumeSong,
    quitPlayer,
    getCurrentSong,
};

