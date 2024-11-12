const projects = {
    warehouse33trailer: {
        title: "WAREHOUSE #33 Trailer",
        id: "637566316"
    },
    newyear: {
        title: "THE NEW YEAR",
        id: "496131319"
    },
    movers: {
        title: "MOVERS PILOT EPISODE",
        id: "1028655169"
    },
    warehouse33: {
        title: "WAREHOUSE #33",
        id: "545606028"
    },
    jegna: {
        title: "JEGNA",
        id: "337594693"
    }
};

function openModal(projectId) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const title = document.getElementById('modalTitle');
    const project = projects[projectId];
    
    title.textContent = project.title;
    
    // Clear previous content
    videoContainer.innerHTML = '';
    
    // Create Vimeo embed
    const iframe = document.createElement('iframe');
    iframe.className = 'video-iframe';
    iframe.src = `https://player.vimeo.com/video/${project.id}?autoplay=1&title=0&byline=0&portrait=0`;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    videoContainer.appendChild(iframe);
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '';
    modal.style.display = 'none';
}

document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
