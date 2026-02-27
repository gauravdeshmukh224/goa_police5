/* Global toggleSidebar function for HTML onclick handlers */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    if (sidebar) {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('show-sidebar');
    }
    if (hamburger) {
        hamburger.classList.toggle('open');
    }
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.toggle('show');
    }
}

/* JavaScript toggle functionality for dropdowns */
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        const link = this.querySelector('a');
        if (e.target === link || link.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(other => {
                if (other !== this) {
                    other.classList.remove('active');
                }
            });
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown') && !e.target.closest('.sidebar')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// HAMBURGER NAV TOGGLE (insert on right of header)
(function(){
    const header = document.querySelector('.mla-header');
    const headerTitle = header?.querySelector('.header-title') || header || document.body;
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label','Toggle navigation');
    hamburger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    // Append hamburger on the right side
    headerTitle.appendChild(hamburger);
    hamburger.classList.add('right');
    header.classList.add('has-right-hamburger');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Click handler for hamburger button
    hamburger.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
            sidebar.classList.toggle('show-sidebar');
        }
        this.classList.toggle('open');
        overlay.classList.toggle('show');
    });

    // Click handler for overlay to close sidebar
    overlay.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
            sidebar.classList.remove('show-sidebar');
        }
        hamburger.classList.remove('open');
        this.classList.remove('show');
    });

    window.addEventListener('resize', function(){
        if (window.innerWidth > 900) {
            document.querySelector('.sidebar')?.classList.remove('open');
            hamburger.classList.remove('open');
            overlay.classList.remove('show');
        }
    });
})();

// adjust container top margin based on header height to avoid extra whitespace
function adjustContainerSpacing() {
    const header = document.querySelector('.mla-header');
    const container = document.querySelector('.container');
    if (header && container) {
        container.style.marginTop = header.offsetHeight + 'px';
    }
}
window.addEventListener('load', adjustContainerSpacing);
window.addEventListener('resize', adjustContainerSpacing);
