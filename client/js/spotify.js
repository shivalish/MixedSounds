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

const authToken = getAuthToken();

const getTrack = async (token, trackOffset) => {
    const result = await fetch(
        'https://api.spotify.com/v1/search?type=track&offset=' + trackOffset, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer' + token
            }
        }
    );

    const trackData = await result.json();
    return trackData.items
}