// DOM Elements
const initialScreen = document.getElementById('initialScreen');
const resultsScreen = document.getElementById('resultsScreen');
const doxButton = document.getElementById('doxButton');
const resetButton = document.getElementById('resetButton');

// Switch to results screen
doxButton.addEventListener('click', function() {
    // Add loading state to button
    const originalText = this.querySelector('.button-text').textContent;
    this.querySelector('.button-text').textContent = 'scanning...';
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
        }, 600);
    }, 1200);
});

// Reset to initial screen
resetButton.addEventListener('click', function() {
    resultsScreen.classList.remove('active');
    
    setTimeout(() => {
        initialScreen.classList.add('active');
        
        // Reset button state
        doxButton.querySelector('.button-text').textContent = 'dox yourself';
        doxButton.querySelector('.button-icon').innerHTML = '<i class="fas fa-satellite"></i>';
        doxButton.disabled = false;
    }, 600);
});

// Gather and display information
async function gatherInformation() {
    // Get IP address
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        document.getElementById('ipAddress').textContent = ipData.ip;
    } catch (error) {
        document.getElementById('ipAddress').textContent = 'Not available';
    }
    
    // Network information
    document.getElementById('connectionType').textContent = 
        navigator.connection ? (navigator.connection.effectiveType || 'Unknown') : 'Unknown';
    document.getElementById('onlineStatus').textContent = navigator.onLine ? 'Online' : 'Offline';
    
    // Browser information
    document.getElementById('browserName').textContent = getBrowserName();
    document.getElementById('platform').textContent = navigator.platform;
    document.getElementById('language').textContent = navigator.language;
    document.getElementById('cookiesEnabled').textContent = navigator.cookieEnabled ? 'Yes' : 'No';
    
    // System information
    document.getElementById('screenResolution').textContent = 
        `${window.screen.width} × ${window.screen.height}`;
    document.getElementById('colorDepth').textContent = `${window.screen.colorDepth} bit`;
    
    // Time and location
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const now = new Date();
    document.getElementById('localTime').textContent = 
        `${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    
    // Request geolocation
    if ("geolocation" in navigator) {
        document.getElementById('geolocation').textContent = 'Requesting...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                document.getElementById('geolocation').textContent = `${lat}, ${lon}`;
            },
            () => {
                document.getElementById('geolocation').textContent = 'Denied or unavailable';
            },
            { timeout: 8000 }
        );
    } else {
        document.getElementById('geolocation').textContent = 'Not supported';
    }
    
    // Add staggered animations to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
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

// Initialize card animations
document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add a subtle hover effect to info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});
