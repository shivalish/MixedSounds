async function getSongs() {
    const response = await fetch('../server/data.json');
    const data = await response.json();
    document.getElementById("songs").innerHTML = "";
    Object.values(data).forEach(name => {
        const div = document.createElement('div');
        div.className = 'play-song';
  
        div.innerHTML = `
          <ul>${name.name} - ${name.artists}</ul>
        `;

        document.getElementById("songs").appendChild(div);
    });
    const div = document.createElement('div');
    div.className = 'play-song';

    div.innerHTML = `<ul>Add a song</ul>`;
    document.getElementById("songs").appendChild(div);
  }

  document.getElementById("playlist1").addEventListener('click',getSongs);
  document.getElementById("playlist2").addEventListener('click',getSongs);
//   document.getElementById("songs").addEventListener(onclick,)