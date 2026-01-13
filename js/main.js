document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');
    if (projectsContainer) {
        projectsContainer.innerHTML = ''; // Clear the placeholder
        const projects = ['project1.md', 'photography.md']; // Manually add project files here

        projects.forEach(projectFile => {
            fetch(`projects/${projectFile}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(markdown => {
                    const projectHtml = marked.parse(markdown);
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('card', 'mb-3');
                    projectCard.innerHTML = `
                        <div class="card-body">
                            ${projectHtml}
                        </div>
                    `;
                    projectsContainer.appendChild(projectCard);
                })
                .catch(error => {
                    console.error('Error fetching project:', projectFile, error);
                    const errorElement = document.createElement('p');
                    errorElement.textContent = `Could not load project: ${projectFile}`;
                    projectsContainer.appendChild(errorElement);
                });
        });
    }
});
