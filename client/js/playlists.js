const gridContainer = document.getElementById("gridContainer");

const renderPlaylists = async () => {

  const playlists = document.createElement("div");
  playlists.className = "playlists";

  //get playlist names
  const res = await fetch('http://localhost:3000/playlists/playlistnames/?id=645a71afc005c22333f55a1b', {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  const status = res.status;

  console.log(data);

  if (status === 200) {

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

  } else {
    alert("error loading playlists");
  }

}

const renderCurrentPlaylist = (playlistname) => {

  //get playlist

}

renderPlaylists();