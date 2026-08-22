// Get HTML elements

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");


// Get tasks from localStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// Save tasks

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display tasks

function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply filter

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {
            return !task.completed;
        });

    }

    else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed;
        });

    }


    // Display each task

    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        // Left section

        const leftSection = document.createElement("div");

        leftSection.className = "task-left";


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Task text

        const span = document.createElement("span");

        span.textContent = task.text;


        leftSection.appendChild(checkbox);

        leftSection.appendChild(span);


        // Action buttons

        const actions = document.createElement("div");

        actions.className = "task-actions";


        // Edit button

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";


        editButton.addEventListener("click", function() {

            editTask(task.id);

        });


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        li.appendChild(leftSection);

        li.appendChild(actions);


        taskList.appendChild(li);

    });


    updateTaskCount();

}


// Add Task

function addTask() {

    const text = taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task!");

        return;

    }


    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(task);


    saveTasks();

    displayTasks();


    taskInput.value = "";

    taskInput.focus();

}


// Toggle task

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();

}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// Edit task

function editTask(id) {

    const task = tasks.find(function(task) {

        return task.id === id;

    });


    const newText = prompt("Edit your task:", task.text);


    if (newText !== null && newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();

        displayTasks();

    }

}


// Update task count

function updateTaskCount() {

    const remainingTasks = tasks.filter(function(task) {

        return !task.completed;

    }).length;


    if (remainingTasks === 1) {

        taskCount.textContent = "1 task left";

    }

    else {

        taskCount.textContent = remainingTasks + " tasks left";

    }

}


// Clear completed tasks

clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    saveTasks();

    displayTasks();

});


// Filter buttons

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Add active class

        button.classList.add("active");


        // Change filter

        currentFilter = button.dataset.filter;


        displayTasks();

    });

});


// Add button

addBtn.addEventListener("click", addTask);


// Enter key

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Display tasks when page loads

displayTasks();