// script.js - smooth scrolling, sticky nav toggle, and fade-in on scroll

// set year in footer
document.addEventListener('DOMContentLoaded', function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', ()=>{
    if(!nav) return;
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? '' : 'flex';
  });

  // close nav when link clicked (mobile)
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', ()=>{
    if(window.innerWidth <= 640 && nav) nav.style.display = '';
  }));

  // smooth offset scroll for anchors (if needed)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - 62; // offset for sticky header
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });

  // intersection observer for fade-in sections
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.fade-in').forEach(el=> io.observe(el));
});
