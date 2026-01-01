document.addEventListener('DOMContentLoaded', () => {
    const doxButton = document.getElementById('doxButton');
    const scanner = document.getElementById('scanner');
    const doxResult = document.getElementById('doxResult');
    const backButton = document.getElementById('backButton');
    const mainContainer = document.getElementById('mainContainer');

    doxButton.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        scanner.style.display = 'flex';

        setTimeout(() => {
            scanner.style.display = 'none';
            doxResult.style.display = 'flex';

            // Set mock data with delays for each field
            setTimeout(() => document.getElementById('ip').textContent = "192.168.420.69", 100);
            setTimeout(() => document.getElementById('location').textContent = "Orbiting Jupiter", 200);
            setTimeout(() => document.getElementById('browser').textContent = navigator.userAgent, 300);
            setTimeout(() => document.getElementById('device').textContent = "Quantum Terminal", 400);
            setTimeout(() => document.getElementById('os').textContent = navigator.platform, 500);
            setTimeout(() => document.getElementById('resolution').textContent = `${window.screen.width}x${window.screen.height}`, 600);
            setTimeout(() => document.getElementById('search').textContent = "How to survive a black hole", 700);
            setTimeout(() => document.getElementById('wifi').textContent = "Starlink_69420", 800);
            setTimeout(() => document.getElementById('shame').textContent = "You still use Internet Explorer", 900);
        }, 2000);
    });

    backButton.addEventListener('click', () => {
        doxResult.style.display = 'none';
        mainContainer.style.display = 'flex';
    });
});
