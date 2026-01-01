// DOM Elements
const initialScreen = document.getElementById('initialScreen');
const resultsScreen = document.getElementById('resultsScreen');
const doxButton = document.getElementById('doxButton');
const resetButton = document.getElementById('resetButton');
const leakButton = document.getElementById('leakButton');
const leakStatus = document.getElementById('leakStatus');
const leakSuccess = document.getElementById('leakSuccess');

// Initialize animations
initAnimations();

// Switch to results screen
doxButton.addEventListener('click', function() {
    // Add loading animation to button
    const buttonText = this.querySelector('.button-text');
    const buttonIcon = this.querySelector('.button-icon');
    const originalText = buttonText.textContent;
    const originalIcon = buttonIcon.innerHTML;
    
    buttonText.textContent = 'scanning...';
    buttonIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    this.disabled = true;
    this.style.transform = 'scale(0.95)';
    
    // Add particle effect
    createParticles(this);
    
    // Simulate scanning delay
    setTimeout(() => {
        // Switch screens with smooth animation
        initialScreen.style.opacity = '0';
        initialScreen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            initialScreen.classList.remove('active');
            resultsScreen.classList.add('active');
            
            // Reset button state
            setTimeout(() => {
                buttonText.textContent = originalText;
                buttonIcon.innerHTML = originalIcon;
                doxButton.disabled = false;
                doxButton.style.transform = '';
            }, 500);
            
            // Start gathering information
            gatherInformation();
        }, 600);
    }, 1500);
});

// Reset to initial screen
resetButton.addEventListener('click', function() {
    // Add animation to button
    this.style.transform = 'scale(0.95)';
    createParticles(this);
    
    setTimeout(() => {
        resultsScreen.style.opacity = '0';
        resultsScreen.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultsScreen.classList.remove('active');
            initialScreen.classList.add('active');
            
            // Reset screen styles
            setTimeout(() => {
                resultsScreen.style.opacity = '';
                resultsScreen.style.transform = '';
                this.style.transform = '';
            }, 500);
        }, 600);
    }, 300);
});

// Leak button functionality
leakButton.addEventListener('click', function() {
    // Hide leak button and show loading status
    this.style.opacity = '0';
    this.style.transform = 'scale(0.9)';
    this.style.pointerEvents = 'none';
    
    setTimeout(() => {
        this.style.display = 'none';
        leakStatus.style.display = 'block';
        
        // Simulate data leak process
        setTimeout(() => {
            leakStatus.style.opacity = '0';
            leakStatus.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                leakStatus.style.display = 'none';
                leakSuccess.style.display = 'flex';
                leakSuccess.style.alignItems = 'center';
                leakSuccess.style.justifyContent = 'center';
                
                // Add celebration particles
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => createLeakParticles(), i * 100);
                }
            }, 500);
        }, 3000);
    }, 300);
});

// Gather and display information
async function gatherInformation() {
    // Animate cards appearing
    const infoCards = document.querySelectorAll('.info-card');
    
    // Get IP address
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        animateValueChange('ipAddress', ipData.ip);
    } catch (error) {
        animateValueChange('ipAddress', 'Not available');
    }
    
    // Network information
    animateValueChange('connectionType', 
        navigator.connection ? (navigator.connection.effectiveType || 'Unknown') : 'Unknown');
    animateValueChange('onlineStatus', navigator.onLine ? 'Online' : 'Offline');
    
    // Browser information
    animateValueChange('browserName', getBrowserName());
    animateValueChange('platform', navigator.platform);
    animateValueChange('language', navigator.language);
    animateValueChange('cookiesEnabled', navigator.cookieEnabled ? 'Yes' : 'No');
    
    // System information
    animateValueChange('screenResolution', 
        `${window.screen.width} × ${window.screen.height}`);
    animateValueChange('colorDepth', `${window.screen.colorDepth} bit`);
    
    // Time and location
    animateValueChange('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    
    const now = new Date();
    animateValueChange('localTime', 
        `${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
    
    // Request geolocation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                animateValueChange('geolocation', `${lat}, ${lon}`);
            },
            () => {
                animateValueChange('geolocation', 'Permission denied');
            },
            { timeout: 8000 }
        );
    } else {
        animateValueChange('geolocation', 'Not supported');
    }
    
    // Animate cards one by one
    infoCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('reveal');
        }, index * 200 + 500);
    });
}

// Detect browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Internet";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
    if (userAgent.indexOf("Trident") > -1) return "Internet Explorer";
    if (userAgent.indexOf("Edge") > -1) return "Edge";
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    
    return "Unknown Browser";
}

// Animate value changes
function animateValueChange(elementId, newValue) {
    const element = document.getElementById(elementId);
    const oldValue = element.textContent;
    
    element.style.opacity = '0.5';
    element.style.transform = 'translateY(5px)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 300);
}

// Initialize animations
function initAnimations() {
    // Add hover effect to info cards
    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Create particle effect
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = i % 2 === 0 ? '#4fc3f7' : '#ff4081';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let opacity = 1;
        let size = 6;
        const animate = () => {
            opacity -= 0.03;
            size -= 0.1;
            particle.style.opacity = opacity;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
            particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
            
            if (opacity > 0 && size > 0) {
                requestAnimationFrame(animate);
            } else {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }
        };
        
        animate();
    }
}

// Create leak celebration particles
function createLeakParticles() {
    const colors = ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b'];
    const board = document.querySelector('.doxxing-board');
    const rect = board.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = `${rect.left + Math.random() * rect.width}px`;
        particle.style.top = `${rect.top + Math.random() * rect.height}px`;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const vx = (Math.random() - 0.5) * 8;
        const vy = (Math.random() - 0.5) * 8 - 5;
        
        let opacity = 1;
        const animate = () => {
            opacity -= 0.02;
            particle.style.opacity = opacity;
            particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
            particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
            vy += 0.2; // gravity
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }
        };
        
        animate();
    }
}

// Add console message
console.log(
    "%c🚀 SelfDoxxer - A Space-Themed Joke 🚀\n%cThis is a fun website showing what information websites can access.",
    "color: #4fc3f7; font-size: 14px; font-weight: bold;",
    "color: #b3e5fc; font-size: 11px;"
);
