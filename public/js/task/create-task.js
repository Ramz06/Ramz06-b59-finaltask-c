const createTaskItem = async (taskText, collectionId) => {
  try {
    const response = await fetch("/collection/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
        name: taskText,
      }),
    });

    if (response.status === 401) {
      return "unauthorized"
    } else if (response.status === 403) {
        return "forbidden"
    }else if (response.status === 201) {
      const taskItem = document.createElement("li");
      taskItem.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "bg-gray-700",
        "rounded-md",
        "p-2"
      );
      taskItem.innerHTML = `
          <span>${taskText}</span>
          <div class="w-6 h-6 border-2 border-purple-500 rounded-md"></div>
        `;
      return taskItem;
    } else {
      console.log("ok");
    }
  } catch (error) {
    console.error("error :", error);
  }
};

export default createTaskItem;
