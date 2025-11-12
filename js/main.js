// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Enhanced mobile zoom prevention
function preventMobileZoom() {
    // Add viewport meta tag enforcement
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no');
    }

    // Function to apply zoom prevention to an input element
    function applyZoomPrevention(input) {
        // Ensure font size is at least 16px to prevent zoom
        const computedStyle = window.getComputedStyle(input);
        const fontSize = parseFloat(computedStyle.fontSize);
        if (fontSize < 16) {
            input.style.fontSize = '16px';
        }

        // Add focus event listener if not already added
        if (!input.hasAttribute('data-zoom-prevention-applied')) {
            input.addEventListener('focus', function(e) {
                // Prevent zoom by ensuring font size is 16px or larger
                const currentStyle = window.getComputedStyle(this);
                const currentFontSize = parseFloat(currentStyle.fontSize);
                if (currentFontSize < 16) {
                    this.style.fontSize = '16px';
                }

                // Additional prevention measures
                this.style.webkitTextSizeAdjust = '100%';
                this.style.textSizeAdjust = '100%';

                // Force a reflow to ensure styles are applied
                this.offsetHeight;
            });

            input.addEventListener('blur', function() {
                // Reset font size if it was changed for zoom prevention
                if (this.style.fontSize === '16px' && !this.hasAttribute('data-original-font-size')) {
                    this.style.fontSize = '';
                }
            });

            // Mark as processed
            input.setAttribute('data-zoom-prevention-applied', 'true');
        }
    }

    // Apply to existing inputs
    const inputs = document.querySelectorAll('input, textarea, select, [contenteditable="true"]');
    inputs.forEach(applyZoomPrevention);

    // Watch for dynamically added inputs (like chat widgets)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check if the node itself is an input
                    if (node.matches && node.matches('input, textarea, select, [contenteditable="true"]')) {
                        applyZoomPrevention(node);
                    }

                    // Check for inputs within the added node
                    const nestedInputs = node.querySelectorAll && node.querySelectorAll('input, textarea, select, [contenteditable="true"]');
                    if (nestedInputs) {
                        nestedInputs.forEach(applyZoomPrevention);
                    }
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Additional global event listener for any missed inputs
    document.addEventListener('focusin', function(e) {
        const target = e.target;
        if (target && (target.matches('input, textarea, select, [contenteditable="true"]'))) {
            if (!target.hasAttribute('data-zoom-prevention-applied')) {
                applyZoomPrevention(target);
            }
        }
    }, true);
}

// Initialize mobile zoom prevention on all devices (not just mobile)
// This ensures it works even if user agent detection fails
preventMobileZoom();

// Additional initialization for mobile devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Force viewport settings on mobile
    document.addEventListener('DOMContentLoaded', function() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no');
        }
    });
}

// Log page load
console.log('🔥 The Freedom Forge - Forging Your Path to Freedom! 🔥');
