// window.onload = display;

//visiblefor function to display the form
function visibileUserForm() {
    form = document.getElementById('addForm');
    if (form.style.display === 'block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'block';
    }
}

//function to add the tasks
function addTask() {
    var ntaskname = document.getElementById('taskname').value;
    var ndescription = document.getElementById('description').value;
    var nassignedto = document.getElementById('assignedto').value;
    var nstatus = document.getElementById('status').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                display();
            }
        }
    }
    xhttp.open("POST", "http://localhost:5000/task", true)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify({
        "task_name": ntaskname,
        "description": ndescription,
        "AssignedTo": nassignedto,
        "comments": " ",
        "status": nstatus,
        "notification": 1
    }))
    confirm("Task Added Successfully!!!")
    document.getElementById('addForm').reset();
    form.style.display = 'none';
    event.preventDefault();
}
var task_json = "";

//function to display all tasks
function display() {
    var content = "<div class='user-header'><span class='headcell'> All TASKS </span><br><br>"
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res = this.responseText
                task_json = JSON.parse(res)
                for (let u in task_json) {
                    var usr = `<div class='task1'>
                    <div class='task'><span class="tbold">TaskName:</span> ${task_json[u].task_name}</div><br>
                    <div class='task'><span class="tbold">Date:</span> ${task_json[u].created_at}</div><br>
                    <div class='task'><span class="tbold">Description:</span> ${task_json[u].description}</div><br>
                    <div class='task'><span class="tbold">Assigned To:</span> ${task_json[u].AssignedTo}</div><br>
                    <div class='task'><span class="tbold">Status:</span> ${task_json[u].status}</div><br>
                    <div class='task'><span class="tbold">Comments:</span> ${task_json[u].comments}</div><br>
                    <button class="btn1" onclick="editTask('${task_json[u]._id}')">Update</button>&nbsp;
                    <button class="btn1" onclick="deleteTask('${task_json[u]._id}')">Delete</button>
                    </div><hr>`
                    content = content + usr
                }
                var element = document.getElementById('root')
                element.innerHTML = content + "</div>";
            }
        }
    }
    htt.open("GET", "http://localhost:5000/task", true)
    htt.send();
}

let TASKID;
var upform;

//function to edit the tasks
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
    document.getElementById('upassignedto').value = task_json[ind].AssignedTo;
    document.getElementById('upstatus').value = task_json[ind].status;
}

//function to update the tasks
function updateTask() {
    var uptaskname1 = document.getElementById('uptaskname').value;
    var updescription1 = document.getElementById('updescription').value;
    var upassignedto1 = document.getElementById('upassignedto').value;
    var upstatus1 = document.getElementById('upstatus').value;
    if (uptaskname1 === '' || upassignedto1 === '') {
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
        "task_name": uptaskname1,
        "description": updescription1,
        "AssignedTo": upassignedto1,
        "status": upstatus1
    }));
    event.preventDefault();
    confirm("Task Updated Successfully!!!")
    document.getElementById('updateForm').reset();
    upform.style.display = 'none';
}

//function to delete the particular task
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

//function to search the particular task 
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
                // var storevalue = localStorage.getItem("txtusername");
                // console.log("storename", storevalue);
                for (let u in task_json) {
                    if (srchtxt == task_json[u].AssignedTo || srchtxt == task_json[u].task_name || srchtxt == task_json[u].status) {
                        var usr = `<div class='task1'><div class="card">
                    <br><div class='task'><span class="tbold">Task Name: </span>${task_json[u].task_name}</div>
                    <br><div class='task'><span class="tbold">Date: </span>${task_json[u].created_at}</div>&nbsp;&nbsp;
                    <br><div class='task'><span class="tbold">Description: </span>${task_json[u].description}</div>
                    <br><div class='task'><span class="tbold">Assigned To:</span> ${task_json[u].AssignedTo}</div>
                    <br><div class='task'><span class="tbold">Status: </span>${task_json[u].status}</div>&nbsp;&nbsp;
                    <button class="btn1" onclick="editTask('${task_json[u]._id}')">Update</button>&nbsp;
                    </div></div>
                    `
                        content = content + usr
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