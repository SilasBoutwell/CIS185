# Silas.dev – Portfolio Project

## Overview
This project is a personal portfolio website built with Next.js, React, and TailwindCSS. It focuses on custom animation, interactive UI elements, and modular page structure rather than template-based design. The site is intentionally minimal, allowing the animated background and dynamic motion to be the centerpiece. This README explains the major files, components, functions, and planned future improvements instead of basic setup instructions.

---

## File & Component Breakdown

### /components/BlobMorph.js
This component renders the animated background blobs used throughout the site. Each blob has a unique start hue, hueSpeed, drift speed, and independent animation timeline.

**Key features:**
- Independent color cycling using hue values
- Pixel-based drifting with randomized targets
- Organic morphing using sin/cos transforms
- requestAnimationFrame for frame-accurate updates
- Ensures no two blobs start at the same hue

The component is responsible for the “living” background effect across all pages.

---

### /components/MagneticButton.js
A reusable interactive button that reacts to cursor movement.

**How it works:**
- Tracks the user’s mouse position relative to the button’s center
- Translates the button slightly toward the cursor to create a magnet effect
- Resets position on mouse leave
- Accepts additional props, including onClick handlers

Current usage includes the “View My Work” call-to-action button on the home page.

---

### /app/page.js (Home Page)
The landing page containing:
- Hero intro text
- Magnetic “View My Work” button (scrolls to Projects)
- Site navigation with "About" and "Projects"
- The BlobMorph animated background running underneath

Built to stay clean and highlight motion and color.

---

**Future implementation:**
- Fetch repository data from GitHub’s API
- Display repo name, description, language, stars, etc.
- Update automatically when new repositories are added

---

## Styling Notes

### TailwindCSS
Used for all layout, spacing, typography, responsive behavior, and hover effects.

### Animated Background
BlobMorph handles:
- Large blurred gradient shapes
- Continuous color transitions
- Slow drifting across the screen
- Shape morphing and rotation
- Layering behind all content using -z-index

---

## Planned Improvements

1. Dynamic GitHub projects on the Projects page
2. Light/dark mode using next-themes
3. Additional reusable UI components (cursor, buttons, animations)
4. Page transitions using Framer Motion
5. More advanced blob animation (Perlin noise, smoother opacity blending)
6. Accessibility enhancements including ARIA labels and reduced motion mode
7. Potential canvas-based version of the BlobMorph system for higher performance

---

## Summary
This project demonstrates:
- Custom JavaScript animation logic
- Interactive button components
- Modular Next.js page routing
- Responsive design with TailwindCSS
- Focus on motion, color, and smooth user experience

The foundation is built to grow over time with more advanced animation, GitHub integration, and overall UX refinement.
