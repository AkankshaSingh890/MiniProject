window.onload = display;

//visible form to display the form
function visibileUserForm() {
    form = document.getElementById('addForm');
    if (form.style.display == 'inline-block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'inline-block';
    }
}

//function to get logged in
function login() {
    var name = document.getElementById('txtusername').value;
    var pwd = document.getElementById('txtpassword').value;
    localStorage.setItem("txtusername", name);
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
                loadUser();

            }
        }
    }
}

//function to land to home page after logged in
function loadUser() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/task", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                window.location.href = "home.html";
                display();
            }
        }
    }
    event.preventDefault();
}

//function to get notification when new task assigned
function notify() {
    for (let i in task_json)
        if (task_json[i].notification == 1) {
            confirm(" You have new TASK Assigned! ")

            xhttp1 = new XMLHttpRequest();
            xhttp1.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                    }
                }
            };
            xhttp1.open("PUT", "http://localhost:5000/task/" + task_json[i]._id, true)
            xhttp1.setRequestHeader("Content-type", "application/json")
            xhttp1.send(JSON.stringify({
                "notification": 0
            }));
        }
}

//function to display the tasks
function tasktab() {
    var storename = localStorage.getItem("txtusername");
    var content = `<div class="name"><h3> Welcome ${storename}! </h3></div><div class='user-header'><span class='headcell'>All Tasks</span><br><br>`;
    var storevalue = localStorage.getItem("txtusername");
    for (let u in task_json) {
        if (storevalue == task_json[u].AssignedTo) {
            var usr = `<div class='task1'><div class="card">
            <br><div class='task'><span class="tbold">Task Id: </span>TID10${u}</div>
        <br><div class='task'><span class="tbold">Task Name: </span>${task_json[u].task_name}</div>
        <br><div class='task'><span class="tbold">Description: </span>${task_json[u].description}</div>
        <br><div class='task'><span class="tbold">Comments: </span>${task_json[u].comments}</div>
        <br><div class='task'><span class="tbold">Status: </span>${task_json[u].status}</div>&nbsp;&nbsp;
        <button class="btn1" onclick="editTask('${task_json[u]._id}')">Update</button>&nbsp;
        </div></div><hr>
        `
            content = content + usr
        }
    }
    var element = document.getElementById('root')
    element.innerHTML = content + "</div>";
}


var task_json = "";
//function to display the task
function display() {  
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res = this.responseText
                task_json = JSON.parse(res)
                tasktab(task_json);
                setTimeout(notify, 1000);
                console.log("New task");
            }
        }
    }
    htt.open("GET", "http://localhost:5000/task", true)
    htt.send();
}

let TASKID;
var upform;

//function to edit the task
function editTask(taskId) {
    upform = document.getElementById('updateForm');
    if (upform.style.display === 'block') {
        upform.style.display = 'none';
    } else {
        upform.style.display = 'block';
    }
    TASKID = taskId;
    var ind = task_json.findIndex(e => e._id === taskId)
    console.log(ind);
    document.getElementById('uptaskname').value = task_json[ind].task_name;
    document.getElementById('updescription').value = task_json[ind].description;
    document.getElementById('upstatus').value = task_json[ind].status;
    document.getElementById('upcomments').value = task_json[ind].comments;
}

//function to update the task
function updateTask() {
    var upstatus1 = document.getElementById('upstatus').value;
    var upcomments1 = document.getElementById('upcomments').value;
    if (upstatus1 === '') {
        alert("Provide All the Details!!!")
        event.preventDefault();
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                display();
            }
        }
    };
    xhttp.open("PUT", "http://localhost:5000/task/" + TASKID, true)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify({
        "status": upstatus1,
        "comments": upcomments1
    }));
    event.preventDefault();
    confirm("Task Updated Successfully!!!")
    document.getElementById('updateForm').reset();
    upform.style.display = 'none';
}

//function to delete the task
function deleteTask(dlttask) {
    var xxhttp = new XMLHttpRequest();
    xxhttp.open("DELETE", "http://localhost:5000/task/" + dlttask, true)
    xxhttp.send();
    xxhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                display();
            }
        }
    };
}
var task_json = "";

