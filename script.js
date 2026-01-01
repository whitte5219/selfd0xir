const mockData = {
    ips: ["192.168.420.69", "10.0.0.69", "172.16.69.420", "255.255.255.69"],
    locations: ["Orbiting Jupiter’s 4th Moon", "Lost in the Andromeda Galaxy", "Somewhere near Alpha Centauri", "Inside a Black Hole"],
    browsers: ["Interstellar Chrome v9001", "Firefox: Quantum Leap", "Safari: Warp Speed", "Edge: Hyperspace Edition"],
    devices: ["Quantum Neural Interface", "Holographic Terminal", "Neuralink v3.14", "Alien Tech (Probably)"],
    searches: ["How to hack a black hole", "Is Earth flat? (Asking for a friend)", "Best VPN for intergalactic travel", "How to build a Death Star"],
    wifis: ["Starlink_69420", "MarsColony_FreeWiFi", "Area51_Guest", "ISS_Lounge"],
    isps: ["Galactic Net Services", "Interstellar Broadband", "Dark Matter Networks", "Wormhole ISP"],
    oses: ["Windows 11: Space Edition", "Linux: Cosmic Kernel", "macOS: Nebula", "Android: Mars Edition"],
    resolutions: ["3840x2160 (8K Ultra HD)", "5120x2880 (5K Retina)", "7680x4320 (16K)", "1024x768 (For nostalgia)"],
    shames: ["You still believe in the Moon landing hoax", "You cried during Gravity", "You think Pluto is a planet", "You’ve never seen 2001: A Space Odyssey"]
};

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

document.getElementById('doxButton').addEventListener('click', function() {
    document.querySelector('.container').style.opacity = '0';
    document.getElementById('scanner').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('scanner').classList.add('hidden');
        document.getElementById('doxResult').classList.remove('hidden');
        document.getElementById('ip').textContent = getRandomItem(mockData.ips);
        document.getElementById('location').textContent = getRandomItem(mockData.locations);
        document.getElementById('browser').textContent = getRandomItem(mockData.browsers);
        document.getElementById('device').textContent = getRandomItem(mockData.devices);
        document.getElementById('search').textContent = getRandomItem(mockData.searches);
        document.getElementById('wifi').textContent = getRandomItem(mockData.wifis);
        document.getElementById('isp').textContent = getRandomItem(mockData.isps);
        document.getElementById('os').textContent = getRandomItem(mockData.oses);
        document.getElementById('resolution').textContent = getRandomItem(mockData.resolutions);
        document.getElementById('shame').textContent = getRandomItem(mockData.shames);
        setTimeout(() => {
            document.getElementById('doxResult').style.opacity = '1';
        }, 50);
    }, 2000);
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('doxResult').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('doxResult').classList.add('hidden');
        document.querySelector('.container').style.opacity = '1';
    }, 500);
});
