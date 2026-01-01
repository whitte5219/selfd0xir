document.addEventListener('DOMContentLoaded', () => {
    const doxButton = document.getElementById('doxButton');
    const scanner = document.getElementById('scanner');
    const doxResult = document.getElementById('doxResult');
    const backButton = document.getElementById('backButton');

    doxButton.addEventListener('click', () => {
        document.querySelector('.container').style.display = 'none';
        scanner.style.display = 'flex';

        setTimeout(() => {
            scanner.style.display = 'none';
            doxResult.style.display = 'block';

            // Fetch harmless data
            document.getElementById('ip').textContent = "192.168.xxx.xxx (fake)";
            document.getElementById('location').textContent = "Nowhere, Space";
            document.getElementById('browser').textContent = navigator.userAgent;
            document.getElementById('device').textContent = "Unknown Space Device";
            document.getElementById('resolution').textContent = `${window.screen.width}x${window.screen.height}`;
            document.getElementById('search').textContent = "How to dox yourself";
            document.getElementById('wifi').textContent = "Starlink_69420";
            document.getElementById('os').textContent = navigator.platform;
            document.getElementById('shame').textContent = "You think the Earth is flat";
        }, 2000);
    });

    backButton.addEventListener('click', () => {
        doxResult.style.display = 'none';
        document.querySelector('.container').style.display = 'flex';
    });
});
