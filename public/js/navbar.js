import alertModal from "./alert-modal.js";

(async () => {
  await checkLoggedInUser();
})();

document.body.addEventListener("click", async (e) => {
  if (e.target.id === "logout") {
    await logoutUser();
  }
});

async function checkLoggedInUser() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
    });

    // Baca respons JSON hanya sekali
    const username = await response.json();
    console.log(username); 
    console.log(response.status)

    if (response.status === 200) {
      if (username) {
        renderNavbar(username);
      } else {
        console.error("Username tidak ditemukan dalam respon server.");
      }
    } else if (response.status === 401) {
      renderNavbar(false); // Tidak ada username saat status 401
    } else {
      console.error("Respon tidak valid");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat memeriksa user login:", error);
  }
}

function renderNavbar(username) {
  const navbar = document.getElementById("navbar"); // Pastikan ID elemen benar

  if (username) {
    navbar.innerHTML = `
      <ul class="flex items-center h-[8vh] gap-3 justify-end mr-36">
        <li class="justify-self-start mr-auto ml-36 text-white uppercase">
          <i class="fa fa-user" aria-hidden="true"></i> ${username}
        </li>
        <li class="bg-orange-600 py-1 px-3 rounded-2xl hover:bg-orange-500 hover:scale-[1.02] text-slate-800">
          <button class="cursor-pointer" id="logout">Logout</button>
        </li>
      </ul>`;
  } else {
    navbar.innerHTML = `
      <ul class="flex items-center h-[8vh] gap-3 justify-end mr-36">
        <li class="bg-amber-500 p-2 px-3 rounded-2xl hover:bg-amber-400 hover:scale-[.98]">
          <a href="/users/login">Login</a>
        </li>
        <li class="bg-zinc-400 p-2 px-3 rounded-2xl hover:bg-zinc-300 hover:scale-[.98]">
          <a href="/users/register">Register</a>
        </li>
      </ul>`;
  }
}

export async function logoutUser() {
  console.log("logout")
  const response = await fetch("/users/logout", { method: "DELETE" });
  console.log(response)

  try {
      if (response.status === 200) {
          const username = false
          alertModal.successLogoutUser()
          renderNavbar(username)
      } else {
          console.log(response.status)
      }
  } catch (error) {
      console.error("error :", error)
  }
}