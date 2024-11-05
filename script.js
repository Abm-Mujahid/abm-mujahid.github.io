// Initialize variables for slideshow
let slideIndex = 0;
let slideshowInterval;

// Fetch JSON data and populate content
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        populateAboutSection(data);
        populateCertificates(data.certificates);
        populateProjects(data.projects);
        populateContactSection(data.contact);
        populateCVSection(data.cv);

        // Start slideshow
        showSlides();
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
        document.getElementById('about-content').innerText = 'Error loading data. Please try again later.';
    });

// Function to populate About section
function populateAboutSection(data) {
    document.getElementById('about-content').innerText = data.about;
}

// Function to populate Certificates section
function populateCertificates(certificates) {
    const slideshowContainer = document.getElementById('certificate-slideshow');
    const allCertificatesContainer = document.getElementById('all-certificates');

    certificates.forEach((cert, index) => {
        // Create slide for slideshow view
        const slideDiv = createElement('div', { class: 'slide' });
        const img = createElement('img', { src: cert.image, alt: `${cert.title} - ${cert.organization}` });
        slideDiv.appendChild(img);
        slideshowContainer.appendChild(slideDiv);

        // Create card for grid view (View All)
        const certDiv = createElement('div', { class: 'certificate' });
        const certImg = createElement('img', { src: cert.image, alt: `${cert.title} - ${cert.organization}` });
        const title = createElement('h3', {}, cert.title);
        const organization = createElement('p', {}, cert.organization);
        const verifyBtn = createElement('button', { class: 'verify-btn' }, 'Verify');
        verifyBtn.onclick = () => openVerificationModal(cert.verifyLink);

        certDiv.append(certImg, title, organization, verifyBtn);
        allCertificatesContainer.appendChild(certDiv);
    });
}

// Function to show slides in slideshow mode
function showSlides() {
    const slides = document.getElementsByClassName('slide');
    Array.from(slides).forEach(slide => (slide.style.display = 'none'));

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = 'block';
    slideshowInterval = setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Function to toggle "View All" grid view
function toggleViewAll() {
    const allCertificates = document.getElementById('all-certificates');
    const viewAllBtn = document.getElementById('viewAllBtn');

    if (allCertificates.style.display === 'none') {
        clearInterval(slideshowInterval); // Stop slideshow
        allCertificates.style.display = 'grid';
        viewAllBtn.innerText = 'Show Less';
    } else {
        allCertificates.style.display = 'none';
        viewAllBtn.innerText = 'View All';
        showSlides(); // Restart slideshow
    }
}

// Function to populate Projects section
function populateProjects(projects) {
    const projectList = document.getElementById('project-list');
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        const title = createElement('h3', {}, project.title);
        const description = createElement('p', {}, project.description);
        const link = createElement('a', { href: project.link, target: '_blank' }, 'View Project');

        projectDiv.append(title, description, link);
        projectList.appendChild(projectDiv);
    });
}

// Function to populate Contact section
function populateContactSection(contact) {
    const contactContent = document.getElementById('contact-content');
    contactContent.innerHTML = `
        <p>Email: <a href="mailto:${contact.email}">${contact.email}</a></p>
        <p>LinkedIn: <a href="${contact.social.linkedin}" target="_blank">LinkedIn</a></p>
        <p>Twitter: <a href="${contact.social.twitter}" target="_blank">Twitter</a></p>
        <p>GitHub: <a href="${contact.social.github}" target="_blank">GitHub</a></p>
    `;
}

// Function to populate CV section
function populateCVSection(cv) {
    const cvContent = document.getElementById('cv-content');
    cvContent.innerHTML = cv;
}

// Function to open verification modal and redirect after a delay
function openVerificationModal(link) {
    const modal = document.getElementById('loadingModal');
    modal.style.display = 'block'; // Show the modal

    // Simulate loading time
    setTimeout(() => {
        window.open(link, '_blank'); // Open verification link in new tab
        modal.style.display = 'none'; // Hide the modal
    }, 2000); // 2 seconds delay for demonstration
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('loadingModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Helper function to create an HTML element with attributes and text content
function createElement(tag, attributes = {}, text = '') {
    const element = document.createElement(tag);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    if (text) element.innerText = text;
    return element;
}


// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

// Disable keyboard shortcuts like Ctrl+C (copy) and Ctrl+U (view source)
document.addEventListener('keydown', function (e) {
    // Disable Ctrl+C, Ctrl+X, Ctrl+U
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'u')) {
        e.preventDefault();
    }
});
