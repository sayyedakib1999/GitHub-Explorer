function fetchRepositories() {
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}/repos`;

    // Show loading spinner
    document.getElementById('loading').style.display = 'block';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRepositories(data);
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';
        });
}

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = '';

    repositories.forEach(repository => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('repository');

        const repositoryName = document.createElement('a');
        repositoryName.href = repository.html_url;
        repositoryName.textContent = repository.name;
        repositoryName.target = '_blank';

        const repositoryDescription = document.createElement('p');
        repositoryDescription.textContent = repository.description || "No description available";

        repositoryElement.appendChild(repositoryName);
        repositoryElement.appendChild(repositoryDescription);
        repositoriesContainer.appendChild(repositoryElement);
    });
}