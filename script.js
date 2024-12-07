// Password protection
const password = "yourPassword"; // Replace this with your desired password
const passwordPrompt = prompt("Enter the password to access the site:");

if (passwordPrompt !== password) {
    alert("Incorrect password.");
    window.location.href = "https://google.com"; // Redirect to another page if password is incorrect
} else {
    console.log("Password correct. Access granted.");
}

// Show, season, and episode data
let shows = [];

function addShow(name, thumbnail, seasons) {
    const show = { name, thumbnail, seasons };
    shows.push(show);
    renderShows();
}

function addSeason(showName, seasonNumber, episodes) {
    const show = shows.find(show => show.name === showName);
    if (show) {
        const season = { seasonNumber, episodes };
        show.seasons.push(season);
        renderSeasons(showName);
    }
}

function addEpisode(showName, seasonNumber, episodeName, episodeLink) {
    const show = shows.find(show => show.name === showName);
    if (show) {
        const season = show.seasons.find(season => season.seasonNumber === seasonNumber);
        if (season) {
            const episode = { episodeName, episodeLink };
            season.episodes.push(episode);
            renderEpisodes(showName, seasonNumber);
        }
    }
}

// Render functions
function renderShows() {
    const showsList = document.getElementById('shows-list');
    showsList.innerHTML = ''; // Clear the list before rendering

    shows.forEach(show => {
        const showDiv = document.createElement('div');
        showDiv.classList.add('show');
        showDiv.innerHTML = `
            <img src="${show.thumbnail}" alt="${show.name}">
            <h2>${show.name}</h2>
        `;
        showDiv.addEventListener('click', () => {
            renderSeasons(show.name);
        });
        showsList.appendChild(showDiv);
    });
}

function renderSeasons(showName) {
    const show = shows.find(show => show.name === showName);
    const seasonsList = document.getElementById('seasons-list');
    seasonsList.innerHTML = ''; // Clear the list before rendering

    show.seasons.forEach(season => {
        const seasonDiv = document.createElement('div');
        seasonDiv.classList.add('season');
        seasonDiv.innerHTML = `
            <h3>Season ${season.seasonNumber}</h3>
        `;
        seasonDiv.addEventListener('click', () => {
            renderEpisodes(showName, season.seasonNumber);
        });
        seasonsList.appendChild(seasonDiv);
    });
}

function renderEpisodes(showName, seasonNumber) {
    const show = shows.find(show => show.name === showName);
    const season = show.seasons.find(season => season.seasonNumber === seasonNumber);
    const episodesList = document.getElementById('episodes-list');
    episodesList.innerHTML = ''; // Clear the list before rendering

    season.episodes.forEach(episode => {
        const episodeDiv = document.createElement('div');
        episodeDiv.classList.add('episode');
        episodeDiv.innerHTML = `
            <h3>${episode.episodeName}</h3>
            <a href="${episode.episodeLink}" target="_blank">Watch Episode</a>
        `;
        episodesList.appendChild(episodeDiv);
    });
}

// Example of adding shows, seasons, and episodes
addShow("Breaking Bad", "breaking-bad-thumbnail.jpg", [
    { seasonNumber: 1, episodes: [{ episodeName: "Pilot", episodeLink: "doodstream-link" }] },
    { seasonNumber: 2, episodes: [{ episodeName: "Grilled", episodeLink: "doodstream-link" }] },
]);

addShow("Stranger Things", "stranger-things-thumbnail.jpg", [
    { seasonNumber: 1, episodes: [{ episodeName: "Chapter One: The Vanishing of Will Byers", episodeLink: "doodstream-link" }] },
    { seasonNumber: 2, episodes: [{ episodeName: "Chapter Seven: The Lost Sister", episodeLink: "doodstream-link" }] },
]);
