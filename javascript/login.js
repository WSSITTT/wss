const btn = document.getElementById("loginBtn");
const input = document.getElementById("username");

const WEBHOOK = "https://discord.com/api/webhooks/1454924810902704188/jQDRZHyFyZsqerGW0yoUWFgRXnu_HYzUvGf7nMMaNzlKW_TpVuTBXXm3m3Bb7GSbzpZc";

btn.onclick = async () => {
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a username");
    return;
  }

  localStorage.setItem("wss_name", name);

  try {
    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "WSS Login",
        content: `🔐 **New Login**\nUser: \`${name}\``
      })
    });
  } catch (e) {
    console.warn("Webhook failed", e);
  }

  window.location.href = "main.html";
};
