const historycontainer = document.getElementById("historyContainer");

const render = () => {

    //change this
    //const data = await fetch ("http://localhost:3000/history/645a71afc005c22333f55a1b");

    const data = [
        {
            "song": {
                "_id": "645e8e9bc8e960d164c0d322",
                "name": "Be Happy",
                "artists": [
                    "Dixie"
                ],
                "album": "a letter to me",
                "genre": "pop"
            },
            "rating": {
                "_id": "645e8e9bc8e960d164c0d322",
                "rating": "3",
                "comment": "Be Happy was ok."
            }
        },
        {
            "song": {
                "_id": "645ef8d707b58d720c854aea",
                "name": "Mrs. Clean",
                "artists": [
                    "Amine"
                ],
                "album": "Limbo (Deluxe)",
                "genre": "rap"
            },
            "rating": {
                "_id": "645ef8d707b58d720c854aeb",
                "rating": 5,
                "comment": "Mrs. Clean is a great song"
            }
        }
    ];

    for (let i = 0; i < data.length; i++) {

        const songEntry = document.createElement("div");
        const info = document.createElement("div");
        const title = document.createElement("div");
        const artist = document.createElement("div");
        const album = document.createElement("div");
        const genre = document.createElement("div");
        

        songEntry.className = "songEntry";
        info.className = "info";
        title.className = "title";
        artist.className = "artist";
        album.className = "album";
        genre.className = "genre";

        title.innerHTML = data[i].song.name;

        let artists = "";

        data[i].song.artists.forEach((x) => artists += x + ", " );

        artist.innerHTML = artists.substring(0, artists.length - 2);
        album.innerHTML = data[i].song.album;
        genre.innerHTML = data[i].song.genre.toUpperCase();

        info.appendChild(title);
        info.appendChild(artist);
        info.appendChild(album);
        info.appendChild(genre);

        songEntry.appendChild(info);
        songEntry.appendChild(ratingdiv(data[i].rating.rating));
        songEntry.appendChild(comment(data[i].rating.comment));

        historycontainer.appendChild(songEntry);

        console.log(songEntry.innerHTML)

    }

}

const comment = (input) => {

    const comment = document.createElement("div");
    const rating = document.createElement("div");
    const title = document.createElement("h6");

    comment.className = "comment";
    rating.className = "rating";

    title.innerHTML = "Comment";
    rating.innerHTML = input;

    comment.appendChild(title);
    comment.appendChild(rating);

    return comment;

}

const ratingdiv = (number) => {

    const rating = document.createElement("div");
    const title = document.createElement("h6");
    const ratings = document.createElement("div");

    rating.className = "rating";
    title.innerText = "Rating";

    for (let i = 1; i <= 5; i++) {

        const img = document.createElement("img");

        img.src = "images/" + i + "star.png";

        if (number == i) {
            img.className = "selected";
        }

        ratings.appendChild(img);

    }

    rating.appendChild(title);
    rating.appendChild(ratings);
    
    return rating;

}


render();