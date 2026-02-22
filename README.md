# Academic Homepage Template

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fjunbolian.github.io)](https://junbolian.github.io)
[![License](https://img.shields.io/github/license/junbolian/junbolian.github.io)](LICENSE)

A clean, responsive single-page academic homepage. No build tools required — just edit Markdown files and push.

**Demo:** [https://junbolian.github.io](https://junbolian.github.io)

## Features

- Single-page design with smooth scrolling navigation
- Bilingual support (English / Chinese) with one-click toggle
- Markdown-driven content — no HTML editing needed
- Photo gallery with lightbox and category tabs
- Responsive layout for desktop, tablet, and mobile
- Shields.io badge integration for profiles and links
- CV download button
- SEO-friendly meta tags

## Quick Start

1. **Fork** this repository
2. Rename to `<your-username>.github.io`
3. Edit `contents/config.yml` with your name and site title
4. Replace content in `contents/*.md` with your own
5. Add your photo as `static/assets/img/photo.png`
6. Push — your site will be live at `https://<your-username>.github.io`

## Project Structure

```
contents/
├── config.yml         # Site title, subtitle, copyright
├── home.md            # Bio, contact, education
├── research.md        # Research directions
├── publications.md    # Paper listings by area
├── projects.md        # Open-source projects, patents, grants
├── awards.md          # Scholarships and honors
├── news.md            # Media coverage and announcements
├── service.md         # Journal reviewer roles
└── beyond.md          # Hobbies and interests
contents/cn/           # Chinese translations (same structure)
static/
├── assets/img/        # Photos, avatar, gallery images
├── assets/cv/         # CV files (PDF)
├── css/               # Stylesheets
└── js/                # Scripts (Marked.js, js-yaml, custom)
```

## Tech Stack

- [Bootstrap 5](https://getbootstrap.com/) + custom CSS
- [Marked.js](https://github.com/markedjs/marked) — client-side Markdown rendering
- [js-yaml](https://github.com/nodeca/js-yaml) — YAML config parsing
- [MathJax](https://www.mathjax.org/) — LaTeX math rendering
- [Bootstrap Icons](https://icons.getbootstrap.com/) — icon set
- Deployed on [GitHub Pages](https://pages.github.com/) (zero config)

## Customization

### Adding a Section

1. Create `contents/your-section.md`
2. Add the section ID to `section_names` in `static/js/scripts.js`
3. Add the HTML section block in `index.html`

### Gallery

Edit the `galleryData` object in `static/js/scripts.js` to add/remove images. Place photos in `static/assets/img/gallery/<category>/`.

### Bilingual Content

For each `contents/*.md`, create a matching `contents/cn/*.md` for Chinese. The language toggle automatically switches between them.

## License

MIT License. See [LICENSE](LICENSE) for details.
