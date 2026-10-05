document.addEventListener('DOMContentLoaded', () => {
  const rails = document.querySelectorAll('.grab-rail');
  rails.forEach((rail) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    rail.addEventListener('pointerdown', (e) => {
      isDown = true;
      rail.classList.add('grabbing');
      startX = e.clientX;
      scrollLeft = rail.scrollLeft;
      rail.setPointerCapture(e.pointerId);
    });
    rail.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      rail.scrollLeft = scrollLeft - dx;
    });
    const release = () => { isDown = false; rail.classList.remove('grabbing'); };
    rail.addEventListener('pointerup', release);
    rail.addEventListener('pointercancel', release);
    rail.addEventListener('pointerleave', () => { if (isDown) release(); });
  });

  document.querySelectorAll('.rail-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const amount = Math.min(target.clientWidth * 0.82, 600) * Number(btn.dataset.dir);
      target.scrollBy({left: amount, behavior: 'smooth'});
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});
