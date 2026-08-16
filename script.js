const loader=document.getElementById("pageLoader");
const header=document.getElementById("siteHeader");
const progress=document.getElementById("scrollProgress");
const glow=document.getElementById("cursorGlow");
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
const navItems=document.querySelectorAll(".nav-link");
const sections=document.querySelectorAll("main section[id]");

window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),350));

window.addEventListener("scroll",()=>{
  const top=window.scrollY;
  const height=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${height>0?(top/height)*100:0}%`;
  header.classList.toggle("scrolled",top>20);
  let current="home";
  sections.forEach(section=>{if(top>=section.offsetTop-180)current=section.id;});
  navItems.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${current}`));
});

if(window.matchMedia("(pointer:fine)").matches){
  window.addEventListener("pointermove",e=>{glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`;});
}else{glow.style.display="none";}

menuToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active",open);
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  document.body.classList.toggle("menu-open",open);
});

navItems.forEach(link=>link.addEventListener("click",()=>{
  navLinks.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded","false");
  document.body.classList.remove("menu-open");
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("year").textContent=new Date().getFullYear();
