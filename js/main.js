// ===== DOM Elements =====
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const projectCards = document.querySelectorAll('.project-card');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const sections = document.querySelectorAll('.section-container');

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMobileMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===== Modal Functionality =====
const caseStudyMap = {
    'dayflow': 'case-study-dayflow',
    'oracle-rag': 'case-study-oracle-rag',
    'ats': 'case-study-ats',
    'solobite': 'case-study-solobite',
    'debubble': 'case-study-debubble'
};

function openModal(projectId) {
    const templateId = caseStudyMap[projectId];
    const template = document.getElementById(templateId);

    if (template) {
        modalContent.innerHTML = '';
        modalContent.appendChild(template.content.cloneNode(true));
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize collapsible sections in modal
        initCollapsibles();
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Project card click handlers
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking external link
        if (e.target.closest('.project-external')) {
            return;
        }
        const projectId = card.dataset.project;
        openModal(projectId);
    });
});

// Close modal handlers
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// ===== Collapsible Sections =====
function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('.collapsible-header');

        header.addEventListener('click', () => {
            collapsible.classList.toggle('open');
        });
    });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Hide/Show on Scroll =====
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ===== Prevent external link clicks from triggering modal =====
document.querySelectorAll('.project-external').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Add visible class to hero section immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ===== Handle broken images gracefully =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});
