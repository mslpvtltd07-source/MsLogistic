/**
 * MS Logistics — Main JavaScript
 * Core functionality: loader, header, navigation, forms, modals, cursor
 */

(function () {
  'use strict';

  /* --- DOM Elements --- */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoIframe = document.getElementById('videoIframe');
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalBody = document.getElementById('projectModalBody');
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalClose = document.getElementById('serviceModalClose');
  const serviceModalBackdrop = document.getElementById('serviceModalBackdrop');
  const serviceModalBody = document.getElementById('serviceModalBody');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  const VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

  const SERVICES = [
    {
      title: 'Residential Relocation',
      image: 'images/relocation-packing-v2.jpg',
      paragraphs: [
        'Moving to a new home should be an exciting experience, not a stressful one. At MS Logistics, we provide professional residential relocation services that ensure your household belongings are packed, transported, and delivered safely. From furniture and electronics to fragile items and personal possessions, every item is handled with care using high-quality packing materials and proven packing techniques.',
        'Our experienced team manages every stage of your move, including pre-move surveys, professional packing, transportation, inventory management, and final delivery. With careful planning, timely communication, and personalised support, we make every residential relocation smooth, secure, and hassle-free.'
      ]
    },
    {
      title: 'International Household Relocation',
      image: 'images/freight-containers.jpg',
      paragraphs: [
        'Relocating overseas requires careful planning and expert coordination. MS Logistics provides complete international household relocation services, managing everything from export-quality packing and freight arrangements to customs documentation support and door-to-door delivery. Every relocation is customised according to your destination, shipment size, and specific requirements.',
        'Whether your belongings are travelling by air or sea, our experienced logistics team ensures they are protected throughout the journey and comply with international shipping standards. With reliable coordination, shipment tracking, and dedicated customer support, we make your international move efficient, secure, and worry-free.'
      ]
    },
    {
      title: 'Embassy & Diplomatic Relocation',
      image: 'images/relocation-packing-v2.jpg',
      paragraphs: [
        'MS Logistics specialises in relocation services for embassies, diplomatic missions, international organisations, and expatriate professionals. We understand the importance of confidentiality, precision, and timely execution, ensuring every relocation is handled with the highest level of professionalism and care.',
        'Our services include professional packing, freight coordination, customs documentation support, secure warehousing, and complete door-to-door delivery. A dedicated project coordinator oversees every stage of the relocation, providing regular updates and ensuring a seamless moving experience that meets diplomatic standards.'
      ]
    },
    {
      title: 'Corporate & Office Relocation',
      image: 'images/relocation-packing-v2.jpg',
      paragraphs: [
        'We help businesses relocate efficiently with minimal disruption to daily operations. From offices and corporate headquarters to institutional facilities, our team carefully plans and manages every aspect of the move, ensuring office furniture, equipment, documents, and technology are transported safely and systematically.',
        'Our end-to-end relocation solutions include packing, transportation, inventory management, storage, and final setup coordination. With experienced professionals and a structured approach, MS Logistics delivers reliable corporate relocation services that allow your business to resume operations quickly and efficiently.'
      ]
    },
    {
      title: 'Air Freight Services',
      image: 'images/air-freight-v2.jpg',
      paragraphs: [
        'Our air freight services are ideal for clients who require fast, secure, and reliable international transportation of household goods. Every shipment is professionally packed, documented, and coordinated to ensure timely departure and smooth handling from origin to destination.',
        'From export packing and airline coordination to shipment tracking and final delivery, we manage the entire process with precision. Our experienced team ensures your belongings arrive safely while meeting international aviation and customs requirements.'
      ]
    },
    {
      title: 'Sea Freight Services',
      image: 'images/freight-containers.jpg',
      paragraphs: [
        'Sea freight is a cost-effective solution for medium and large international household shipments. We provide complete sea freight management, including export packing, container booking, documentation support, customs coordination, and final delivery to destinations worldwide.',
        'Using moisture-resistant packing materials, customised wooden crating, and secure container loading techniques, we protect your belongings throughout long-distance ocean transportation. Every shipment is handled according to international shipping standards for maximum safety and reliability.'
      ]
    },
    {
      title: 'Customs Documentation & Clearance Support',
      image: 'images/relocation-packing.jpg',
      paragraphs: [
        'International relocations involve complex documentation and customs procedures. Our experienced team assists with preparing the required paperwork, coordinating export formalities, and supporting customs clearance to help minimise delays and ensure smooth shipment processing.',
        'We work closely with clients and relevant authorities to manage documentation, packing list verification, and customs coordination. By handling these important procedures professionally, we make international moving simpler and more efficient.'
      ]
    },
    {
      title: 'Secure Warehousing & Storage',
      image: 'images/secure-warehouse.jpg',
      paragraphs: [
        'MS Logistics offers secure short-term and long-term warehousing solutions for household goods, office equipment, and export shipments. Our warehouse is designed to keep your belongings safe, organised, and protected until they are ready for transportation or delivery.',
        'Every shipment is systematically inventoried and stored using professional handling practices to ensure easy retrieval and maximum protection. Whether you require temporary storage during relocation or long-term warehousing, we provide a safe and reliable storage solution.'
      ]
    },
    {
      title: 'Professional Export Packing',
      image: 'images/relocation-packing.jpg',
      paragraphs: [
        'Proper packing is the foundation of every successful relocation. Our trained packing specialists use premium export-quality materials such as 7-Ply & 9-Ply export cartons, corrugated sheets & kraft paper, bubble wrap, foam & thermocol, moisture protection (plastic sheeting, silica gel), labeling, sealing & inventory numbering and customised wooden crates to protect your belongings throughout transportation.',
        'Every item is packed according to its size, weight, and fragility, while each carton is clearly labelled and inventoried for efficient handling, customs inspection, and delivery. Our professional packing standards ensure your belongings remain secure from origin to destination.'
      ]
    },
    {
      title: 'Door-to-Door Relocation Management',
      image: 'images/relocation-packing-v2.jpg',
      paragraphs: [
        'Our door-to-door relocation service provides complete management of your move from the initial survey to final delivery. We coordinate packing, transportation, freight, customs support, warehousing, and delivery, ensuring every stage is handled by experienced professionals.',
        'With a single point of coordination and regular shipment updates, you can enjoy a seamless relocation experience without the stress of managing multiple service providers. MS Logistics delivers a comprehensive solution designed for convenience, reliability, and complete peace of mind.'
      ]
    }
  ];

  const PROJECTS = [
    {
      title: 'Household Move',
      location: 'Kathmandu, Nepal',
      duration: 'Residential',
      budget: 'Door-to-Door',
      image: 'images/household-move.jpg',
      desc: 'Export-quality packing for a complete household relocation with zero-damage handling. Professional movers carefully packed, transported, and delivered every item across all 77 districts.'
    },
    {
      title: 'Corporate Cargo',
      location: 'Lalitpur, Nepal',
      duration: 'Commercial',
      budget: 'Asset Tracking',
      image: 'images/corporate-cargo.jpg',
      desc: 'Office relocation with project management and full business-continuity planning. Completed ahead of schedule with GPS-equipped fleet tracking and minimal business disruption.'
    },
    {
      title: 'Diplomatic Move',
      location: 'Embassy District, Kathmandu',
      duration: 'Diplomatic',
      budget: 'Confidential',
      image: 'images/diplomatic-move.jpg',
      desc: 'Protocol-aware embassy relocation with direct customs links and discreet handling. Every item arrived without a single scratch, trusted by diplomatic missions for confidential moves.'
    },
    {
      title: 'Air Freight Shipment',
      location: 'Tribhuvan International Airport',
      duration: 'Freight',
      budget: 'Global Air',
      image: 'images/air-freight.jpg',
      desc: 'Global air freight routing via TIA with real-time coordination and customs clearance. Multi-modal freight network connecting Nepal to international destinations with zero-damage commitment.'
    },
    {
      title: 'Secure Storage',
      location: 'Balkumari, Lalitpur',
      duration: 'Warehousing',
      budget: '24/7 Security',
      image: 'images/secure-storage.jpg',
      desc: 'Climate-controlled, GPS-monitored warehousing with full inventory tracking. Secure storage hub providing complete peace of mind for household and commercial goods.'
    },
    {
      title: 'Ocean Freight',
      location: 'Kolkata & Haldia Ports',
      duration: 'International',
      budget: 'Sea Freight',
      image: 'images/ocean-freight.jpg',
      desc: 'Multi-modal ocean freight via Kolkata and Haldia ports with cross-border customs integration. Seamless international shipping with direct customs links and zero-damage standard.'
    }
  ];

  /* --- Loading Screen --- */
  function initLoader() {
    let progress = 0;
    const interval = setInterval(function () {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(function () {
          loader.classList.add('hidden');
          document.body.classList.add('loaded');
        }, 400);
      }
      loaderProgress.style.width = progress + '%';
    }, 150);
  }

  /* --- Sticky Header --- */
  function initHeader() {
    const isInnerPage = document.body.classList.contains('page-inner');

    if (isInnerPage) {
      header.classList.remove('header--transparent');
      header.classList.add('header--scrolled');
      return;
    }

    header.classList.add('header--transparent');

    function updateHeader() {
      if (window.scrollY > 80) {
        header.classList.remove('header--transparent');
        header.classList.add('header--scrolled');
      } else {
        header.classList.add('header--transparent');
        header.classList.remove('header--scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* --- Mobile Navigation --- */
  function initMobileNav() {
    if (!hamburgerBtn || !mainNav) return;
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('.header__link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Smooth Scroll & Active Nav --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = header.offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* --- Page-based Active Navigation --- */
  function initPageNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header__link');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const isHome = (currentPage === '' || currentPage === 'index.html') && href === 'index.html';
      const isMatch = href === currentPage;

      link.classList.toggle('active', isHome || isMatch);
    });
  }

  /* --- Scroll Progress Bar --- */
  function initScrollProgress() {
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
      scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
    }, { passive: true });
  }

  /* --- Back To Top --- */
  function initBackToTop() {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Button Ripple Effect --- */
  function initRipple() {
    document.querySelectorAll('.btn--ripple').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
      });
    });
  }

  /* --- Contact Form Validation --- */
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = {
        name: { el: document.getElementById('name'), error: document.getElementById('nameError'), validate: function (v) { return v.trim().length >= 2; }, msg: 'Please enter your full name' },
        email: { el: document.getElementById('email'), error: document.getElementById('emailError'), validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'Please enter a valid email' },
        phone: { el: document.getElementById('phone'), error: document.getElementById('phoneError'), validate: function (v) { return !v || /^[\d\s\-()+ ]{7,}$/.test(v); }, msg: 'Please enter a valid phone number' },
        service: { el: document.getElementById('service'), error: document.getElementById('serviceError'), validate: function (v) { return v !== ''; }, msg: 'Please select a service' },
        message: { el: document.getElementById('message'), error: document.getElementById('messageError'), validate: function (v) { return v.trim().length >= 10; }, msg: 'Message must be at least 10 characters' }
      };

      Object.keys(fields).forEach(function (key) {
        const field = fields[key];
        const value = field.el.value;
        field.error.textContent = '';
        field.el.classList.remove('error');

        if (!field.validate(value)) {
          field.error.textContent = field.msg;
          field.el.classList.add('error');
          valid = false;
        }
      });

      if (valid) {
        document.getElementById('formSuccess').hidden = false;
        contactForm.reset();
        setTimeout(function () {
          document.getElementById('formSuccess').hidden = true;
        }, 5000);
      }
    });
  }

  /* --- Newsletter Form --- */
  function initNewsletter() {
    if (!newsletterForm) return;
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletterForm.reset();
      alert('Thank you for subscribing!');
    });
  }

  /* --- Video Modal --- */
  function initVideoModal() {
    if (!videoPlayBtn || !videoModal) return;
    function openModal() {
      videoModal.hidden = false;
      requestAnimationFrame(function () {
        videoModal.classList.add('active');
      });
      videoIframe.src = VIDEO_URL;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      videoModal.classList.remove('active');
      videoIframe.src = '';
      document.body.style.overflow = '';
      setTimeout(function () { videoModal.hidden = true; }, 300);
    }

    videoPlayBtn.addEventListener('click', openModal);
    videoModalClose.addEventListener('click', closeModal);
    videoModalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !videoModal.hidden) closeModal();
    });
  }

  /* --- Service Modal --- */
  function initServiceModal() {
    if (!serviceModal || !serviceModalClose || !serviceModalBackdrop || !serviceModalBody) return;

    function openService(index) {
      const service = SERVICES[index];
      if (!service) return;

      const paragraphsHtml = service.paragraphs.map(function (paragraph) {
        return '<p>' + paragraph + '</p>';
      }).join('');

      serviceModalBody.innerHTML =
        '<div class="modal__service-header"><h3>' + service.title + '</h3></div>' +
        '<img src="' + service.image + '" alt="' + service.title + '">' +
        '<div class="modal__service-body">' + paragraphsHtml + '</div>';

      serviceModal.hidden = false;
      requestAnimationFrame(function () {
        serviceModal.classList.add('active');
      });
      document.body.style.overflow = 'hidden';
    }

    function closeService() {
      serviceModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () { serviceModal.hidden = true; }, 300);
    }

    document.querySelectorAll('.stack-card__link').forEach(function (button) {
      button.addEventListener('click', function () {
        const card = this.closest('.stack-card');
        if (card) openService(parseInt(card.dataset.index, 10));
      });
    });

    serviceModalClose.addEventListener('click', closeService);
    serviceModalBackdrop.addEventListener('click', closeService);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !serviceModal.hidden) closeService();
    });
  }

  /* --- Project Modal --- */
  function initProjectModal() {
    if (!projectModal || !projectModalBody) return;
    function openProject(index) {
      const project = PROJECTS[index];
      if (!project) return;

      projectModalBody.innerHTML =
        '<img src="' + project.image + '" alt="' + project.title + '">' +
        '<h3>' + project.title + '</h3>' +
        '<div class="project-meta">' +
          '<span>' + project.location + '</span>' +
          '<span>' + project.duration + '</span>' +
          '<span>' + project.budget + '</span>' +
        '</div>' +
        '<p>' + project.desc + '</p>';

      projectModal.hidden = false;
      requestAnimationFrame(function () {
        projectModal.classList.add('active');
      });
      document.body.style.overflow = 'hidden';
    }

    function closeProject() {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () { projectModal.hidden = true; }, 300);
    }

    document.querySelectorAll('.project-card__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openProject(parseInt(this.dataset.project, 10));
      });
    });

    projectModalClose.addEventListener('click', closeProject);
    projectModalBackdrop.addEventListener('click', closeProject);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !projectModal.hidden) closeProject();
    });
  }

  /* --- Project Filters --- */
  function initProjectFilters() {
    const filters = document.querySelectorAll('.projects__filter');
    const cards = document.querySelectorAll('.project-card');

    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        const category = this.dataset.filter;

        filters.forEach(function (f) {
          f.classList.remove('active');
          f.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        cards.forEach(function (card) {
          const categories = card.dataset.category.split(' ');
          if (category === 'all' || categories.includes(category)) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeUp 0.5s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* --- Custom Cursor --- */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .stack-card, .project-card, .team-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursorRing.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursorRing.classList.remove('hover'); });
    });
  }

  /* --- Initialize --- */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initPageNav();
    initScrollProgress();
    initBackToTop();
    initRipple();
    initContactForm();
    initNewsletter();
    if (videoPlayBtn) initVideoModal();
    initServiceModal();
    initProjectModal();
    initProjectFilters();
    initCursor();
  });
})();
