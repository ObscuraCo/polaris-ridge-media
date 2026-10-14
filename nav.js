(function(){
  var header = document.querySelector('.header');
  var toggle = document.getElementById('nav-toggle');
  if(!header || !toggle) return;
  toggle.addEventListener('click', function(){
    var isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.querySelectorAll('.page-nav a').forEach(function(link){
    link.addEventListener('click', function(){
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && header.classList.contains('nav-open')){
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
})();
