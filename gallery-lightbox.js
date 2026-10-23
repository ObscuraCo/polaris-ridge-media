(function () {
  var galleryImgs = document.querySelectorAll('.gallery img, .gallery-hero img');
  if (!galleryImgs.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(overlay);

  var lightboxImg = overlay.querySelector('img');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var lastFocused = null;

  function openLightbox(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  galleryImgs.forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img);
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
  });
})();
