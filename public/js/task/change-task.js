export async function changeToDone(taskName, taskItem, collectionId, completedList) {
    const name = taskName.innerHTML
  const id = await getTaskId(name, collectionId);
  console.log({id})
  try {
    const response = await fetch(`/collection/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
      }),
    });

    if (response.status === 401) {
      alertModal.unauthorizedAlert();
    } else if (response.status === 200) {
      taskName.classList.add("line-through", "text-gray-400");
      const statusIcon = taskItem.querySelector("div");
      statusIcon.classList.remove("border-2", "border-purple-500");
      statusIcon.classList.add(
        "bg-purple-500",
        "flex",
        "items-center",
        "justify-center"
      );
      statusIcon.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>`;
      completedList.appendChild(taskItem);
    } else {
      console.log("ok");
    }
  } catch (error) {
    console.error("error :", error);
  }
}

export async function changeToNotDone(taskName, taskItem, collectionId, taskList) {
    const name = taskName.innerHTML
    const id = await getTaskId(name, collectionId)
  try {
    const response = await fetch(`/collection/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
      }),
    });

    if (response.status === 401) {
      alertModal.unauthorizedAlert();
    } else if (response.status === 200) {
      taskName.classList.remove("line-through", "text-gray-400");
      const statusIcon = taskItem.querySelector("div");
      statusIcon.classList.remove(
        "bg-purple-500",
        "flex",
        "items-center",
        "justify-center"
      );
      statusIcon.innerHTML = "";
      statusIcon.classList.add("border-2", "border-purple-500");
      taskList.appendChild(taskItem);
    } else {
      console.log("ok");
    }
  } catch (error) {
    console.error("error :", error);
  }
}

async function getTaskId(taskName, collectionId) {
    console.log(taskName)
  try {
    const response = await fetch(`/api/task?collectionId=${collectionId}&name=${taskName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.status === 401) {
      alertModal.unauthorizedAlert();
    } else if (response.status === 200) {
      const id = await response.json();
      console.log(id);
      return id;
    } else {
      console.log("ok");
    }
  } catch (error) {
    console.error("error :", error);
  }
}
