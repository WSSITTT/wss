const n=localStorage.wss_name;if(!n)location.href="index.html";
document.getElementById("hello").textContent=`Hello, ${n}`;
document.documentElement.dataset.theme=localStorage.theme||"light";
document.getElementById("theme").onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.theme=document.documentElement.dataset.theme};
document.querySelectorAll("#logout").forEach(x=>x.onclick=()=>{localStorage.removeItem("wss_name");location.href="index.html"});
document.getElementById("yr").textContent=new Date().getFullYear();

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("on")}),{threshold:.14});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));

const grid=document.getElementById("projectGrid"),search=document.getElementById("projectSearch");
let all=[],q="";
const card=p=>`<div class="prod reveal on"><h3>${p.name||"Project"}</h3><p>${p.description||""}</p></div>`;
const render=()=>{grid.innerHTML=all.filter(p=>(p.name||"").toLowerCase().includes(q)).map(card).join("")};

fetch("database.json").then(r=>r.json()).then(d=>{
  const mem=d.members||[],proj=d.projects||[];
  document.getElementById("statMembers").textContent=mem.length;
  document.getElementById("statExec").textContent=mem.filter(m=>m.status==="Executive").length;
  document.getElementById("statProjects").textContent=proj.length;

  const faces=(mem.map(m=>m.image).filter(Boolean).slice(0,5));
  const av=document.getElementById("avatars");
  av.innerHTML=faces.map(s=>`<img src="${s}" alt="">`).join("")||`<img src="_i_/Keyshaun.png" alt=""><img src="_i_/Kyler.png" alt=""><img src="_i_/Katelyn.png" alt="">`;

  all=proj;render();
});

search.oninput=()=>{q=search.value.trim().toLowerCase();render()};
