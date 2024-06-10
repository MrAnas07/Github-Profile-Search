
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', btn);
});

function btn() {
    var username = document.getElementById('inp').value
    var getinp = document.getElementById("inp")
    getinp.value = ""

    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Not Found') {
                    document.getElementById('show').innerHTML = `<div class="alert alert-danger text-center" role="alert">
                        User not found.
                    </div>`;
                } else {
                    displayProfile(data);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        document.getElementById('inp').innerHTML = `<div class="alert alert-warning text-center" role="alert">
            Please enter a GitHub username.
        </div>`;
    }
}

function displayProfile(profile) {
    document.getElementById('show').innerHTML += `
        <div class="col-md-3 ">
            <div class="card">
                <img src="${profile.avatar_url}" class="card-img-top" alt="${profile.login}">
                <div class="card-body">
                    <h5 class="card-title">${profile.name ? profile.name : profile.login}</h5>
                    <p class="card-text">${profile.bio ? profile.bio : 'No bio available'}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Public Repos:</strong> ${profile.public_repos}</li>
                        <li class="list-group-item"><strong>Followers:</strong> ${profile.followers}</li>
                        <li class="list-group-item"><strong>Following:</strong> ${profile.following}</li>
                    </ul>
                    <a href="${profile.html_url}" class="btn btn-primary mt-3" target="_blank">Visit Profile</a>
                </div>
            </div>
        </div>`;
}
