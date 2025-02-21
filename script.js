import { supabase } from "./assets/supabaseClient.js"; // Import Supabase credentials

let songs = []; // Store songs globally

// Fetch songs from Supabase and display them
async function fetchSongs() {
    let songList = document.getElementById("song-list");
    songList.innerHTML = "<li class='loading'>Loading songs...</li>";

    try {
        let { data, error } = await supabase
            .from("Tamil Songs")
            .select("id, title, file_url")
            .limit(20);

        if (error) throw new Error("⚠️ Database connection failed.");

        if (!data || data.length === 0) {
            songList.innerHTML = "<li style='color: gray;'>⚠️ No songs found.</li>";
            return;
        }

        songs = data; // Store songs in global variable
        displaySongs(songs);
    } catch (err) {
        console.error(err.message);
        songList.innerHTML = `<li style='color: red;'>${err.message}</li>`;
    }
}

// Display Songs in List
function displaySongs(songData, highlightSong = "") {
    const songList = document.getElementById("song-list");
    songList.innerHTML = "";  

    let searchedSong = songData.find(song => song.title.toLowerCase() === highlightSong.toLowerCase());

    if (searchedSong) {
        let searchedItem = createSongElement(searchedSong, true);
        songList.appendChild(searchedItem);
    }

    songData.forEach(song => {
        if (!searchedSong || song.id !== searchedSong.id) {
            let listItem = createSongElement(song, false);
            songList.appendChild(listItem);
        }
    });
}

// Create Song Element
function createSongElement(song, isHighlighted) {
    let listItem = document.createElement("li");
    listItem.classList.add("song-item");
    listItem.dataset.songUrl = song.file_url;
    listItem.textContent = song.title;

    if (isHighlighted) {
        listItem.classList.add("highlighted");
        listItem.innerHTML = `${song.title} 
            <button class="play-btn" onclick="playSong('${song.file_url}', '${song.title}')">▶ Play</button>`;
    } else {
        listItem.onclick = () => playSong(song.file_url, song.title);
    }

    return listItem;
}

// Play Song
function playSong(fileUrl, title) {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = fileUrl;
    audioPlayer.play().catch(err => console.error("Playback error:", err));
    document.getElementById("song-title").innerText = title;
}

// Search Songs and Show at the Top
function searchSongs() {
    const query = document.getElementById("search").value.toLowerCase();

    if (!query) {
        displaySongs(songs); // Show all songs if search is empty
        return;
    }

    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));

    if (filteredSongs.length > 0) {
        displaySongs(songs, filteredSongs[0].title); // Move searched song to the top
    } else {
        document.getElementById("song-list").innerHTML = "<li style='color: gray;'>⚠️ No songs found.</li>";
    }
}


function openPlaylist(playlistName) {
    window.location.href = `playlist.html?playlist=${encodeURIComponent(playlistName)}`;
}




// Attach search function to window to allow inline button click
window.searchSongs = searchSongs;
window.playSong = playSong;

// Load songs on page load
window.onload = fetchSongs;
