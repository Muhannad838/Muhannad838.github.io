// Skills marquee — duplicate items for seamless loop
(function initMarquee() {
    const marquee = document.getElementById('marquee');
    const skills = [
        'Flutter', 'Dart', 'Python', 'Java', 'SQL', 'Firebase', 'Git',
        'UI/UX Design', 'Riverpod', 'Hive DB', 'scikit-learn', 'pandas',
        'Data Mining', 'Microsoft Excel', 'Project Management'
    ];
    // Render two sets for seamless loop
    const html = skills.map(s => `<span class="skill-pill">${s}</span>`).join('');
    marquee.innerHTML = html + html;
})();

// Mobile hamburger menu
(function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
})();

// Scroll reveal with IntersectionObserver
(function initScrollReveal() {
    const sections = document.querySelectorAll('section:not(.hero):not(.skills-section)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    sections.forEach(section => observer.observe(section));
})();

// Active nav highlight on scroll
(function initActiveNav() {
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sectionIds = Array.from(navAnchors).map(a => a.getAttribute('href').slice(1));

    function updateActive() {
        let current = '';
        for (const id of sectionIds) {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 120) {
                    current = id;
                }
            }
        }
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();

// Sticky nav shadow
(function initNavShadow() {
    const nav = document.getElementById('nav');
    const hero = document.getElementById('hero');

    function checkScroll() {
        const heroBottom = hero.getBoundingClientRect().bottom;
        nav.classList.toggle('scrolled', heroBottom < 64);
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
})();

// Form validation
(function initFormValidation() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        let valid = true;
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        // Reset errors
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        if (!name.value.trim()) {
            name.closest('.form-group').classList.add('error');
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (!message.value.trim()) {
            message.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
        }
    });
})();
