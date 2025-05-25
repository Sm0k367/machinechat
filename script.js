document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // Ensure targetId is not just "#"
            if (targetId.length > 1) {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight + 10; // 10px buffer
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Update active link state
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Smooth scrolling for CTA buttons
    const ctaLinks = document.querySelectorAll('a.cta-button[href^="#"], a.cta-button-nav[href^="#"]');
    ctaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
             if (targetId.length > 1) {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight + 10; // 10px buffer
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const mainNavLinks = document.getElementById('main-nav-links');

    if (hamburgerButton && mainNavLinks) {
        hamburgerButton.addEventListener('click', () => {
            mainNavLinks.classList.toggle('active');
            hamburgerButton.classList.toggle('open');
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        });

        // Optional: Close menu when a link is clicked (useful for single-page apps)
        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavLinks.classList.contains('active')) {
                    mainNavLinks.classList.remove('active');
                    hamburgerButton.classList.remove('open');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Intersection Observer for animations on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .hero-text, .hero-image-container, .why-us-text, .why-us-visual, .ar-mockup-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('hero-text') || entry.target.classList.contains('why-us-text')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('hero-image-container') || entry.target.classList.contains('why-us-visual')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                     entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target); // Optional: stop observing after animation
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Initially hide
        // Apply initial transform based on planned animation direction
        if (el.classList.contains('hero-text') || el.classList.contains('why-us-text')) {
            el.style.transform = 'translateX(-50px)';
        } else if (el.classList.contains('hero-image-container') || el.classList.contains('why-us-visual')) {
            el.style.transform = 'translateX(50px)';
        } else {
            el.style.transform = 'translateY(50px)';
        }
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Simple typing effect for chat demo (conceptual)
    const chatInput = document.querySelector('.chat-input input');
    const chatSendButton = document.querySelector('.chat-input button');
    const chatMessagesContainer = document.querySelector('.chat-messages');
    const epicTechAIDev2_0AvatarSrc = document.querySelector('.ai-message .chat-avatar')?.src; // Get Epic tech AI dev 2.0's avatar

    if (chatInput && chatSendButton && chatMessagesContainer && epicTechAIDev2_0AvatarSrc) {
        chatSendButton.addEventListener('click', ()_ => {
            const userText = chatInput.value.trim();
            if (userText) {
                // Display user message
                const userMessageDiv = document.createElement('div');
                userMessageDiv.classList.add('message', 'user-message');
                userMessageDiv.innerHTML = `<p>${userText}</p>`;
                chatMessagesContainer.appendChild(userMessageDiv);
                chatInput.value = ''; // Clear input

                // Simulate Epic tech AI dev 2.0's response
                setTimeout(() => {
                    const auraResponseDiv = document.createElement('div');
                    auraResponseDiv.classList.add('message', 'ai-message');
                    let auraResponseText = "I'm processing your request... This is a conceptual demonstration. For a full interaction, please await the Epic tech AI dev 2.0 platform launch!";
                    if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
                        auraResponseText = "Hello there! How can I assist you conceptually today?";
                    } else if (userText.toLowerCase().includes("report")) {
                        auraResponseText = "Generating a conceptual report. Imagine intricate holographic data visualizations appearing before you now!";
                    }
                    auraResponseDiv.innerHTML = `
                        <img src="${epicTechAIDev2_0AvatarSrc}" alt="Epic tech AI dev 2.0 Avatar" class="chat-avatar">
                        <p>${auraResponseText}</p>
                    `;
                    chatMessagesContainer.appendChild(auraResponseDiv);
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to new message
                }, 1000 + Math.random() * 1000); // Random delay for realism
            }
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to new message
        });

        // Allow sending with Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                chatSendButton.click();
            }
        });
    }
    
    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust for fixed header height if necessary
            if (pageYOffset >= (sectionTop - sectionHeight / 3 - document.querySelector('header').offsetHeight)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        // If no section is "current" (e.g., at the very top or bottom), clear active states or set to home/first link
        if (!current && navLinks.length > 0) {
             // Optionally, highlight the first link if at the top
            // navLinks[0].classList.add('active'); 
        }
    });


});