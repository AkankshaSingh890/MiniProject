//admin login function
function alogin(){
    var name2=document.getElementById('ausername').value;
    var pwd2=document.getElementById('apassword').value
    var req = new XMLHttpRequest();
var newObj={
    ausername:name2,
    apassword:pwd2
}
    req.open("POST","http://localhost:5000/loginadmin" , true);
    req.setRequestHeader("Content-type","application/json");
    req.send(JSON.stringify(newObj));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                console.log(this.responseText);
                // loadUser();
                window.location.href = "../adminhome.html";
                event.preventDefault();
            }
        }
    }

}
