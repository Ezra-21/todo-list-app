const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const spanText = document.createElement("span");
  spanText.className = "task-text";
  spanText.textContent = taskText;
  li.appendChild(spanText);

  const actionDiv = document.createElement("div");
  actionDiv.className = "action-buttons";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "✏️";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "❌";

  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(deleteBtn);
  li.appendChild(actionDiv);

  taskList.appendChild(li);
  inputBox.value = "";
  saveData();
}

taskList.addEventListener("click", function (e) {
  const target = e.target;

  // Toggle complete
  if (target.classList.contains("task-text")) {
    target.parentElement.classList.toggle("checked");
    saveData();
  }

  // Delete task
  if (target.classList.contains("delete-btn")) {
    target.closest("li").remove();
    saveData();
  }

  // Edit task
  if (target.classList.contains("edit-btn")) {
    const li = target.closest("li");
    const span = li.querySelector(".task-text");
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveData();
    }
  }
});

function saveData() {
  localStorage.setItem("data", taskList.innerHTML);
}

function showTasks() {
  taskList.innerHTML = localStorage.getItem("data") || "";
}

showTasks();
