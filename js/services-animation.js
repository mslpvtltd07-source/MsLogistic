/**
 * MS Logistics — Services Stacked Scroll Animation
 * Scroll-driven one-by-one card reveal (Refit-style)
 */

(function () {
  'use strict';

  const SCROLL_PER_CARD = 640;
  const LERP_FACTOR = 0.16;
  const OVERLAP_PEEK = 18;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function initServicesStackAnimation() {
    const showcase = document.getElementById('servicesGrid');
    if (!showcase) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      showcase.classList.add('services--reduced-motion');
      return;
    }

    const track = showcase.querySelector('.services__scroll-track');
    const stage = showcase.querySelector('.services__stage');
    const cards = Array.from(showcase.querySelectorAll('.stack-card'));
    const cardCount = cards.length;

    if (!track || !stage || !cardCount) return;

    let smoothPosition = 0;
    let targetPosition = 0;
    let animating = false;

    function getCardHeight() {
      if (window.matchMedia('(max-width: 767px)').matches) return 430;
      if (window.matchMedia('(max-width: 1023px)').matches) return 470;
      return 480;
    }

    function updateDimensions() {
      const cardHeight = getCardHeight();
      const scrollHeight = SCROLL_PER_CARD * Math.max(cardCount - 1, 0) + window.innerHeight * 0.25;

      track.style.height = scrollHeight + 'px';
      stage.style.height = cardHeight + 'px';

      cards.forEach(function (card) {
        card.style.height = cardHeight + 'px';
      });
    }

    function computeTargetPosition() {
      const rect = track.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.42;
      const scrollRange = rect.height - window.innerHeight * 0.25;

      if (scrollRange <= 0) return 0;

      const scrolled = viewportAnchor - rect.top;
      const progress = clamp(scrolled / scrollRange, 0, 1);

      return progress * (cardCount - 1);
    }

    function renderCards(position) {
      const activeIndex = Math.min(cardCount - 1, Math.floor(position));
      const localProgress = smoothstep(clamp(position - activeIndex, 0, 1));

      cards.forEach(function (card, index) {
        let translateY = 100;
        let translatePx = 0;
        let opacity = 0;
        let zIndex = index + 1;
        let pointerEvents = 'none';
        let visibility = 'hidden';

        if (index === activeIndex) {
          translateY = 0;
          translatePx = -localProgress * OVERLAP_PEEK;
          opacity = 1;
          zIndex = 100;
          pointerEvents = localProgress < 0.98 ? 'auto' : 'none';
          visibility = 'visible';
        } else if (index === activeIndex + 1) {
          translateY = 100 - localProgress * 100;
          translatePx = 0;
          opacity = 1;
          zIndex = 200;
          visibility = 'visible';
        } else {
          translateY = 100;
          opacity = 0;
          visibility = 'hidden';
        }

        card.style.transform = 'translate3d(0, calc(' + translateY + '% + ' + translatePx + 'px), 0)';
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
        card.style.visibility = visibility;
        card.style.pointerEvents = pointerEvents;
        card.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');

        card.classList.toggle('is-active', index === activeIndex);
        card.classList.toggle('is-next', index === activeIndex + 1 && localProgress > 0);
        card.classList.toggle('is-settled', index === activeIndex && (localProgress === 0 || localProgress >= 0.999));
      });
    }

    function tick() {
      targetPosition = computeTargetPosition();
      smoothPosition += (targetPosition - smoothPosition) * LERP_FACTOR;

      if (Math.abs(targetPosition - smoothPosition) < 0.0005) {
        smoothPosition = targetPosition;
      }

      renderCards(smoothPosition);

      if (Math.abs(targetPosition - smoothPosition) > 0.0005) {
        requestAnimationFrame(tick);
      } else {
        animating = false;
      }
    }

    function onScroll() {
      if (!animating) {
        animating = true;
        requestAnimationFrame(tick);
      }
    }

    updateDimensions();
    smoothPosition = computeTargetPosition();
    targetPosition = smoothPosition;
    renderCards(smoothPosition);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      updateDimensions();
      smoothPosition = computeTargetPosition();
      targetPosition = smoothPosition;
      renderCards(smoothPosition);
    });
  }

  document.addEventListener('DOMContentLoaded', initServicesStackAnimation);
})();
