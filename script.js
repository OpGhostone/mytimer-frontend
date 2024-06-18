const api = "https://mytimer-backend.vercel.app"

function createTask() {
    const taskname = document.getElementsByName('taskname')[0].value
    const deadline = document.getElementsByName('deadline')[0].value
    const description = document.getElementsByName('description')[0].value
    const owner = document.getElementsByName('owner')[0].value
    const data = {taskname, deadline, description, owner}
    fetch(api + "/task", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data), 
        mode: "cors"
    }).then(res => readTasks())
}

function readTask() {
    const params = new URLSearchParams(window.location.search)
    const taskid = params.get("id")
    fetch(api + `/task/${taskid}`, {mode: "cors"})
    .then(res => res.json())
    .then(task => {
        document.getElementById('taskname').innerText = task.taskname
        document.getElementById('deadline').innerText = task.deadline
        document.getElementById('description').innerText = task.description
        document.getElementById('owner').innerText = 'by ' + task.owner
    })
}

function readTasks() {
    document.getElementById('tasks').innerHTML = ''
    fetch(api + "/task", {mode: "cors"})
    .then(res => res.json())
    .then(tasks => {
        for (task in tasks) {
            const item = document.createElement('li')
            item.innerHTML = `<a onclick="document.location='${window.location.origin}/task.html?id=${tasks[task]._id}'">${tasks[task].taskname}</a><ul><li>Deadline: ${tasks[task].deadline}</li><li>Description: ${tasks[task].description}</li><li>Owner: ${tasks[task].owner}</li></ul><a onclick="deleteTask('${tasks[task]._id}')">Delete</a>`
            document.getElementById('tasks').appendChild(item)
        }
    })
}

function deleteTask(taskid) {
    fetch(api + `/task/${taskid}`, {
        method: "DELETE",
        mode: "cors"
    }).then(res => readTasks())
}

function editTask() {
    const taskname = document.getElementsByName('taskname')[0].value
    const deadline = document.getElementsByName('deadline')[0].value
    const description = document.getElementsByName('description')[0].value
    const data = {taskname, deadline, description}
    const params = new URLSearchParams(window.location.search)
    const taskid = params.get("id")
    fetch(api + `/task/${taskid}`, {
        method: "PATCH", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data), 
        mode: "cors"
    }).then(res => readTask())
}