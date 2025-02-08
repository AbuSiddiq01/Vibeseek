const API_KEY = "AIzaSyDB8p9k_zUi_ad-fp4528Rsig9u9uOupTc";  // Replace with your API key

function searchSongs() {
    let query = document.getElementById("search").value + " Tamil song";
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let results = document.getElementById("results");
            results.innerHTML = "";  // Clear old results

            data.items.forEach(item => {
                let videoId = item.id.videoId;
                let title = item.snippet.title;

                let songDiv = document.createElement("div");
                songDiv.classList.add("song");
                songDiv.innerHTML = `<p>${title}</p>
                                     <button onclick="playSong('${videoId}')">Play</button>`;
                results.appendChild(songDiv);
            });
        })
        .catch(error => console.error("Error fetching YouTube data:", error));
}

function playSong(videoId) {
    let player = document.getElementById("player");
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
