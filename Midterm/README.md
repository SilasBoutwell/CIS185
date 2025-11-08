# Project Name: GitHub Profile Explorer

## CIS 185 - Midterm Project
## Author: Silas Boutwell
## Date: November 8, 2025

---

## 1. Project Description
GitHub Profile Explorer is a small web app that fetches and displays public GitHub user data using the GitHub REST API. Enter a username to view a user's profile (avatar, bio, followers) and a list of public repositories with quick access to each repo.

## 2. Target Audience
This tool is useful for students, developers, and recruiters who want a quick snapshot of someone's GitHub presence. It's also handy for anyone exploring open-source contributions or inspecting repositories without navigating GitHub directly.

## 3. Main Features
- Profile lookup by GitHub username (avatar, name, bio, follower/following counts)
- Repository list with direct links, stars, and forks information
- Dynamic, profile-driven theming: extracts a dominant color from the user's avatar to style UI accents
- Insights page showing summary stats and a simple search history stored in localStorage
- Privacy-friendly: no login required and data is fetched only from GitHub's public API

## 4. Technologies Used
- HTML5 (semantic pages)
- CSS3 (layout, responsive styles, theming via CSS variables)
- JavaScript (fetch API, DOM manipulation, localStorage)
- Color Thief (client-side color extraction from avatars)
- Font Awesome (icons)
- Google Fonts (Inria Sans, Work Sans)

## 5. File Structure
Project files in this folder:

├── index.html                   # Homepage and main search UI
├── about.html                   # About page and usage tips
├── insights.html                # Insights and search history UI
├── features.html                # Describes features and UI behavior
├── README.md                    # Project overview and usage instructions
├── .gitignore                   # (optional) Git exclusions  
├── assets/                      # Static assets and source files
│   ├── css/                     # Stylesheets
│   │   └── style.css            # Main stylesheet (controls layout, theme variable --profile-color)
│   │
│   ├── js/                      # JavaScript logic
│   │   ├── main.js              # Application logic
│   │   └── color-thief.umd.js   # Color Thief library used for extracting dominant avatar color
│   │
│   └── img/                     # Image assets
│       └── favicon.png          # Favicon for the site
│   │
│   └── flowchart.drawio.svg     # Flowchart for design and ideas

## 6. Challenges Faced
- Dynamic color extraction required using the avatar image with `crossOrigin` to avoid tainting the canvas. Handling images that fail to load or return neutral (gray) palettes was addressed by falling back to a secondary palette color or a default theme color, which was necessary UI and accesability purposes.
- Ensuring consistent, readable contrast when applying extracted colors to UI components required detecting near-gray colors and choosing alternate colors to avoid washed-out or low-contrast UI.
- Persisting a friendly search history and last-viewed profile was implemented with `localStorage`, while keeping the UX simple (no backend needed).

## 7. AI Tools Used
about page, features page, readme, file structure help, favicon generation

## 8. Future Improvements
- Add paging / lazy-loading for repositories and rate-limit handling for large responses
- Include caching on a lightweight backend (or serverless function) for frequent lookups
- Add tests (unit tests for JS functions and simple UI tests) and linting
- Improve accessibility (ARIA attributes, keyboard-only navigation, better contrast checks)
- Allow saving favorites and exporting search history

## 9. Credits
- Color extraction: Color Thief (https://github.com/lokesh/color-thief)
- Icons: Font Awesome (https://fontawesome.com/) via personal kit include
- Fonts: Google Fonts (Inria Sans, Work Sans)
- GitHub API used for public profile and repository data (https://docs.github.com/en/rest)

---

## Flowchart
Simple inline image
![Flowchart](./assets/flowchart.drawio.svg)

Clickable, sized image (opens full-size on click)
<a href="./assets/flowchart.drawio.svg" target="_blank" rel="noopener">
  <img src="./assets/flowchart.drawio.svg" alt="Design flowchart" width="800" />
</a>

Collapsible view to avoid large README length
<details>
<summary>View flowchart</summary>

![Flowchart](./assets/flowchart.drawio.svg)

</details>

## How to view this site locally
The easiest way is to open `index.html` in your browser.

For a simple local server (recommended for testing JS modules and avoiding certain CORS restrictions), run a small HTTP server. Example with Python 3:

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```