const u=localStorage.wss_name;if(!u)location.href="index.html";
document.getElementById("user").textContent=u;

document.documentElement.dataset.theme=localStorage.theme||"light";
document.getElementById("theme").onclick=()=>{
  document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";
  localStorage.theme=document.documentElement.dataset.theme;
};

const tabs=document.querySelectorAll(".tab"),panels=document.querySelectorAll(".panel");
tabs.forEach(b=>b.onclick=()=>{tabs.forEach(x=>x.classList.remove("active"));panels.forEach(p=>p.classList.remove("active"));
b.classList.add("active");document.getElementById(b.dataset.tab).classList.add("active")});

fetch("database.json").then(r=>r.json()).then(d=>{
  document.getElementById("totalMembers").textContent=d.members.length;
  document.getElementById("execCount").textContent=d.members.filter(m=>m.status==="Executive").length;
  document.getElementById("projectCount").textContent=d.projects.length;

  const grid=document.getElementById("memberGrid");
  const renderMembers=f=>{
    grid.innerHTML="";
    d.members.filter(m=>m.status===f).forEach(m=>{
      grid.innerHTML+=`
      <div class="card">
        <img src="${m.image}">
        <h3>${m.name}</h3>
        <span>${m.role}</span>
        <p>${m.description}</p>
      </div>`;
    });
  };
  renderMembers("Executive");

  document.querySelectorAll(".sub").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".sub").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");renderMembers(b.dataset.filter);
  });

  const pgrid=document.getElementById("projectGrid");
  d.projects.forEach(p=>{
    pgrid.innerHTML+=`
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    </div>`;
  });
});
