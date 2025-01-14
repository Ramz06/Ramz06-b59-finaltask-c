import alertModal from "./alert-modal.js";

(async () => {
  await enterCollection();
})();

document.body.addEventListener("click", async (e) => {
  if (e.target.id === "logout") {
    await enterCollection();
  }
});

const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
    const name = document.getElementById("name").value
  e.preventDefault();
  await addNewCollection(name);
});

async function enterCollection() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
    });

    if (response.status === 401) {
      alertModal.unauthorizedAlert();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      console.log("ok");
    }
  } catch (error) {
    console.error("error :", error);
  }
}

async function addNewCollection(name) {
  console.log(name);
  try {
    const response = await fetch("/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

    const msg = await response.json();
    console.log({ msg });
    console.log("response: ", response.status);

    if (response.status === 401) {
      alertModal.unauthorizedAlert();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else if (response.status === 201) {
      alertModal.successAddCollection();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else if (response.status === 400) {
      document.getElementById(
        "errorContainer"
      ).innerHTML = `<div class="bg-purple-600 text-black p-2 rounded-md mb-3">
            <p><i class="fa-solid fa-triangle-exclamation mr-2"></i>${msg.error}</p>
          </div>`;
    } else if (response.status === 500) {
      document.getElementById(
        "errorContainer"
      ).innerHTML = `<div class="bg-purple-600 text-black p-2 rounded-md mb-3">
            <p><i class="fa-solid fa-triangle-exclamation mr-2"></i>${msg.error}</p>
          </div>`;
    } else {
      console.log("ok");
    }
  } catch (error) {
    console.error("error :", error);
  }
}
