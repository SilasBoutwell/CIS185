## Homework Week 2 Assignment 2

- Personal Portfolio Page

### Requirements to complete the Assignment:
- Create a single-page personal portfolio
- Use external CSS file (no inline/embedded styles)
- Include at least 3 sections (header, about, projects)
- Use Flexbox OR Grid for layout
- Follow accessibility guidelines (proper contrast)
- Include custom CSS variables for colors/spacing
- README should indicate where and how Flexbox, Grid, are impliment

## Project Structure

## Week 2 — Assignment 2: Personal Portfolio

This repository contains a single-page personal portfolio built as a class assignment. The project demonstrates semantic HTML, an external CSS file, simple JavaScript enhancements (typing effect, smooth navigation), and layout using Flexbox.

What you'll find here
- A responsive single-page portfolio with the sections: Header (hero), About, Projects, Contact, and Footer. Also a cool hovering Navigation at the bottom of the screen.
- External stylesheet using CSS variables for colors, spacing, and other design tokens.
- Accessible form markup (mailto fallback).

Requirements implemented
- Single-page portfolio (index.html)
- External CSS only (assets/style.css)
- At least three sections: header, about, projects (plus contact and footer)
- Uses Flexbox for key layout areas (documented below)
- Accessibility consideration: semantic headings, form labels, adequate contrast and focus styles
- CSS custom properties (variables) are used for colors, radii, timing, etc.

Project structure

```
Week2/
├── Assignment2/
│   ├── index.html           # single-page portfolio
│   ├── README.md            # this file
│   └── assets/
│       ├── style.css        # main stylesheet (uses CSS variables)
│       └── img/             # images used by the page
```

How to view
- Download or clone the whole project with all files. Open `index.html` in a browser.

Flexbox implementation
----------------------
This project uses Flexbox in several places to create clean, responsive layouts. Below are the main areas and the exact selectors used in `assets/style.css`, with short explanations and small code excerpts you can inspect or reuse.

1) Navigation bar (`nav` and `.nav-container`)
- Purpose: center the floating navigation pill at the bottom of the viewport and lay out the navigation items horizontally.
- Key rules (in `assets/style.css`):
	- `nav { display: flex; justify-content: center; align-items: center; }`
	- `.nav-container { display: inline-flex; align-items: center; justify-content: center; gap: 2rem; }`
- Why Flexbox: it centers the nav container both horizontally and vertically and keeps nav items aligned and evenly spaced even as the viewport changes.

2) Header area (`.header`)
- Purpose: place the avatar image and site title on one line and vertically center them.
- Key rules:
	- `.header { display: flex; justify-content: center; align-items: center; }`
- Why Flexbox: using `align-items: center` vertically centers the avatar and heading without extra margination, while `justify-content: center` keeps the header content centered in the layout.

3) Hero section (`.hero`)
- Purpose: center the hero text both vertically and horizontally over the background image.
- Key rules:
	- `.hero { display: flex; align-items: center; justify-content: center; text-align: center; }`
- Why Flexbox: it vertically centers the `.hero-text` inside a fixed-height hero area and works well with responsive heights such as `50vh`.

4) Contact form actions (`.contact-form .form-actions`)
- Purpose: lay out the submit button and status element on a single row and control spacing.
- Key rules:
	- `.contact-form .form-actions { display: flex; gap: 0.75rem; align-items: center; }`
- Why Flexbox: keeps the button and status aligned on the same baseline and allows the gap between them to be controlled with the `gap` property.

5) Preloader (`.preloader-inner`)
- Purpose: vertically stack the spinner and loading text and center them.
- Key rules:
	- `.preloader-inner { display: flex; flex-direction: column; align-items: center; gap: 14px; }`
- Why Flexbox: `flex-direction: column` makes it trivial to stack items with consistent spacing (`gap`) and center them horizontally.

Notes and examples
- The project predominantly uses Flexbox for small, component-level layouts (navigation, header, hero, form actions, preloader). The overall page flow uses normal block layout with a centered `main` container; this is a deliberate choice because the page content is one column on most viewports.
- If you want to convert a section of the page into a multi-column layout, consider adding `display: flex; flex-wrap: wrap;` to a container and using `flex: 1 1 280px;` on child cards (for example, `.card` elements in `#projects`) to create a responsive card grid using only Flexbox.

Accessibility and variables
- Color and contrast are controlled with CSS variables (see `:root` in `assets/style.css`) so you can quickly tweak colors for better contrast.
- Form fields have focus styles to assist keyboard users; labels are paired with inputs correctly.
