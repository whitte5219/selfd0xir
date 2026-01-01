const mockData = {
    ips: ["192.168.420.69", "10.0.0.69", "172.16.69.420", "255.255.255.69", "8.8.8.8"],
    locations: ["Floating in the Kuiper Belt", "Orbiting a black hole", "Lost in the Oort Cloud", "Near Proxima Centauri", "Somewhere in the Orion Arm"],
    browsers: ["Cosmic Explorer v1.0", "Stellar Firefox", "Nebula Chrome", "Quantum Edge", "Pulsar Safari"],
    devices: ["Stardust Terminal", "Neuralink v4", "Holographic Display", "Alien Tech (Probably)", "Warp Drive Laptop"],
    searches: ["How to survive a supernova", "Is the universe a simulation?", "Best VPN for interstellar travel", "How to build a Dyson sphere", "Are we alone?"],
    wifis: ["Voyager_1977", "MarsColony_FreeWiFi", "Area51_Guest", "ISS_Lounge", "Andromeda_Hotspot"],
    isps: ["Intergalactic Data Stream", "Cosmic Broadband", "Dark Matter Networks", "Wormhole ISP", "Quantum Entanglement Net"],
    oses: ["Linux: Cosmic Edition", "Windows: Space Explorer", "macOS: Nebula", "Android: Mars Edition", "iOS: Lunar OS"],
    resolutions: ["3840x2160 (4K)", "5120x2880 (5K)", "2560x1440 (QHD)", "1920x1080 (FHD)", "1024x768 (For nostalgia)"],
    shames: ["You still think the Earth is round", "You cried during 'Interstellar'", "You believe in horoscopes", "You’ve never seen a shooting star", "You think aliens are friendly"]
};

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animated');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationDelay = `${index * 0.1}s`;
        }, 0);
    });
});

document.getElementById('doxButton').addEventListener('click', () => {
    const container = document.querySelector('.container');
    const scanner = document.getElementById('scanner');
    const doxResult = document.getElementById('doxResult');

    container.style.opacity = '0';
    setTimeout(() => {
        container.style.display = 'none';
        scanner.classList.remove('hidden');
    }, 500);

    setTimeout(() => {
        scanner.classList.add('hidden');
        doxResult.classList.remove('hidden');
        setTimeout(() => {
            doxResult.style.opacity = '1';
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
        }, 50);
    }, 2000);
});

document.getElementById('backButton').addEventListener('click', () => {
    const container = document.querySelector('.container');
    const doxResult = document.getElementById('doxResult');

    doxResult.style.opacity = '0';
    setTimeout(() => {
        doxResult.classList.add('hidden');
        container.style.display = 'flex';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 50);
    }, 500);
});
