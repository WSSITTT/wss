const n=localStorage.wss_name;if(!n)location.href="index.html";
const h=document.getElementById("hello");h.textContent=`Hello, ${n}`;
document.documentElement.dataset.theme=localStorage.theme||"light";
document.getElementById("theme").onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.theme=document.documentElement.dataset.theme};
document.getElementById("logout").onclick=()=>{localStorage.removeItem("wss_name");location.href="index.html"};
document.getElementById("yr").textContent=new Date().getFullYear();

const topTabs=[...document.querySelectorAll(".tab")];
const setActive=()=>{
  const hash=(location.hash||"#about").replace("#","");
  topTabs.forEach(a=>a.classList.toggle("active",a.dataset.to===hash));
};
setActive();window.addEventListener("hashchange",setActive);

const pg=document.getElementById("projectGrid"),ps=document.getElementById("projectSearch"),pM=document.getElementById("pMembers"),pP=document.getElementById("pProjects");
let proj=[],q="";
const render=()=>{pg.innerHTML=proj.filter(x=>(x.name||"").toLowerCase().includes(q)).map(p=>`<div class="card2"><div class="ct">${p.name||"Project"}</div><div class="cd">${p.description||""}</div></div>`).join("")};
fetch("database.json").then(r=>r.json()).then(d=>{
  const mem=(d.members||[]),pro=(d.projects||[]);
  pM.textContent=`${mem.length} Members`;pP.textContent=`${pro.length} Projects`;
  proj=pro;render();
});
ps.oninput=()=>{q=ps.value.trim().toLowerCase();render()};
