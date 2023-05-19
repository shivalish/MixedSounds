const clientID = '31a69cb16d5248f2870cae5abad2561b';
const clientSecret = '917e79d402504281a7616258567680de';

const getAuthToken = async () => {
    const result = await fetch(
        'https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + window.btoa(clientID + ':' + clientSecret)
            },
            body: 'grant_type = client_credentials'
        });
    const req = await result.json();
    return req.access_token;
}

const getTrack = async (token, quer, offset) => {
    const result = await fetch(
        "https://api.spotify.com/v1/search?q=" + quer +"&type=track&limit=1&offset" + offset, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer' + token
            }
        }
    );

    const trackData = await result.json();
    return trackData.items;
}

const randomTrack = async() => {
    let authToken = getAuthToken();

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let randomAlph = Math.floor(Math.random()* 26);
    let query = alphabet[randomAlph]; //get a random letter to search

    let random_offset = Math.floor(Math.random() * 50); //offset for spotify search can go up to 1000

    let track = getTrack(authToken, query, random_offset);

    return track;
}

const getTitle = async (track) => {
    return track.tracks.items[0].name; //return string
}

const getArtist = async(track) => {
    const artistArr = track.tracks.items[0].artists;
    
    let artistString  = "";
    for(let i = 0; i < artistArr.length; i++){
        artist = artist + artistArr[i] + " ";
    }

    return artistString; 
}

const getAlbum = async(track) => {
    return track.tracks.items[0].album.name; //return string
}

const getArt = async(track) => {
    return track.tracks.items[0].album.images[0].url; //returns a 640 x 640 image; to get 300 x 400 do images[1]
}

const getMP3 = async(track) => {
    return track.tracks.items[0].preview_url;
}