// main.js

// Page load actions
window.onload = function () {
  document.getElementById('username').focus();
}
window.addEventListener('DOMContentLoaded', () => {
  insightsToggle('insights', { preventDefault: () => { } });
});

// Fetch GitHub profile and repositories
async function fetchProfile() {
  const username = document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');
  const reposDiv = document.getElementById('repos');

  // Clear input field
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
  } catch (error) {
    profileDiv.innerHTML = `<p>Error fetching data.</p>`;
  }
}

// Toggle insights section
function insightsToggle(activeSection, event) {
  event.preventDefault();

  const insightsLink = document.getElementById('insights');
  const historyLink = document.getElementById('history');

  if (activeSection === 'insights') {
    insightsLink.classList.add('active');
    historyLink.classList.remove('active');
  } else {
    historyLink.classList.add('active');
    insightsLink.classList.remove('active');
  }

  const insightsBody = document.getElementById('insightsBody');
  insightsBody.innerHTML = `<h2>${activeSection === 'insights' ? 'Insights' : 'History'}</h2>`;
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
