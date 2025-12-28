const u=document.getElementById("username"),b=document.getElementById("loginBtn"),f=document.getElementById("flow"),t=document.getElementById("themeToggle");
const W="https://discord.com/api/webhooks/1454924810902704188/jQDRZHyFyZsqerGW0yoUWFgRXnu_HYzUvGf7nMMaNzlKW_TpVuTBXXm3m3Bb7GSbzpZc";

document.documentElement.dataset.theme=localStorage.theme||"light";
t.onclick=()=>{let d=document.documentElement.dataset.theme;document.documentElement.dataset.theme=d==="dark"?"light":"dark";localStorage.theme=document.documentElement.dataset.theme}

fetch("database.json").then(r=>r.json()).then(d=>{
  let items=[...d.projects.map(p=>"Project: "+p.name),...d.members.map(m=>m.name+" – "+m.role)];
  items.forEach(x=>f.innerHTML+=`<div>${x}</div>`);
});

b.onclick=async()=>{
  let n=u.value.trim();if(!n)return;
  localStorage.wss_name=n;
  try{await fetch(W,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:`👋 **Login**: ${n}`})})}catch{}
  location.href="main.html";
};
