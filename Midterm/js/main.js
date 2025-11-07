// main.js

// Page load actions
window.onload = function () {
  document.getElementById('username').focus();
}

window.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem("profileColor");
  if (savedColor) {
    document.documentElement.style.setProperty("--profile-color", savedColor);
  }

  const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

  if (isHome) {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");

    if (userParam) {
      setTimeout(() => {
        fetchProfile(userParam);
      }, 50);
    } else {
      insightsToggle('insights', { preventDefault: () => {} });
    }
  }
  insightsToggle('insights', { preventDefault: () => {} });
});

// Fetch GitHub profile and repositories
async function fetchProfile(usernameParam) {
  const username = usernameParam || document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');
  const reposDiv = document.getElementById('repos');

  if (!username) return;

  document.getElementById('username').value = '';
  profileDiv.innerHTML = '';
  reposDiv.innerHTML = '';

  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    const profile = await profileRes.json();

    if (profile.message === 'Not Found') {
      profileDiv.innerHTML = `<p>User not found.</p>`;
      return;
    }

    const profileImg = document.createElement('img');
    profileImg.src = profile.avatar_url;
    profileImg.alt = profile.login;
    profileImg.className = 'profile-img';
    profileImg.crossOrigin = 'anonymous';
    profileDiv.appendChild(profileImg);

    profileImg.addEventListener('load', () => {
      try {
        const colorThief = new window.ColorThief();
        if (profileImg.complete && profileImg.naturalHeight !== 0) {
          const dominantColor = colorThief.getColor(profileImg);
          const profileColor = `rgb(${dominantColor.join(',')})`;
          document.documentElement.style.setProperty('--profile-color', profileColor);
          console.log('Extracted color:', profileColor);
          saveProfileColor(profileColor);
        } else {
          console.warn('Image not fully loaded or readable');
        }
      } catch (err) {
        console.error('Color extraction failed:', err);
      }
    });

    profileDiv.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.login}" class="profile-img" crossorigin="anonymous" />
        <div class="profile-header">
          <h2 class="profile-name">${profile.name || profile.login}</h2>
          <div class="social">
            <p class="stats">
              <i class="fa-regular fa-user"></i>
              <strong>${profile.followers}</strong> Followers &middot; <strong>${profile.following}</strong> Following
            </p>
          </div>
        </div>
        <div class="bio-container"><p class="bio">Bio:</p><p class="bio">${profile.bio || 'No bio available.'}</p></div>
    `;

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await reposRes.json();

    repos.forEach(repo => {
      reposDiv.innerHTML += `
        <a href="${repo.html_url}" target="_blank">
          <div class="repo-card">
            <h3>${repo.name}</h3>
            <div class="description">
              ${repo.description ? '<p>Description: </p><p>' + repo.description + '</p>' : ''}
            </div>
            <p>
              <i class="fa-solid fa-star" style="color: gold;"></i> ${repo.stargazers_count} |  
              <i class="fa-solid fa-code-fork" style="color: #777;"></i> ${repo.forks_count}
            </p>
          </div>
        </a>
      `;
    });

    saveSearch(username);
    localStorage.setItem("lastProfileData", JSON.stringify(profile));

  } catch (error) {
    profileDiv.innerHTML = `<p>Error fetching data.</p>`;
  }
}

// History management
function saveSearch(username) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  history = history.filter(item => item !== username);
  history.unshift(username);

  if (history.length > 20) history.pop();
  localStorage.setItem("searchHistory", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const historyList = document.getElementById("history-list");
  if (!historyList) return;

  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `<p>No history yet. Search a profile to get started.</p>`;
    return;
  }

  history.forEach(username => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <h3>${username}</h3>
      <a href="index.html?user=${username}" class="history-btn">View Profile</a>
    `;
    historyList.appendChild(card);
  });
}

function loadFromHistory(username) {
  const input = document.getElementById('username');
  if (input) {
    input.value = username;
    history.pushState(null, "", `?user=${username}`);
    fetchProfile();
  }
}

function clearHistory() {
  localStorage.removeItem("searchHistory");
  localStorage.removeItem("lastProfileData");
  loadHistory();

  const insightsBody = document.getElementById("insightsBody");
  if (insightsBody) {
    insightsToggle('insights', { preventDefault: () => { } });
    insightsBody.innerHTML = `<h2 class="body-title">Insights</h2><p>No insights available. Search a profile to get started.</p>`;
  }
}

function loadInsights() {
  const data = JSON.parse(localStorage.getItem("lastProfileData"));
  const insightsBody = document.getElementById("insightsBody");

  if (!data) {
    insightsBody.innerHTML += `<p>No insights available. Search a profile to get started.</p>`;
    return;
  }

  insightsBody.innerHTML += `
    <div class="insights-card">
      <div class="insights-header">
        <img src="${data.avatar_url}" alt="${data.login}" class="insights-avatar" />
        <h3>${data.name || data.login}</h3>
        <p class="insights-username">@${data.login}</p>
      </div>
      <div class="insights-stats">
        <div><strong>Repos:</strong> ${data.public_repos}</div>
        <div><strong>Followers:</strong> ${data.followers}</div>
        <div><strong>Created:</strong> ${new Date(data.created_at).toLocaleDateString()}</div>
        <div><strong>Following:</strong> ${data.following}</div>
      </div>
      <p class="insights-bio">${data.bio || 'No bio available.'}</p>
    </div>
  `;
}

// Toggle insights section
function insightsToggle(activeSection, event) {
  event.preventDefault();

  const insightsLink = document.getElementById('insights');
  const historyLink = document.getElementById('history');
  const insightsBody = document.getElementById('insightsBody');

  if (activeSection === 'insights') {
    insightsLink.classList.add('active');
    historyLink.classList.remove('active');
  } else {
    historyLink.classList.add('active');
    insightsLink.classList.remove('active');
  }

  insightsBody.innerHTML = `
    <div class="section-header">
      <h2 class="body-title">${activeSection === 'insights' ? 'Insights' : 'History'}</h2>
      ${activeSection === 'history' ? '<button class="clear-btn" onclick="clearHistory()">Clear History</button>' : ''}
    </div>
    <div id="history-list"></div>
  `;

  if (activeSection === 'insights') {
    loadInsights();
  } else {
    loadHistory();
  }
}

// Toggle active nav link
const currentPath = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-container a');

navLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (linkPath === currentPath) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Event listener for Enter key press
document.getElementById('username').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    fetchProfile();
  }
});

// Save color
function saveProfileColor(color) {
  localStorage.setItem("profileColor", color);
  document.documentElement.style.setProperty("--profile-color", color);
}
