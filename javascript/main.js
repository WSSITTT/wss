const name = localStorage.getItem("wss_name");

if (!name) {
  window.location.href = "index.html";
}

document.getElementById("user").textContent = `Logged in as ${name}`;
