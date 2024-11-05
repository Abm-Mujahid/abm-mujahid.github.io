// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Populate About Section
        document.getElementById('about-content').innerText = data.about;

        // Populate Certificates Section
        const certificatesDiv = document.getElementById('certificates');
        data.certificates.forEach(cert => {
            const certificateDiv = document.createElement('div');
            certificateDiv.classList.add('certificate');

            const img = document.createElement('img');
            img.src = cert.image;
            img.alt = `${cert.title} - ${cert.organization}`;

            const title = document.createElement('h3');
            title.innerText = cert.title;

            const organization = document.createElement('p');
            organization.innerText = cert.organization;

            const verifyBtn = document.createElement('button');
            verifyBtn.classList.add('verify-btn');
            verifyBtn.innerText = 'Verify';
            verifyBtn.onclick = () => {
                openVerificationModal(cert.verifyLink);
            };

            certificateDiv.appendChild(img);
            certificateDiv.appendChild(title);
            certificateDiv.appendChild(organization);
            certificateDiv.appendChild(verifyBtn);
            certificatesDiv.appendChild(certificateDiv);
        });

        // Populate Projects Section
        const projectList = document.getElementById('project-list');
        data.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            const title = document.createElement('h3');
            title.innerText = project.title;

            const description = document.createElement('p');
            description.innerText = project.description;

            const link = document.createElement('a');
            link.href = project.link;
            link.target = '_blank';
            link.innerText = 'View Project';

            projectDiv.appendChild(title);
            projectDiv.appendChild(description);
            projectDiv.appendChild(link);
            projectList.appendChild(projectDiv);
        });

        // Populate Contact Section
        const contactContent = document.getElementById('contact-content');
        contactContent.innerHTML = `
            <p>Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
            <p>LinkedIn: <a href="${data.contact.social.linkedin}" target="_blank">LinkedIn</a></p>
            <p>Twitter: <a href="${data.contact.social.twitter}" target="_blank">Twitter</a></p>
            <p>GitHub: <a href="${data.contact.social.github}" target="_blank">GitHub</a></p>
        `;

        // Populate CV Section
        const cvContent = document.getElementById('cv-content');
        cvContent.innerHTML = data.cv;
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
        document.getElementById('about-content').innerText = 'Error loading data. Please try again later.';
    });

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

// Close the modal when clicking anywhere outside of it
window.onclick = function (event) {
    const modal = document.getElementById('loadingModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
