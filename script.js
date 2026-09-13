const taskInput = document.getElementById("taskInput"); const addTask = document.getElementById("addTask"); const taskList = document.getElementById("taskList"); const emptyMessage = document.getElementById("emptyMessage"); const filters = document.querySelectorAll(".filter");
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; let currentFilter = "all";
function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); }
function showTasks() { taskList.innerHTML = "";
let filteredTasks = tasks;

if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
}

if (currentFilter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
}

filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.text}</span>

        <div>
            <button class="done">✓</button>
            <button class="delete">حذف</button>
        </div>
    `;

    li.querySelector(".done").addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        showTasks();
    });

    li.querySelector(".delete").addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== task.id);
        saveTasks();
        showTasks();
    });

    taskList.appendChild(li);
});

emptyMessage.style.display =
    filteredTasks.length === 0 ? "block" : "none";
}
function addNewTask() { const text = taskInput.value.trim();
if (text === "") {
    alert("اكتب مهمة أولًا!");
    return;
}

const newTask = {
    id: Date.now(),
    text: text,
    completed: false
};

tasks.push(newTask);

saveTasks();
showTasks();

taskInput.value = "";
taskInput.focus();
}
addTask.addEventListener("click", addNewTask);
taskInput.addEventListener("keydown", (event) => { if (event.key === "Enter") { addNewTask(); } });
filters.forEach(filter => { filter.addEventListener("click", () => {
filters.forEach(button => {
        button.classList.remove("active");
    });

    filter.classList.add("active");

    currentFilter = filter.dataset.filter;

    showTasks();
});
});
showTasks();