//register function 
function register() {
    let username1 = document.getElementById("username").value;
    let email1 = document.getElementById("email").value;
    let pwd1 = document.getElementById("password").value;
    let mobile1 = document.getElementById("mobile").value;
    console.log(username1, email1, pwd1, mobile1);
    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:5000/register");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
        "username": username1,
        "email": email1,
        "hash_password": pwd1,
        "mobile": mobile1,
        "notification": 0
    }));
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 201) {
                loadUser();
            }
        }
    }
}

//login function to get logged in
function login() {
    var name = document.getElementById('txtusername').value;
    var pwd = document.getElementById('txtpassword').value
    var req = new XMLHttpRequest();
    var newObj = {
        username: name,
        hash_password: pwd
    }
    req.open("POST", "http://localhost:5000/login", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(newObj));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                console.log(this.responseText);
                // window.location.href="home.html";
                var k = JSON.parse(req.responseText);
                localStorage.setItem("Token", k);
                loadUser(name);
            }
        }
    }
}

//load user function which call the home page
function loadUser(name) {
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/auth-user", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-user-auth-token", localStorage.getItem("Token"));
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                window.location.href = "home.html";
            }
        }
    }
    event.preventDefault();
}
