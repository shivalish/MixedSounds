import { registerUser } from "../../server/routes/auth";


    console.log("LOADED");
    const loginButton = document.getElementById('three').querySelector("#Login");
    loginButton.addEventListener('click', async (event) => {
        console.log("Button Clicked!");
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
    });

    const registerButton = document.getElementById('Register');
    registerButton.addEventListener('click', async (event) => {
        alert("Button Clicked!");
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        alert(password);
        // sending a post request to the server /register
        try {
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            await registerUser(username, password);
        } catch (err) {
            console.log(err);
        }
    });
