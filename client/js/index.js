window.onload = () => {
    const loginButton = document.getElementById('three').querySelector("#Login");
    loginButton.addEventListener('click', async (event) => {
        console.log("Button Clicked!");
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
    });

    const registerButton = document.getElementById('three').querySelector("#Register");
    registerButton.addEventListener('click', async (event) => {
        alert("hi");
        console.log("Button Clicked!");
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
    });
}