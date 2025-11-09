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
      insightsToggle('insights', { preventDefault: () => { } });
    }
  }
  insightsToggle('insights', { preventDefault: () => { } });
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
          const primary = colorThief.getColor(profileImg); // [r, g, b]
          const palette = colorThief.getPalette(profileImg, 5); // get more options
          const secondary = palette[1] || palette[0]; // fallback if pallete is short

          function isGray([r, g, b]) {
            const maxDiff = 12;
            const isNeutral = Math.abs(r - g) < maxDiff && Math.abs(g - b) < maxDiff;
            const brightness = (r + g + b) / 3;
            return isNeutral && brightness > 100;
          }

          const chosen = isGray(primary) ? secondary : primary;
          const profileColor = `rgb(${chosen.join(',')})`;

          document.documentElement.style.setProperty('--profile-color', profileColor);
          console.log('Chosen color:', profileColor);
          saveProfileColor(profile.login, profileColor);
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
    const color = getProfileColor(username);

    const link = document.createElement("a");
    link.href = `index.html?user=${username}`;
    link.className = "history-link-wrapper";

    const card = document.createElement("div");
    card.className = "history-card";
    card.style.background = `linear-gradient(to right, rgb(249, 249, 249), color-mix(in srgb, ${color}, white 70%))`;
    card.style.borderLeft = `4px solid ${color}`;

    card.innerHTML = `
    <p class="history-username">${username}</p>
  `;

    link.appendChild(card);
    historyList.appendChild(link);
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

  localStorage.setItem("profileColor", "#333");
  document.documentElement.style.setProperty("--profile-color", "#333");

  insightsToggle('insights', { preventDefault: () => { } });
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
        <div><strong>Public Repos:</strong> ${data.public_repos}</div>
        <div><strong>Followers:</strong> ${data.followers}</div>
        <div><strong>Following:</strong> ${data.following}</div>
        <div><strong>Follower Ratio:</strong> ${(data.followers / (data.following || 1)).toFixed(2)}</div>
        <div><strong>Account Age:</strong> ${Math.floor((Date.now() - new Date(data.created_at)) / (1000 * 60 * 60 * 24 * 365))} years</div>
      </div>

      <p class="insights-bio">${data.bio || 'No bio available.'}</p>

      <div class="insights-api-info">
        <h4>API Data Pulled</h4>
          <div class="api-badge-group">
            <span class="api-badge">login</span>
            <span class="api-badge">name</span>
            <span class="api-badge">avatar_url</span>
            <span class="api-badge">public_repos</span>
            <span class="api-badge">followers</span>
            <span class="api-badge">following</span>
            <span class="api-badge">created_at</span>
            <span class="api-badge">bio</span>
          </div>

        <h4>Other Available Fields</h4>
          <div class="api-badge-group">
            <span class="api-badge">location</span>
            <span class="api-badge">email</span>
            <span class="api-badge">hireable</span>
            <span class="api-badge">twitter_username</span>
            <span class="api-badge">blog</span>
            <span class="api-badge">company</span>
            <span class="api-badge">html_url</span>
            <span class="api-badge">site_admin</span>
          </div>

        <h4>How We Use This</h4>
        <p>We extract key profile data using the GitHub REST API (<code>/users/` + '${username}' + `</code>) and apply it to the UI for personalized insights. Color Thief is used to theme the card based on the primary color of the avatar.</p>
      </div>

      <div class="insights-code-example">
        <h4>Code Example</h4>
        <pre><code class="language-json">
GET https://api.github.com/users/${data.login}
  {
    "login": "${data.login}",
    "public_repos": ${data.public_repos},
    "followers": ${data.followers},
    "following": ${data.following},
    "created_at": "${data.created_at}"
  }
        </code></pre>
      </div>
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

// Save color and load color
function saveProfileColor(username, color) {
  let colorMap = JSON.parse(localStorage.getItem("profileColors")) || {};
  colorMap[username] = color;
  localStorage.setItem("profileColors", JSON.stringify(colorMap));

  localStorage.setItem("profileColor", color);
  document.documentElement.style.setProperty("--profile-color", color);
}

function getProfileColor(username) {
  const colorMap = JSON.parse(localStorage.getItem("profileColors")) || {};
  return colorMap[username] || "#ccc"; // fallback color
}
