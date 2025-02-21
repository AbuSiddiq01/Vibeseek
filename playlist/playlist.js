document.addEventListener('DOMContentLoaded', function () {
    // Array to store playlists and songs
    let playlists = [];

    // Function to create a new playlist
    function createPlaylist() {
        const playlistName = prompt('Enter Playlist Name:');
        if (playlistName) {
            const newPlaylist = {
                name: playlistName,
                songs: []  // Empty array to store songs for this playlist
            };
            playlists.push(newPlaylist);
            alert('Playlist Created!');
            updatePlaylistList();
        }
    }

    // Function to update the playlist list dynamically
    function updatePlaylistList() {
        const playlistListElement = document.getElementById('playlist-list');
        
        if (!playlistListElement) {
            console.error('Playlist list container not found');
            return;
        }

        const ulElement = playlistListElement.getElementsByTagName('ul')[0];
        if (!ulElement) {
            console.error('UL element not found inside playlist list');
            return;
        }

        console.log('Updating playlist list...'); // Debugging log

        ulElement.innerHTML = ''; // Clear the list

        playlists.forEach((playlist, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = playlist.name;
            listItem.onclick = () => viewPlaylist(index);
            ulElement.appendChild(listItem);
        });
    }

    // Function to select a playlist and view its songs
    function viewPlaylist(playlistIndex) {
        const playlist = playlists[playlistIndex];
        const songList = playlist.songs.join(', ') || 'No songs added yet';
        alert(`Playlist: ${playlist.name}\nSongs: ${songList}`);
    }

    // Function to add songs to a playlist
    function addSong() {
        const playlistNames = playlists.map((playlist, index) => `${index + 1}. ${playlist.name}`).join("\n");
        const playlistIndex = prompt(`Select a Playlist by number:\n${playlistNames}`);
        if (playlistIndex) {
            const selectedPlaylist = playlists[playlistIndex - 1];
            if (selectedPlaylist) {
                const songName = prompt('Enter Song Name to Add:');
                if (songName) {
                    selectedPlaylist.songs.push(songName);
                    alert(`Song "${songName}" added to ${selectedPlaylist.name}`);
                    updatePlaylistList(); // Update the list of playlists after adding a song
                }
            } else {
                alert('Invalid selection');
            }
        }
    }

    // Update the playlist list on initial page load
    updatePlaylistList();

    // Expose functions to the global scope for HTML to call
    window.createPlaylist = createPlaylist;
    window.addSong = addSong;
    window.viewPlaylist = viewPlaylist;
});
