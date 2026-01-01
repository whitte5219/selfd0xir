// DOM Elements
const initialScreen = document.getElementById('initialScreen');
const resultsScreen = document.getElementById('resultsScreen');
const doxButton = document.getElementById('doxButton');
const resetButton = document.getElementById('resetButton');
const shareButton = document.getElementById('shareButton');
const currentYear = document.getElementById('currentYear');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Animation for the dox button
doxButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
});

doxButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Switch to results screen
doxButton.addEventListener('click', function() {
    // Animate button click
    this.style.transform = 'scale(0.95)';
    
    // Add loading state to button
    const originalText = this.querySelector('.button-text').textContent;
    this.querySelector('.button-text').textContent = 'DOXXING IN PROGRESS...';
    this.querySelector('.button-icon').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    this.disabled = true;
    
    // Simulate scanning delay
    setTimeout(() => {
        // Switch screens with animation
        initialScreen.classList.remove('active');
        
        setTimeout(() => {
            resultsScreen.classList.add('active');
            // Start gathering information
            gatherInformation();
        }, 800);
    }, 1500);
});

// Reset to initial screen
resetButton.addEventListener('click', function() {
    // Animate button click
    this.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        resultsScreen.classList.remove('active');
        
        setTimeout(() => {
            initialScreen.classList.add('active');
            
            // Reset button state
            doxButton.querySelector('.button-text').textContent = 'INITIATE SELF-DOXXING SEQUENCE';
            doxButton.querySelector('.button-icon').innerHTML = '<i class="fas fa-rocket"></i>';
            doxButton.disabled = false;
            doxButton.style.transform = 'scale(1)';
        }, 800);
    }, 300);
});

// Share button functionality
shareButton.addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'SelfDoxxer - A Joke Doxxing Tool',
            text: 'Check out this funny joke website that shows what information websites can access from your browser!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-check"></i> LINK COPIED!';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }
});

// Gather and display information
async function gatherInformation() {
    // Get IP address (using a public API)
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        document.getElementById('ipAddress').textContent = ipData.ip;
        document.getElementById('ipAddress').style.color = '#4fc3f7';
    } catch (error) {
        document.getElementById('ipAddress').textContent = 'Unable to retrieve (API error)';
        document.getElementById('ipAddress').style.color = '#ff9800';
    }
    
    // Network information
    document.getElementById('connectionType').textContent = 
        navigator.connection ? (navigator.connection.effectiveType || 'Unknown') : 'Unknown';
    document.getElementById('onlineStatus').textContent = navigator.onLine ? 'Online' : 'Offline';
    document.getElementById('onlineStatus').style.color = navigator.onLine ? '#4caf50' : '#ff5252';
    
    // Browser information
    document.getElementById('browserName').textContent = getBrowserName();
    document.getElementById('platform').textContent = navigator.platform;
    document.getElementById('language').textContent = navigator.language;
    document.getElementById('cookiesEnabled').textContent = navigator.cookieEnabled ? 'Yes' : 'No';
    document.getElementById('cookiesEnabled').style.color = navigator.cookieEnabled ? '#4caf50' : '#ff5252';
    
    // System information
    document.getElementById('screenResolution').textContent = 
        `${window.screen.width} x ${window.screen.height}`;
    document.getElementById('colorDepth').textContent = `${window.screen.colorDepth} bit`;
    document.getElementById('cpuCores').textContent = navigator.hardwareConcurrency || 'Unknown';
    
    // Device memory (if available)
    if (navigator.deviceMemory) {
        document.getElementById('deviceMemory').textContent = `${navigator.deviceMemory} GB`;
    } else {
        document.getElementById('deviceMemory').textContent = 'Not available';
    }
    
    // Time and location
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const now = new Date();
    document.getElementById('localTime').textContent = 
        `${now.toLocaleTimeString()} (${now.toLocaleDateString()})`;
    
    // Request geolocation (with user permission)
    if ("geolocation" in navigator) {
        document.getElementById('geolocation').textContent = 'Requesting permission...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                document.getElementById('geolocation').textContent = `${lat}, ${lon}`;
                document.getElementById('geolocation').style.color = '#4caf50';
                document.getElementById('locationAccuracy').textContent = 
                    `±${Math.round(position.coords.accuracy)} meters`;
            },
            (error) => {
                document.getElementById('geolocation').textContent = 'Permission denied or unavailable';
                document.getElementById('geolocation').style.color = '#ff9800';
                document.getElementById('locationAccuracy').textContent = 'Not available';
            },
            { timeout: 10000 }
        );
    } else {
        document.getElementById('geolocation').textContent = 'Geolocation not supported';
        document.getElementById('geolocation').style.color = '#ff5252';
    }
    
    // Add staggered animations to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Detect browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        return "Samsung Internet";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } else {
        return "Unknown Browser";
    }
}

// Add some fun effects to the info values when they load
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add a fun Easter egg - console message
console.log(
    "%c🔍 SelfDoxxer - A Joke Website 🔍\n%cThis is a fun, educational tool demonstrating what information websites can access. No real doxxing occurs!",
    "color: #4fc3f7; font-size: 16px; font-weight: bold;",
    "color: #b3e5fc; font-size: 12px;"
);

// Add a fun particle effect on click
document.addEventListener('click', function(e) {
    // Only create particles on the dox button and reset button
    if (e.target === doxButton || e.target === resetButton || 
        e.target.closest('#doxButton') || e.target.closest('#resetButton')) {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    const colors = ['#4fc3f7', '#ff4081', '#4caf50', '#ff9800'];
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let opacity = 1;
        const animate = () => {
            opacity -= 0.02;
            particle.style.opacity = opacity;
            particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
            particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        animate();
    }
}
