const n=localStorage.wss_name;if(!n)location.href="index.html";
document.getElementById("hello").textContent=`Hello, ${n}`;
document.documentElement.dataset.theme=localStorage.theme||"light";
document.getElementById("theme").onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.theme=document.documentElement.dataset.theme};
document.querySelectorAll("#logout").forEach(x=>x.onclick=()=>{localStorage.removeItem("wss_name");location.href="index.html"});
document.getElementById("yr").textContent=new Date().getFullYear();

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("on")}),{threshold:.14});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));

const SHOW=[
{t:"video",s:"showcase/Draft_2025.mp4",c:"Draft 2025"},
{t:"image",s:"showcase/What.jpeg",c:"What"},
{t:"image",s:"showcase/WhatsApp Image 2025-06-19 at 10.36.30.jpeg",c:"Showcase"},
{t:"image",s:"showcase/WhatsApp Image 2025-06-19 at 10.36.31.jpeg",c:"Showcase"},
{t:"image",s:"showcase/WhatsApp Image 2025-06-19 at 10.36.32.jpeg",c:"Showcase"},
{t:"image",s:"showcase/WhatsApp Image 2025-06-19 at 10.36.33.jpeg",c:"Showcase"},
{t:"video",s:"showcase/WhatsApp Video 2025-06-19 at 10.36.31.mp4",c:"Video"},
{t:"video",s:"showcase/WhatsApp Video 2025-06-19 at 10.36.32.mp4",c:"Video"}
];

const L=document.getElementById("floatL"),R=document.getElementById("floatR");
const mk=(x,i)=>x.t==="video"
?`<div class="floatItem" style="animation-delay:${i*90}ms" data-src="${x.s}" data-type="video"><div class="capx">${x.c}</div><video muted playsinline preload="metadata" loop src="${x.s}"></video></div>`
:`<div class="floatItem" style="animation-delay:${i*90}ms" data-src="${x.s}" data-type="image"><div class="capx">${x.c}</div><img src="${x.s}" alt=""></div>`;
L.innerHTML=SHOW.slice(0,4).map(mk).join("");
R.innerHTML=SHOW.slice(4).map(mk).join("");

const floatIO=new IntersectionObserver(es=>{
  const on=es.some(e=>e.isIntersecting);
  L.classList.toggle("on",on);R.classList.toggle("on",on);
},{threshold:.06});
document.querySelectorAll(".hero,.split,#projects,#members,#contact").forEach(s=>floatIO.observe(s));

const vIO=new IntersectionObserver(es=>es.forEach(e=>{
  const v=e.target.querySelector("video");if(!v)return;
  if(e.isIntersecting){v.play().catch(()=>{})}else v.pause();
}),{threshold:.55});
[...document.querySelectorAll(".floatItem")].forEach(x=>vIO.observe(x));

const M=document.getElementById("modal"),MC=document.getElementById("modalCard"),MM=document.getElementById("modalMedia"),C=document.getElementById("close");
const openMedia=(type,src)=>{
  MM.innerHTML=type==="video"?`<video controls autoplay playsinline src="${src}"></video>`:`<img src="${src}" alt="">`;
  M.classList.add("open");
};
C.onclick=()=>M.classList.remove("open");
M.onclick=e=>{if(e.target===M)M.classList.remove("open")};
[L,R].forEach(p=>p.onclick=e=>{const it=e.target.closest(".floatItem");if(!it)return;openMedia(it.dataset.type,it.dataset.src)});

const pGrid=document.getElementById("projectGrid"),pSearch=document.getElementById("projectSearch");
const mGrid=document.getElementById("memberGrid"),mSearch=document.getElementById("memberSearch");
const segs=[...document.querySelectorAll(".seg")];
let allProj=[],projQ="",mem=[],memQ="",status="Executive";

const projCard=p=>`<div class="prod reveal on"><h3>${p.name||"Project"}</h3><p>${p.description||""}</p></div>`;
const memCard=m=>`<div class="member reveal on"><div class="memberTop"><img class="face" src="${m.image||"_i_/Keyshaun.png"}" onerror="this.src='_i_/Keyshaun.png'"><div><h3>${m.name||"Member"}</h3><div class="role">${m.role||""}</div></div></div><p>${m.description||""}</p></div>`;

const renderProjects=()=>{pGrid.innerHTML=allProj.filter(p=>(p.name||"").toLowerCase().includes(projQ)).map(projCard).join("")};
const renderMembers=()=>{
  const list=mem.filter(x=>(x.status||"")==status).filter(x=>(x.name||"").toLowerCase().includes(memQ)|| (x.role||"").toLowerCase().includes(memQ));
  mGrid.innerHTML=list.map(memCard).join("");
};

fetch("database.json").then(r=>r.json()).then(d=>{
  mem=d.members||[];allProj=d.projects||[];
  document.getElementById("statMembers").textContent=mem.length;
  document.getElementById("statExec").textContent=mem.filter(m=>m.status==="Executive").length;
  document.getElementById("statProjects").textContent=allProj.length;

  const faces=mem.map(m=>m.image).filter(Boolean).slice(0,5);
  document.getElementById("avatars").innerHTML=faces.map(s=>`<img src="${s}" alt="">`).join("")||`<img src="_i_/Keyshaun.png" alt=""><img src="_i_/Kyler.png" alt=""><img src="_i_/Katelyn.png" alt="">`;

  renderProjects();renderMembers();
});

pSearch.oninput=()=>{projQ=pSearch.value.trim().toLowerCase();renderProjects()};
mSearch.oninput=()=>{memQ=mSearch.value.trim().toLowerCase();renderMembers()};
segs.forEach(b=>b.onclick=()=>{segs.forEach(x=>x.classList.remove("active"));b.classList.add("active");status=b.dataset.status;renderMembers()});
