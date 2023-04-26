const onestar = document.getElementById("1star");
const twostar = document.getElementById("2star");
const threestar = document.getElementById("3star");
const fourstar = document.getElementById("4star");
const fivestar = document.getElementById("5star");

const ratings = [onestar, twostar, threestar, fourstar, fivestar];

const selectRating = (event) => {

    console.log(window.getComputedStyle(event.currentTarget).getPropertyValue("opacity"));

    if (window.getComputedStyle(event.currentTarget).getPropertyValue("opacity") == 1 && ratingsclicked(event.target)) {

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
    ratings.forEach( (x) => { clicked = x == target ? true : x.style.opacity == 0.5; });
    return clicked;
}

onestar.addEventListener("click", selectRating);
twostar.addEventListener("click", selectRating);
threestar.addEventListener("click", selectRating);
fourstar.addEventListener("click", selectRating);
fivestar.addEventListener("click", selectRating);
