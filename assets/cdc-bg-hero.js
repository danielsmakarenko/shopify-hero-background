(() => {
  const selector = '.cdc-bg-hero[data-reveal-enabled="true"]';

  const revealSection = (section) => {
    if (!section || section.dataset.revealBound === 'true') {
      return;
    }

    section.dataset.revealBound = 'true';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.classList.add('is-visible');
      return;
    }

    section.classList.add('is-ready');

    const show = () => {
      requestAnimationFrame(() => {
        section.classList.add('is-visible');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(section);
      return;
    }

    show();
  };

  const init = (root = document) => {
    root.querySelectorAll(selector).forEach(revealSection);
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  document.addEventListener('shopify:section:load', (event) => {
    init(event.target);
  });

  document.addEventListener('shopify:section:select', (event) => {
    init(event.target);
  });
})();
