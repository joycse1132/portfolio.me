/**
 * Joy Mojumder - Professional Portfolio Core Engine Architecture
 * Handles Dynamic Modal Overlays and System Object Configurations
 */

// Local Project Storage Object Layer
const portfolioProjects = {
    1: {
        title: "Project Management System",
        description: "Built a robust desktop application to automate organizational workflows, focusing on project tracking, resource allocation, and relational data integrity.",
        technologies: ["Python", "MySQL", "VS Code", "Tkinter", "Workbench"],
        contributions: "Designed complete backend schema matrices, structurally integrated relational data via MySQL Workbench, and completed UI views utilizing Tkinter framework blocks.",
        githubUrl: "https://github.com/tasnimbinhannan/Project_Management_System",
        previewImage: "image/x.png"
    },
    2: {
        title: "Visionary Eyewear E-Commerce Website",
        description: "Developed a responsive Single-Page Application (SPA) for eyewear retail, simulating a complete user journey from product discovery to checkout using client-side technologies.",
        technologies: ["HTML", "CSS", "JavaScript", "VS Code", "Web Storage API"],
        contributions: "Crafted core responsive UI stylesheets, simulated dynamic single page application logic, and integrated checkout states via Web Storage API (localStorage).",
        githubUrl: "https://github.com/tasnimbinhannan/Visionary_Eyewear",
        previewImage: "image/y.png"
    }
};

// UI DOM Element Node References
const globalModal = document.getElementById('globalModal');
const modalContainerInject = document.getElementById('modalContainerInject');

/**
 * Compiles and triggers the Project Details Template inside the Dynamic Modal Context
 * @param {number} projectId - ID mapped inside portfolioProjects object grid
 */
function openProjectModal(projectId) {
    const project = portfolioProjects[projectId];
    
    // Construct responsive badges matrix elements
    const tagBadgesHtml = project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('');
    
    modalContainerInject.innerHTML = `
        <h2 style="font-size: 1.8rem; color: var(--primary-neon);">${project.title}</h2>
        <div class="modal-media-display" style="height: auto; min-height: 220px; background: transparent;">
            <img src="${project.previewImage}" alt="${project.title}" style="width: 100%; max-height: 320px; object-fit: contain; border-radius: 8px;" onerror="this.parentNode.innerHTML='<div style=\'text-align:center; padding:2rem;\'><i class=\'fas fa-image fa-4x\' style=\'color:var(--text-muted);\'></i><p style=\'margin-top:1rem; color:var(--text-muted);\'>Project preview unavailable</p></div>'">
        </div>
        <div class="modal-tags">${tagBadgesHtml}</div>
        <p style="margin-bottom: 0.8rem; font-size: 0.98rem; text-align: justify;">
            <strong>Overview:</strong> ${project.description}
        </p>
        <p style="margin-bottom: 1.5rem; font-size: 0.98rem; text-align: justify; color: var(--text-muted);">
            <strong>My Key Contribution:</strong> ${project.contributions}
        </p>
        <div>
            <a href="${project.githubUrl}" target="_blank" class="pill-btn" style="background: var(--primary-neon); color: #0f172a; font-weight:600; border:none;">
                <i class="fab fa-github"></i> Source Link / GitHub
            </a>
        </div>
    `;
    
    globalModal.style.display = 'flex';
}

function getDownloadableUrl(url) {
    try {
        const parsedUrl = new URL(url, window.location.href);
        if (parsedUrl.hostname.includes('drive.google.com')) {
            const fileId = parsedUrl.searchParams.get('id');
            if (fileId) {
                return `https://drive.google.com/uc?export=download&id=${fileId}`;
            }
        }
        return url;
    } catch (error) {
        return url;
    }
}

function getFileExtension(url) {
    try {
        const parsedUrl = new URL(url, window.location.href);
        const pathname = parsedUrl.pathname || '';
        const parts = pathname.split('.');
        const ext = parts[parts.length - 1].toLowerCase();
        return ext && /^[a-z0-9]{1,5}$/i.test(ext) ? ext : 'jpg';
    } catch (error) {
        return 'jpg';
    }
}

