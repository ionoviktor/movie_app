# Copilot Instructions for Movie App

## Overview
This is a simple static web project for a Movie App. The project consists of three main files:
- `index.html`: Main HTML entry point, links to CSS and JS.
- `css/style.css`: Contains global and base styles.
- `js/script.js`: Intended for JavaScript logic (currently empty).

## Architecture & Patterns
- The app is a static site: no build tools, frameworks, or package managers are present.
- All assets are loaded directly via relative paths.
- The HTML references Google Fonts and includes a stylesheet and script.
- CSS uses a global reset and sets the base font to Open Sans.
- JavaScript is loaded at the end of the `<body>` for best practice, but the file is currently empty.

## Conventions
- Place all CSS in `css/style.css`.
- Place all JavaScript in `js/script.js`.
- Use semantic HTML in `index.html`.
- Use relative paths for all local assets.
- No external dependencies except Google Fonts.

## Developer Workflow
- Open `index.html` in a browser to view the app.
- Edit `css/style.css` for styling changes.
- Edit `js/script.js` for interactivity.
- No build, test, or debug scripts are present; all changes are live.

## Examples
- To add a new feature, update `index.html` and implement logic in `js/script.js`.
- To add a new style, edit `css/style.css`.

## Key Files
- `index.html`: Project entry point, structure, and asset loading.
- `css/style.css`: All styles.
- `js/script.js`: All scripts.

## Notes
- No project-specific or nonstandard conventions detected.
- No integration with external APIs or services (as of current state).

---
If you add new files, update this document to reflect new conventions or workflows.
