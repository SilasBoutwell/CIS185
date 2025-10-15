## Homework Week 3 Assignment 3 Comparison of Bootstrap to Custom

### Requirements to complete the Assignment:

- Version 1: Manual Responsive Design
  - Take your Assignment 1 portfolio and manually add responsive features using:
  - Media queries (@media)
  - Flexible images (max-width)
  - Viewport units (vw, vh)
  - CSS Grid or Flexbox
- Version 2: Bootstrap Responsive Design
  - Create a second version using Bootstrap 5 to handle responsiveness:
  - Bootstrap grid system
  - Bootstrap components
  - Bootstrap utilities
  - ReadMe.md: Compare & Contrast
  - Write a detailed comparison of both approaches

## Homework Week 3 — Assignment 3: Custom vs Bootstrap

This folder contains the Bootstrap-based version of the personal portfolio for Week 3. Below is a compare & contrast between the custom (Assignment3) implementation and this Bootstrap version. It covers code complexity, development time, pros and cons of each approach, and my personal preference with reasoning.

### 1) Code complexity comparison

- Custom version:
	- Uses hand-written HTML and CSS (Flexbox/Grid, but mostly flexbox, and media queries) to control layout and responsiveness.
	- CSS is bespoke and typically longer because it implements layout, spacing, and component styling from scratch.
	- Complexity is higher in the CSS as you manage breakpoints, utilities (spacing, alignment), and component states yourself.
	- Advantages in complexity: fine-grained control, smaller runtime dependencies, and no framework semantics to learn.

- Bootstrap version:
	- Relies on Bootstrap 5 classes (grid, utilities, components) to achieve responsive layouts with far less custom CSS.
	- Complexity shifts from writing CSS to understanding and applying Bootstrap's class system and utility API.
	- Less CSS to maintain, but HTML can become verbose with a ton of utility classes.

### 2) Development time analysis

- Custom version:
	- Longer initial development time because every layout and responsive rule must be implemented and tested across viewports.
	- More time spent debugging cross-browser issues and tweaking spacing and alignment at breakpoints.
	- Faster for small, unique components where custom styling is minimal, but scales poorly as UI complexity grows.

- Bootstrap version:
	- Faster to prototype and build common layouts using the grid and built-in components (navbars, cards, responsive embedding, etc.).
	- Great for getting a polished result quickly without writing many CSS rules.
	- Time savings are most noticeable for typical page structures (header/hero, multi-column projects grid, responsive nav).

### 3) Pros and cons

- Custom approach
	- Pros:
		- Full control over markup and styles — no framework constraints.
		- Lighter if you only include minimal CSS and no external framework files.
		- Easier to learn core CSS concepts (Flexbox, Grid, media queries) — good for growth.
	- Cons:
		- Slower development for standard UI patterns and responsive behavior.
		- Higher maintenance burden as the site grows; more CSS to test and refactor.
		- Possible inconsistency in spacing and components unless you create your own design system.

- Bootstrap approach
	- Pros:
		- Fast to build consistent, responsive UIs using the grid and utility classes.
		- Well-tested components and cross-browser behavior handled by the framework.
		- Easier to maintain for teams or when following design patterns consistently.
	- Cons:
		- Adds a dependency (Bootstrap CSS/JS). File size or unused CSS utilities may be wasteful for tiny projects.
		- HTML can be cluttered with many utility classes (less semantic at times).
		- Customizing Bootstrap deeply can be harder than custom CSS unless you use SASS and a build step.

### 4) Personal preference & reasoning

- Preference: I prefer the Bootstrap approach for quick prototypes and when I want consistent responsive behavior with minimal effort. For small to medium portfolio sites where the goal is to show content rather than craft a unique visual system, Bootstrap saves time and reduces bugs.

- When I'd choose custom CSS instead:
	- If the project requires a very specific visual identity or micro-interactions not supported by Bootstrap out-of-the-box.
	- If keeping dependencies minimal and the site footprint tiny is a priority.
	- When learning or demonstrating CSS fundamentals is the main objective (education, assignments focused on CSS skills).

### 5) Where to look in this repo

- Custom version: `..\CustomVersion\index.html`.
- Bootstrap version: `..\BootstrapVersion\index.html`.

### 6) Short summary

- Bootstrap: faster to build and maintain for standard layouts; adds dependency and can produce verbose HTML.
- Custom CSS: maximum control and smaller dependency footprint; cost is time and maintenance.
