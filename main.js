document.addEventListener('DOMContentLoaded', () => {

    // ── 스크롤 리빌 (reveal + slide-left/right/up 모두 처리) ──
    const animEls = document.querySelectorAll('.reveal, .slide-left, .slide-right, .slide-up, .slide-img');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });

    animEls.forEach(el => observer.observe(el));

    // 이미지 로드 전에 observer가 놓친 요소를 페이지 완전 로드 후 강제 활성화
    window.addEventListener('load', () => {
        animEls.forEach(el => {
            if (!el.classList.contains('active')) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('active');
                }
            }
        });
    });

    // ── 네비바 스크롤 효과 ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── 부드러운 앵커 스크롤 ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── 햄버거 메뉴 ──
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('navOverlay');
    if (hamburger) {
        const closeMenu = () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            navOverlay.classList.remove('open');
        };
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
            navOverlay.classList.toggle('open');
        });
        navOverlay.addEventListener('click', closeMenu);
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    }

    // ── 히어로 텍스트 패럴랙스 ──
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroContent.style.transform = `translateY(${y * 0.25}px)`;
            heroContent.style.opacity = 1 - y / 500;
        }, { passive: true });
    }
});
