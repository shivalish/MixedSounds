const gridContainer = document.getElementById("gridContainer");

const renderPage = async () => {

  //get playlist names
  const res = await fetch('http://localhost:3000/playlists/playlistnames/?id=645a71afc005c22333f55a1b', {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  const status = res.status;

  if (status === 200) {

    if (data.names.length > 0) {
      renderPlaylists(data);
      renderCurrentPlaylist(data[0]);
    }
 
  } else {
    alert("error loading playlists");
  }

}

const renderPlaylists = (data) => {

  const playlists = document.createElement("div");
  playlists.className = "playlists";

  for (let i = 0; i < data.names.length; i++) {

    const column = document.createElement("div");
    column.className = "col-1";

    const square = document.createElement("div");
    square.className = "square";

    square.style.backgroundColor = "#BCE2E9";

    column.appendChild(square);

    const title = document.createElement("div");
    title.className = "col-2";

    title.innerHTML = data.names[i];

    playlists.appendChild(column);
    playlists.appendChild(title);

  }

  gridContainer.appendChild(playlists);

}

const renderCurrentPlaylist = async (playlistname) => {

  //get playlist
  const res = await fetch('http://localhost:3000/playlists/playlist1/645a71afc005c22333f55a1b', {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  const status = res.status;

  if (status == 200) {
    renderPlaylist(data);
  } else {
    alert("Oh no there was no trouble");
  }
}

const renderPlaylist = (data) => {

  const playlistinfo = document.getElementById("playlistinfo");
  const title = document.getElementById("playlist-title");

  title.innerHTML = data.name;

  for (let i = 0; i < data.songs.length; i++) {

    const song = document.createElement("div");
    song.className = "song";

    const songtitle = document.createElement("h6");
    songtitle.innerText = data.songs[i].name + " - " + data.songs[i].album;

    song.appendChild(songtitle);

    playlistinfo.appendChild(song);

  }

}

renderPage();