document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Enhance hover animation to category sections
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            category.style.transform = 'translateY(-7px)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            category.style.transform = 'translateY(0)';
        });
    });

    // Fix icon for DuckDuckGo (Font Awesome doesn't have it)
    const duckDuckGoIcon = document.querySelector('.fa-duck');
    if (duckDuckGoIcon) {
        duckDuckGoIcon.classList.remove('fas', 'fa-duck');
        duckDuckGoIcon.classList.add('fas', 'fa-search');
        duckDuckGoIcon.style.color = 'var(--accent-color)';
    }

    // Add custom icons with consistent color scheme
    const icons = document.querySelectorAll('.link-card i');
    icons.forEach(icon => {
        // Reset any inline color styles to use the theme color
        icon.style.color = 'var(--accent-color)';
        
        // Add subtle shadow effect to icons
        icon.style.textShadow = '0 3px 10px rgba(0, 0, 0, 0.15)';
        
        // Randomize the animation delay
        const randomDelay = Math.random() * 3;
        icon.style.animationDelay = `${randomDelay}s`;
    });

    // Add floating animation to category decorations
    const categoryDecorations = document.querySelectorAll('.category-decoration');
    categoryDecorations.forEach(dot => {
        dot.style.animation = 'float 8s ease-in-out infinite';
    });

    // Add a subtle parallax effect
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.category').forEach(category => {
            const depth = 15;
            const moveX = (x * depth - depth/2);
            const moveY = (y * depth - depth/2);
            
            // Apply subtle movement to decoration elements
            const decorations = category.querySelectorAll('.category-decoration, .smallDot');
            decorations.forEach(el => {
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    });

    // Filter links by search
    function filterLinks() {
        const filterValue = searchInput.value.toLowerCase();
        const links = document.querySelectorAll('.link-card');
        const categories = document.querySelectorAll('.category');
        
        if (filterValue === '') {
            // Show all links and categories
            links.forEach(link => link.style.display = 'flex');
            categories.forEach(category => category.style.display = 'block');
            return;
        }
        
        // Hide/show links based on search
        categories.forEach(category => {
            const categoryTitle = category.querySelector('h2').textContent.toLowerCase();
            const categoryLinks = category.querySelectorAll('.link-card');
            let hasVisibleLinks = false;
            
            categoryLinks.forEach(link => {
                const text = link.querySelector('span').textContent.toLowerCase();
                
                if (text.includes(filterValue) || categoryTitle.includes(filterValue)) {
                    link.style.display = 'flex';
                    hasVisibleLinks = true;
                } else {
                    link.style.display = 'none';
                }
            });
            
            // Hide/show category based on if it has visible links
            category.style.display = hasVisibleLinks ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', filterLinks);

    // Add beautiful hover animation for search input
    const searchContainer = document.querySelector('.search-container');
    
    searchInput.addEventListener('focus', () => {
        searchContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        searchContainer.style.border = '1px solid rgba(255, 255, 255, 0.5)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchContainer.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        searchContainer.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    });

    // Add animated background elements
    function createBackgroundElements() {
        const main = document.querySelector('main');
        for (let i = 0; i < 6; i++) {
            const element = document.createElement('div');
            element.classList.add('bg-element');
            element.style.position = 'absolute';
            element.style.width = `${Math.random() * 200 + 50}px`;
            element.style.height = element.style.width;
            element.style.borderRadius = '50%';
            element.style.background = 'radial-gradient(circle, rgba(93, 156, 236, 0.05) 0%, rgba(93, 156, 236, 0) 70%)';
            element.style.top = `${Math.random() * 100}%`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.zIndex = '-1';
            element.style.pointerEvents = 'none';
            element.style.transform = 'translate(-50%, -50%)';
            element.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
            document.body.appendChild(element);
        }
    }
    createBackgroundElements();

    // Improve logo and search bar animation on page load
    const logo = document.querySelector('.logo-container');
    
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)';
    logo.style.transition = 'opacity 1s ease, transform 1s ease';
    
    searchContainer.style.opacity = '0';
    searchContainer.style.transform = 'translateY(20px)';
    searchContainer.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        searchContainer.style.opacity = '1';
        searchContainer.style.transform = 'translateY(0)';
    }, 600);

    // Add @keyframes for floating animation to the document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Enhanced animation for category headers
    document.querySelectorAll('.category h2').forEach((header, index) => {
        header.style.opacity = '0';
        header.style.transform = 'translateX(-20px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateX(0)';
        }, 300 + index * 150);
    });

    // Enhance link cards animation on page load
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + index * 40); 
        
        // Ensure hover color is consistent
        card.addEventListener('mouseover', () => {
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.color = 'var(--accent-color)';
                icon.style.background = 'rgba(77, 139, 230, 0.18)';
            }
        });
    });

    // Add subtle background animation to categories
    categories.forEach((category, index) => {
        // Create a decorative dot pattern for each category
        const dot = document.createElement('div');
        dot.classList.add('category-decoration');
        dot.style.position = 'absolute';
        dot.style.bottom = '-20px';
        dot.style.right = '-20px';
        dot.style.width = '150px';
        dot.style.height = '150px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(93, 156, 236, 0.05)';
        dot.style.zIndex = '0';
        
        // Add additional decoration elements
        const smallDot = document.createElement('div');
        smallDot.classList.add('smallDot');
        smallDot.style.position = 'absolute';
        smallDot.style.top = '20px';
        smallDot.style.left = '30px';
        smallDot.style.width = '80px';
        smallDot.style.height = '80px';
        smallDot.style.borderRadius = '50%';
        smallDot.style.background = 'rgba(93, 156, 236, 0.03)';
        smallDot.style.zIndex = '0';
        
        // Animated wave decoration
        const wave = document.createElement('div');
        wave.style.position = 'absolute';
        wave.style.top = '0';
        wave.style.right = '0';
        wave.style.width = '100%';
        wave.style.height = '4px';
        wave.style.background = 'linear-gradient(90deg, transparent, rgba(93, 156, 236, 0.2), transparent)';
        wave.style.zIndex = '0';
        wave.style.opacity = '0';
        wave.style.transition = 'opacity 0.3s ease';
        
        category.style.position = 'relative';
        category.style.overflow = 'hidden';
        category.appendChild(dot);
        category.appendChild(smallDot);
        category.appendChild(wave);
        
        category.addEventListener('mouseenter', () => {
            wave.style.opacity = '1';
        });
        
        category.addEventListener('mouseleave', () => {
            wave.style.opacity = '0';
        });
        
        // Add pulsing animation to icons
        const icon = category.querySelectorAll('.link-card i');
        icon.forEach(icon => {
            icon.style.transition = 'transform 0.5s ease, background 0.3s ease';
            setInterval(() => {
                icon.style.transform = 'scale(1.08)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 600);
            }, 3000 + Math.random() * 2000); 
        });
    });

    // Add subtle header animation
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            header.style.background = 'linear-gradient(135deg, #2c3e50, #4a6fa5)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'var(--gradient-bg)';
            header.style.boxShadow = '0 10px 30px rgba(58, 110, 165, 0.2)';
        }
    });

    // Add hover effect to search button
    searchButton.addEventListener('mouseenter', () => {
        searchButton.style.transform = 'scale(1.05)';
    });
    
    searchButton.addEventListener('mouseleave', () => {
        searchButton.style.transform = 'scale(1)';
    });
});