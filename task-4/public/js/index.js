import alertModal from "./alert-modal.js";

checkDone();
const addCollection = document.getElementById("addCollection");
addCollection.addEventListener("click", async (e) => {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
    });

    if (response.status === 200) {
      window.location.href = "/collection";
    } else if (response.status === 401) {
      alertModal.unauthorizedAlert();
    } else {
      console.log("endpoint not valid");
    }
  } catch (error) {
    console.error("error :", error);
  }
});

function checkDone() {
  const isDone = document.getElementById("isDone").innerHTML;
  const tasks = document.getElementById("tasks").innerHTML;
  if (isDone === tasks) {
    document.getElementById("checkContainer").innerHTML = `
        <div class="py-0 px-2 bg-gradient-to-b from-green-500 via-green-700 to-green-400 text-white 
        rounded-full flex justify-center items-center">
        <i class="fa-solid fa-check text-3xl font-bold"></i>
        </div>`;
  }
}
