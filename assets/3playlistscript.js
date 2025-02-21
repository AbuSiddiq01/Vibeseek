import { supabase } from "./supabaseClient.js"; // Ensure correct import path

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistName = urlParams.get("playlist");

    document.getElementById("playlist-title").innerText = playlistName;

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const playlistListBox = document.getElementById("playlist-list-box");
    const audioPlayer = document.getElementById("audio-player");

    let allSongs = []; // Store all songs initially
    let filteredSong = null; // Track searched song

    // ✅ Fetch Songs from Supabase Table
    const { data, error } = await supabase.from(playlistName).select("id, title, file_url");

    if (error) {
        console.error("Error fetching songs:", error);
        return;
    }

    console.log("Fetched Songs:", data); // ✅ Debugging: Check fetched data

    allSongs = data; // Store songs in array
    displaySongs(allSongs);

    // ✅ Display Songs in the List
    function displaySongs(songs) {
        playlistListBox.innerHTML = ""; // Clear previous list

        songs.forEach(song => {
            let songName = song.title || "Unknown Song"; // ✅ Ensure correct song name
            let songUrl = song.file_url || "#"; // ✅ Ensure correct URL

            let li = document.createElement("li");
            li.innerHTML = `<span>${songName}</span>`;
            li.setAttribute("data-url", songUrl);
            li.addEventListener("click", () => playSong(songUrl)); // Play when clicked

            // Highlight searched song
            if (filteredSong && songName.toLowerCase() === filteredSong.toLowerCase()) {
                li.style.background = "red";
                li.style.color = "white";

                // Enable play button only for searched song
                const playButton = document.createElement("button");
                playButton.textContent = "▶ Play";
                playButton.addEventListener("click", () => playSong(songUrl));
                li.appendChild(playButton);
            }

            playlistListBox.appendChild(li);
        });
    }

    // ✅ Play Song Function
    function playSong(songUrl) {
        console.log("Trying to play:", songUrl); // ✅ Debugging

        if (!songUrl || songUrl === "undefined") {
            alert("Error: No valid song URL found!");
            return;
        }

        // ✅ Check if the file URL is valid before playing
        fetch(songUrl, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    console.log("Valid audio URL:", songUrl);
                    audioPlayer.src = songUrl;
                    audioPlayer.load();
                    audioPlayer.play().catch(error => console.error("Audio playback error:", error));
                } else {
                    console.error("Invalid audio URL:", songUrl);
                    alert("Error: Invalid audio URL!");
                }
            })
            .catch(error => console.error("Error checking URL:", error));
    }

    // ✅ Search Functionality
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            filteredSong = null;
            displaySongs(allSongs); // Show full list if search is empty
        } else {
            filteredSong = query;
            const searchedSong = allSongs.find(song => song.title.toLowerCase().includes(query));

            if (searchedSong) {
                displaySongs([searchedSong]); // Show only searched song
            } else {
                playlistListBox.innerHTML = "<li>No song found</li>";
            }
        }
    });

    // ✅ Make `goBack` globally accessible
    window.goBack = function () {
        window.location.href = "index.html";
    };
});