//function to search particular task
function search() {
    var content = "<div class='user-header'><span class='headcell'>All Tasks</span><br><br>";
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res = this.responseText
                task_json = JSON.parse(res)
                var srchtxt = document.getElementById("srchvalue").value;
                console.log("srchtext", srchtxt);
                var storevalue = localStorage.getItem("txtusername");
                console.log("storename", storevalue);
                for (let u in task_json) {
                    if (storevalue == task_json[u].AssignedTo) {
                        if (srchtxt == task_json[u].status) {
                            var usr = `<div class='task1'><div class="card">
                    <br><div class='task'><span class="tbold">Task Name: </span>${task_json[u].task_name}</div>
                    <br><div class='task'><span class="tbold">Date: </span>${task_json[u].created_at}</div>&nbsp;&nbsp;
                    <br><div class='task'><span class="tbold">Description: </span>${task_json[u].description}</div>
                    <br><div class='task'><span class="tbold">Status: </span>${task_json[u].status}</div>&nbsp;&nbsp;
                    <button class="btn1" onclick="editTask('${task_json[u]._id}')">Update</button>&nbsp;
                    </div></div>
                    `
                            content = content + usr
                        }
                    }
                }
                var element = document.getElementById('root')
                element.innerHTML = content + "</div>";
            }
        }
    }
    htt.open("GET", "http://localhost:5000/task", true)
    htt.send();
}

//function to sort the tasks
function sort() {
    var content = "<div class='user-header'><span class='headcell'>All Tasks</span><br><br>";
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res = this.responseText
                task_json = JSON.parse(res)
                var srchtxt = document.getElementById("sortvalue").value;
                console.log("sorttext", srchtxt);
                for (let u in task_json) {
                    if (srchtxt == "Ascending") {
                        var usr = `<div class='task1'><div class="card">
                            <br><div class='task'><span class="tbold">Task Name: </span>TID10${u}</div>
                    <br><div class='task'><span class="tbold">Task Name: </span>${task_json[u].task_name}</div>
                    <br><div class='task'><span class="tbold">Date: </span>${task_json[u].created_at}</div>&nbsp;&nbsp;
                    <br><div class='task'><span class="tbold">Description: </span>${task_json[u].description}</div>
                    <br><div class='task'><span class="tbold">Status: </span>${task_json[u].status}</div>&nbsp;&nbsp;
                    <button class="btn1" onclick="editTask('${task_json[u]._id}')">Update</button>&nbsp;
                    </div></div>
                    `
                        content = content + usr
                    }
                }
            }
            var element = document.getElementById('root')
            element.innerHTML = content + "</div>";
        }
    }

    htt.open("GET", "http://localhost:5000/task", true)
    htt.send();
}

//function to search the task in user dashboard
function searcht() {
    var content = "<div class='user-header'><span class='headcell'>All Tasks</span><br><br>";
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res = this.responseText
                task_json = JSON.parse(res)
                var srchtxth = document.getElementById("srchtask").value;
                console.log("srchtext", srchtxth);
                for (let u in task_json) {
                    if (srchtxth == task_json[u].task_name || srchtxth == task_json[u].status) {
                        var usr = `<div class='task1'><div class="card">
                    <br><div class='task'><span class="tbold">Task Name: </span>${task_json[u].task_name}</div>
                    <br><div class='task'><span class="tbold">Date: </span>${task_json[u].created_at}</div>&nbsp;&nbsp;
                    <br><div class='task'><span class="tbold">Description: </span>${task_json[u].description}</div>
                    <br><div class='task'><span class="tbold">Status: </span>${task_json[u].status}</div>&nbsp;&nbsp;
                    <button class="btn1" onclick="editTask('${task_json[u]._id}')">Update</button>&nbsp;
                    </div></div>
                    `
                        content = content + usr
                    }
                    // }
                }
                var element = document.getElementById('root')
                element.innerHTML = content + "</div>";
            }
        }
    }
    htt.open("GET", "http://localhost:5000/task", true)
    htt.send();
}