function downloadImage(url, title) {
    const downloadUrl = getDownloadableUrl(url);
    const fileExtension = getFileExtension(downloadUrl);
    const fileName = `${title}.${fileExtension}`;

    fetch(downloadUrl, { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
        })
        .then((blob) => {
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
        })
        .catch(() => {
            const fallbackLink = document.createElement('a');
            fallbackLink.href = downloadUrl;
            fallbackLink.download = fileName;
            fallbackLink.target = '_blank';
            fallbackLink.rel = 'noopener';
            fallbackLink.style.display = 'none';
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
        });
}

/**
 * Generates an instantaneous Image Component Preview Frame for Achievement Verification
 * @param {string} title - Achievement name mapping selector
 * @param {string} fallbackImageSrc - File path reference string context
 */
function openImageModal(title, fallbackImageSrc) {
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_');
    modalContainerInject.innerHTML = `
        <h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--accent-glow);">${title}</h2>
        <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
            <a href="${fallbackImageSrc}" target="_blank" rel="noopener" class="pill-btn" style="background: var(--primary-neon); color: #0f172a; font-weight: 600; border: none; padding: 0.6rem 1rem;">
                <i class="fas fa-expand"></i> Full Screen View
            </a>
        </div>
        <div class="modal-media-display" style="height: auto; min-height: 260px; background: transparent;">
            <img src="${fallbackImageSrc}" alt="${title}" style="width: 100%; max-height: 380px; object-fit: contain; border-radius: 8px;" 
                 onerror="this.parentNode.innerHTML='<div style=\'text-align:center; padding:2rem;\'><i class=\'fas fa-image fa-4x\' style=\'color:var(--text-muted);\'></i><p style=\'margin-top:1rem; color:var(--text-muted);\'>Certificate File Image Placeholder</p></div>'">
        </div>
        <p style="color: var(--text-muted); text-align: center; font-size: 0.85rem; margin-top: 0.5rem;">
            Click outside or tap 'X' to dismiss validation preview pane.
        </p>
    `;
    
    globalModal.style.display = 'flex';
}

function openMultiImageModal(title, imageSources) {
    const imagesHtml = imageSources.map((src, index) => `
        <div style="margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; background: #ffffff;">
            <img src="${src}" alt="${title} ${index + 1}" style="width: 100%; max-height: 320px; object-fit: contain; display: block;" />
        </div>
    `).join('');

    modalContainerInject.innerHTML = `
        <h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--accent-glow);">${title}</h2>
        <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
            <span style="color: var(--text-muted); font-size: 0.9rem;">Multiple award images are shown below.</span>
        </div>
        <div style="max-height: 70vh; overflow-y: auto; padding-right: 0.3rem;">
            ${imagesHtml}
        </div>
        <p style="color: var(--text-muted); text-align: center; font-size: 0.85rem; margin-top: 0.75rem;">
            Click outside or tap 'X' to close the gallery.
        </p>
    `;

    globalModal.style.display = 'flex';
}

function openCvPreviewModal(title, previewUrl) {
    modalContainerInject.innerHTML = `
        <h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--primary-neon);">${title}</h2>
        <div class="modal-media-display" style="height: auto; min-height: 520px; background: #ffffff; border-radius: 10px; overflow: hidden;">
            <iframe src="${previewUrl}#page=1" title="${title}" style="width: 100%; height: 520px; border: 0;" allowfullscreen></iframe>
        </div>
        <p style="color: var(--text-muted); text-align: center; font-size: 0.85rem; margin-top: 0.5rem;">
            Click outside or tap 'X' to close the full CV preview.
        </p>
    `;
    
    globalModal.style.display = 'flex';
}

/**
 * Dismisses overlay component views and resets state flags
 */
function closeModal() {
    globalModal.style.display = 'none';
}

// Global Event Interceptor Layer to close modal context on external container area click executions
window.onclick = function(event) {
    if (event.target === globalModal) {
        closeModal();
    }
};