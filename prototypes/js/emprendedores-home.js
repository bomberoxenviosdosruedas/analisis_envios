(function () {
      /* Marquee Pause / Play Control */
      const marquee = document.getElementById('marquee-track');
      const btn = document.getElementById('marquee-toggle');
      const pauseIcon = document.getElementById('marquee-pause-icon');
      const playIcon = document.getElementById('marquee-play-icon');
      const btnText = document.getElementById('marquee-btn-text');

      if (marquee && btn) {
        let isPaused = false;
        btn.addEventListener('click', () => {
          isPaused = !isPaused;
          marquee.classList.toggle('is-paused', isPaused);
          btn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
          btn.setAttribute('aria-label', isPaused ? 'Reanudar carrusel de marcas locales' : 'Pausar carrusel de marcas locales');
          if (btnText) btnText.textContent = isPaused ? 'Reanudar' : 'Pausar';
          if (pauseIcon && playIcon) {
            pauseIcon.style.display = isPaused ? 'none' : 'block';
            playIcon.style.display = isPaused ? 'block' : 'none';
          }
        });
      }

      /* Viewport Entrance Animations */
      const cards = document.querySelectorAll('.bento-card-outer');
      if (!cards.length) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        cards.forEach(card => card.classList.add('is-animated'));
        return;
      }

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              cards.forEach(card => card.classList.add('is-animated'));
              observer.disconnect();
            }
          });
        }, { threshold: 0.15 });

        const section = document.getElementById('emprendedores-home');
        if (section) observer.observe(section);
      } else {
        cards.forEach(card => card.classList.add('is-animated'));
      }
    })();