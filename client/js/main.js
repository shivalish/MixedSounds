const onestar = document.getElementById("1star");
const twostar = document.getElementById("2star");
const threestar = document.getElementById("3star");
const fourstar = document.getElementById("4star");
const fivestar = document.getElementById("5star");
const submit = document.getElementById("submit");

const genres = document.getElementById("genres");

const ratings = [onestar, twostar, threestar, fourstar, fivestar];

//CHANGE THIS to be able to generate random song every time
const song =
    {
        "name": "Trance (with Travis Scott & Young Thug)",
        "artists": ["Metro Boomin", "Travis Scott", "Young Thug"],
        "album": "HEROES & VILLAINS",
        "genre": "hip-hop/rap"
    };

let rating = 0;

const selectRating = (event) => {

    console.log(window.getComputedStyle(event.currentTarget).getPropertyValue("opacity"));

    if (ratingsclicked(event.target)) {

        rating = 0;

        for (let i = 0; i < ratings.length; i++) {
            const smileyface = ratings[i];
            smileyface.style.opacity = "100%";
        }

    } else {

        for (let i = 0; i < ratings.length; i++) {
            const smileyface = ratings[i];
            if (smileyface.id !== event.target.id) {
                smileyface.style.opacity = "50%";
            } else {
                smileyface.style.opacity = "100%";
                rating = i + 1;
                console.log(rating);
            }
        }
    }
}

const ratingsclicked = (target) => {
    let clicked = true;
    ratings.forEach( (x) => { clicked = x === target ? clicked : x.style.opacity == 0.5; });
    console.log(clicked);
    return clicked;
}

const selectGenre = (event) => {
    document.getElementById("selectedGenre").innerHTML = event.target.innerHTML;
}

const initializeRatingSelection = () => {

    for (let i = 0; i < ratings.length; i++) {
        ratings[i].addEventListener("mouseover", (event) => event.target.style.opacity = 0.7);
        ratings[i].addEventListener("mouseout", (event) => event.target.style.opacity = 1);
        ratings[i].addEventListener("click", selectRating);
    }

}

const initializeGenreSelection = () => {

    var genre = document.getElementById('genres').getElementsByClassName('genre');

    for (let i = 0; i < genre.length; i++) {
        genre[i].addEventListener("click", selectGenre);
    }
}

const submitRating = async () => {

    if (rating == 0) {
        alert("select a rating!");
    } else {

        const comment = document.getElementById("comment").value;

        //change to get user id
        const response = await fetch(`/home/submit/645a71afc005c22333f55a1b`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "song": song,
                "rating": {
                    "rating": rating,
                    "comment": comment
                }
            })
        })

        const stat = response.status;

        if (stat !== 400) {
            alert("submitted rating");
        } else {
            alert("woops it didn't work");
        }

    }

}

const initializePlaylistSelection = async () => {

    const dropdown = document.getElementById("playlists_dropdown");
    dropdown.innerHTML = "";

    const res = await fetch('http://localhost:3000/playlists/playlistnames/?id=645a71afc005c22333f55a1b', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
      });
    
      const data = await res.json();
      const status = res.status;

      if (status == 200) {

        for (let i = 0; i < data.names.length; i++) {

            const link = document.createElement("a");

            link.class = "playlist";
            link.innerHTML = data.names[i];
            link.addEventListener("click", addSongtoPlaylist);

            dropdown.appendChild(link);
        }

      }
    
    dropdown.style.display = "block";

}

const addSongtoPlaylist = async (event) => {

    const playlistname = String(event.target.textContent);

    console.log(playlistname);

    //currrently adds the song mystery lady to database
    let res = await fetch(`http://localhost:3000/home/addsong/${playlistname}/645a71afc005c22333f55a1b`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "song_id": "645a71ddc005c22333f55a1c"
        })
    });

    const status = res.status;

    console.log(status);

    if (status == 200) {
        alert("added: " + song.name + " to " + playlistname + ". It's really mystery lady though right now");
    } else {
        alert("woops that did not work");
    }

    document.getElementById("playlists_dropdown").style.display = "none";

}

initializeRatingSelection();
initializeGenreSelection();
submit.addEventListener("click", submitRating);

const add = document.getElementById("addicon");
add.addEventListener("click", initializePlaylistSelection);
