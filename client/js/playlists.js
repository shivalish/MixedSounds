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
      renderCurrentPlaylist(data.names[0]);
    }
 
  } else {
    alert("error loading playlists");
  }

}

const renderPlaylists = (data) => {

  const playlists = document.getElementById("playlists");
  const shuffle = document.getElementById("shuffle");
  playlists.innerHTML = "";

  shuffle.addEventListener("click", () => renderCurrentShuffledPlaylist(data.names[0]));

  for (let i = 0; i < data.names.length; i++) {

    const column = document.createElement("div");
    column.className = "col-1";

    const square = document.createElement("div");
    square.className = "square";

    square.style.backgroundColor = "#BCE2E9";

    square.addEventListener("click", () => renderCurrentPlaylist(data.names[i]));

    column.appendChild(square);

    const title = document.createElement("div");
    title.className = "col-2";

    title.innerHTML = data.names[i];

    playlists.appendChild(column);
    playlists.appendChild(title);

  }

  renderaddtoplaylist(playlists);

  gridContainer.appendChild(playlists);

}

const renderaddtoplaylist = (playlists) => {

  const column = document.createElement("div");
  column.className = "col-1";

  const square = document.createElement("div");
  square.className = "square";

  square.style.backgroundColor = "#BCE2E9";

  column.appendChild(square);

  const title = document.createElement("div");
  title.className = "col-2";

  title.innerHTML = "Add a playlist";

  square.addEventListener("click", addPlaylist);

  playlists.appendChild(column);
  playlists.appendChild(title);

}

const addPlaylist = async () => {

  let name = prompt("Type in the name of the new playlist");

  if (name !== null || name.length > 0) {

    let res = await fetch(`http://localhost:3000/playlists/addplaylist/${name}/645a71afc005c22333f55a1b`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
    });
    const div = document.createElement('div');
    div.className = 'play-song';

    div.innerHTML = `<ul>Add a song</ul>`;
    document.getElementById("songs").appendChild(div);
  }

}


const renderCurrentPlaylist = async (playlistname) => {

  console.log(playlistname);

  //get playlist
  const res = await fetch(`http://localhost:3000/playlists/${playlistname}/645a71afc005c22333f55a1b`, {
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
    alert("Oh no there was trouble loading the playlist");
  }
}

const renderCurrentShuffledPlaylist = async (playlistname) => {

  console.log(playlistname);

  //get playlist
  const res = await fetch(`http://localhost:3000/playlists/${playlistname}/645a71afc005c22333f55a1b`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  const status = res.status;

  if (status == 200) {
    shufflePlaylist(data);
  } else {
    alert("Oh no there was trouble loading the playlist");
  }
}

const renderPlaylist = (data) => {

  const playlistinfo = document.getElementById("playlistinfo");
  const songs = document.getElementById("songs");
  const title = document.getElementById("playlist-title");

  songs.innerHTML = "";
  title.innerHTML = data.name;

  for (let i = 0; i < data.songs.length; i++) {

    const song = document.createElement("div");
    song.className = "song";

    const songtitle = document.createElement("h6");
    songtitle.innerText = data.songs[i].name + " - " + data.songs[i].album;

    song.appendChild(songtitle);

    songs.appendChild(song);

  }

  playlistinfo.appendChild(songs);


}

const shufflePlaylist = (data) => {
  const playlistinfo = document.getElementById("playlistinfo");
  const songs = document.getElementById("songs");
  const title = document.getElementById("playlist-title");

  songs.innerHTML = "";
  console.log(data.name);
  title.innerHTML = data.name;

  const shuffledSongs = [...data.songs];
  console.log(shuffledSongs);

  for (let i = shuffledSongs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
  }

  for (let i = 0; i < shuffledSongs.length; i++) {
    const song = document.createElement("div");
    song.className = "song";

    const songtitle = document.createElement("h6");
    songtitle.innerText = shuffledSongs[i].name + " - " + shuffledSongs[i].album;

    song.appendChild(songtitle);
    songs.appendChild(song);
  }

  playlistinfo.appendChild(songs);
};


renderPage();