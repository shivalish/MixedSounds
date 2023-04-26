const onestar = document.getElementById("1star");
const twostar = document.getElementById("2star");
const threestar = document.getElementById("3star");
const fourstar = document.getElementById("4star");
const fivestar = document.getElementById("5star");
const submit = document.getElementById("submit");

const genres = document.getElementById("genres");

const ratings = [onestar, twostar, threestar, fourstar, fivestar];

const selectRating = (event) => {

    console.log(window.getComputedStyle(event.currentTarget).getPropertyValue("opacity"));

    if (ratingsclicked(event.target)) {

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

const submitRating = () => {
    alert("submitted rating");
}

const selectGenre = (event) => {
    document.getElementById("selectedgenre").innerHTML = event.target.innerHTML;
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

initializeRatingSelection();
initializeGenreSelection();
submit.addEventListener("click", submitRating);
