document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const modal = document.getElementById("taskModal");
    const closeBtn = document.querySelector(".close");
    const saveTaskBtn = document.getElementById("saveTask");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("tasks");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();

    // Show modal when Add Task button is clicked
    addTaskBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Save task
    saveTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
            modal.style.display = "none";
        }
    });

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("task");
            taskItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Delete task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    // Toggle task completion
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };
});
