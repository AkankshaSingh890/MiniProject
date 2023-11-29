window.onload = display;
var task_json = "";

//display function which displays the the task 
function display() {
    var content = "<div class='user-header'><span class='headcell'> All TASKS </span><br><br>"
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res = this.responseText
                task_json = JSON.parse(res)
                for (let u in task_json) {
                    var usr = `<div class='task1'><div class="card">
                    <div class='task'><span class="tbold">TaskName:</span> ${task_json[u].task_name}</div><br>
                    <div class='task'><span class="tbold">Description:</span> ${task_json[u].description}</div><br>
                    <div class='task'><span class="tbold">Assigned To:</span> ${task_json[u].AssignedTo}</div><br>
                    <div class='task'><span class="tbold">Status:</span> ${task_json[u].status}</div><br> 
                   </div></div><hr>`
                    content = content + usr
                }
                var element = document.getElementById('root1')
                element.innerHTML = content + "</div>";
            }
        }
    }
    htt.open("GET", "http://localhost:5000/task", true)
    htt.send();
}

