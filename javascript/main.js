const n=localStorage.wss_name;if(!n)location.href="index.html";document.getElementById("user").textContent=n;
document.documentElement.dataset.theme=localStorage.theme||"light";
document.getElementById("theme").onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.theme=document.documentElement.dataset.theme};
document.getElementById("logout").onclick=()=>{localStorage.removeItem("wss_name");location.href="index.html"};
document.getElementById("date").textContent=new Date().toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});

const tabs=[...document.querySelectorAll(".tab")],panels=[...document.querySelectorAll(".panel")];
tabs.forEach(b=>b.onclick=()=>{tabs.forEach(x=>x.classList.remove("active"));panels.forEach(p=>p.classList.remove("active"));b.classList.add("active");document.getElementById(b.dataset.tab).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})});

const M=document.getElementById("modal"),MB=document.getElementById("modalBody");
document.getElementById("modalClose").onclick=()=>M.classList.remove("open");
M.onclick=e=>{if(e.target===M)M.classList.remove("open")};

const SHOWCASE=[
{type:"video",src:"showcase/Draft_2025.mp4",title:"Draft 2025"},
{type:"image",src:"showcase/WhatsApp Image 2025-06-19 at 10.36.30.jpeg",title:"Showcase Photo"},
{type:"image",src:"showcase/WhatsApp Image 2025-06-19 at 10.36.31.jpeg",title:"Showcase Photo"},
{type:"image",src:"showcase/WhatsApp Image 2025-06-19 at 10.36.32.jpeg",title:"Showcase Photo"},
{type:"image",src:"showcase/WhatsApp Image 2025-06-19 at 10.36.33.jpeg",title:"Showcase Photo"},
{type:"video",src:"showcase/WhatsApp Video 2025-06-19 at 10.36.31.mp4",title:"Showcase Video"},
{type:"video",src:"showcase/WhatsApp Video 2025-06-19 at 10.36.32.mp4",title:"Showcase Video"}
];

const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target.querySelector("video");if(!v)return;if(e.isIntersecting){v.muted=true;v.playsInline=true;v.play().catch(()=>{})}else v.pause()}),{threshold:.55});

fetch("database.json").then(r=>r.json()).then(d=>{
const mem=d.members||[],proj=d.projects||[];
const exec=mem.filter(m=>m.status==="Executive"),up=mem.filter(m=>m.status==="Upcoming");
document.getElementById("totalMembers").textContent=mem.length;document.getElementById("execCount").textContent=exec.length;document.getElementById("upCount").textContent=up.length;document.getElementById("projectCount").textContent=proj.length;
document.getElementById("chipMembers").textContent=`${mem.length} Members`;document.getElementById("chipExec").textContent=`${exec.length} Executives`;document.getElementById("chipProj").textContent=`${proj.length} Projects`;

const mg=document.getElementById("memberGrid"),ms=document.getElementById("memberSearch");
let memberFilter="Executive",memberQuery="";
const memberCard=m=>`<article class="card person" data-name="${(m.name||"").toLowerCase()}"><div class="row"><img class="avatar" src="${m.image||"_i_/default.png"}" alt="${m.name||"Member"}" onerror="this.src='_i_/default.png'"><div class="who"><h3>${m.name||"Member"}</h3><div class="tag">${m.role||""}</div></div></div><p class="desc">${m.description||""}</p><button class="link" data-open="${m.id}">View profile</button></article>`;
const renderMembers=()=>{mg.innerHTML=mem.filter(m=>m.status===memberFilter).filter(m=>(m.name||"").toLowerCase().includes(memberQuery)).map(memberCard).join("")};
renderMembers();
document.querySelectorAll(".sub").forEach(b=>b.onclick=()=>{document.querySelectorAll(".sub").forEach(x=>x.classList.remove("active"));b.classList.add("active");memberFilter=b.dataset.filter;renderMembers()});
ms.oninput=()=>{memberQuery=ms.value.trim().toLowerCase();renderMembers()};

mg.onclick=e=>{const btn=e.target.closest("[data-open]");if(!btn)return;const id=btn.dataset.open;const m=mem.find(x=>x.id===id);if(!m)return;MB.innerHTML=`<div class="modal-head"><img class="avatar xl" src="${m.image||"_i_/default.png"}" onerror="this.src='_i_/default.png'"><div><h3>${m.name||""}</h3><div class="tag">${m.role||""} • ${m.status||""}</div></div></div><p class="desc">${m.description||""}</p>`;M.classList.add("open")};

const pg=document.getElementById("projectGrid"),ps=document.getElementById("projectSearch");
let projectQuery="";
const projectCard=p=>`<article class="card"><h3>${p.name||"Project"}</h3><p class="desc">${p.description||""}</p></article>`;
const renderProjects=()=>{pg.innerHTML=proj.filter(p=>(p.name||"").toLowerCase().includes(projectQuery)).map(projectCard).join("")};
renderProjects();
ps.oninput=()=>{projectQuery=ps.value.trim().toLowerCase();renderProjects()};

const sg=document.getElementById("showcaseGrid");
sg.innerHTML=SHOWCASE.map(x=>x.type==="video"
?`<figure class="shot" tabindex="0"><div class="media"><video preload="metadata" loop muted playsinline src="${x.src}"></video></div><figcaption>${x.title||"Video"}</figcaption></figure>`
:`<figure class="shot" tabindex="0"><div class="media"><img src="${x.src}" alt="${x.title||"Image"}"></div><figcaption>${x.title||"Image"}</figcaption></figure>`
).join("");
[...sg.querySelectorAll(".shot")].forEach(el=>io.observe(el));

sg.onclick=e=>{const shot=e.target.closest(".shot");if(!shot)return;const v=shot.querySelector("video"),img=shot.querySelector("img");MB.innerHTML=v?`<video class="full" controls autoplay playsinline src="${v.getAttribute("src")}"></video>`:`<img class="fullimg" src="${img.getAttribute("src")}" alt="">`;M.classList.add("open")};
});
