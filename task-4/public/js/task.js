import alertModal from "./alert-modal.js";
import { changeToDone, changeToNotDone } from "./task/change-task.js";
import createTaskItem from "./task/create-task.js";
import deleteTask from "./task/delete-task.js";

document.addEventListener("DOMContentLoaded", () => {
  const collection = document.getElementById("collectionId");
  const collectionId = collection.dataset.id;

  const addTaskButton = document.getElementById("addTaskButton");
  const taskCount = document.getElementById("taskCount");
  const completedCount = document.getElementById("completedCountHeader");
  const completedCountTotal = document.getElementById("completedCount");
  const taskList = document.querySelector(".tasks");
  const completedList = document.querySelector(".completed");
  const taskTotalCount = document.getElementById("taskTotalCount");
  const newTaskInput = document.getElementById("newTaskInput");
  const emptyContainer = document.getElementById("emptyInput");

  addTaskButton.addEventListener("click", async () => {
    const taskText = newTaskInput.value.trim();

    const existingTasks = Array.from(taskList.children).map((task) =>
      task.querySelector("span").textContent.trim()
    );

    if (taskText !== "") {
      if (existingTasks.includes(taskText)) {
        emptyContainer.innerHTML = `<p class="text-red-400 italic">*Task cannot have the same name as an existing task</p>`;
      } else {
        emptyContainer.innerHTML = "";
        const newTask = await createTaskItem(taskText, collectionId);
        if (newTask === "unauthorized") {
            alertModal.unauthorizedAlert()
        } else if (newTask === "forbidden") {
            alertModal.forbiddenAlert()
        } else {
            taskList.appendChild(newTask);
            newTaskInput.value = "";
            updateCounts();
        }
      }
    } else {
      emptyContainer.innerHTML = `<p class="text-red-400 italic">*Task name cannot be empty</p>`;
    }
  });

  const deleteButton = document.getElementById("deleteTask");
  deleteButton.addEventListener("click", async function (e) {
    const result = await deleteTask(this.dataset.id);
    if (result === "unauthorized") {
      alertModal.unauthorizedAlert();
    } else if (result === "forbidden") {
      alertModal.forbiddenAlert();
    } else if (result === "success") {
      alertModal.successDeleteCollection();
    }
  });

  const updateCounts = () => {
    taskCount.textContent = taskList.children.length;
    completedCount.textContent = completedList.children.length;
    completedCountTotal.textContent = completedList.children.length;
    taskTotalCount.textContent =
      taskList.children.length + completedList.children.length;
  };

  document.body.addEventListener("click", async (e) => {
    const taskItem = e.target.closest("li");
    if (!taskItem) return;

    const parentList = taskItem.parentElement;
    const taskName = taskItem.querySelector("span");

    if (parentList.classList.contains("tasks")) {
      await changeToDone(taskName, taskItem, collectionId, completedList);
    } else if (parentList.classList.contains("completed")) {
      await changeToNotDone(taskName, taskItem, collectionId, taskList);
    }
    updateCounts();
  });

  updateCounts();
});
