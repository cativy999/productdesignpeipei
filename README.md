# Pei Pei Wang — Portfolio

## Quick Start

Open Terminal, navigate to this folder, and run:

```bash
cd ~/Desktop/productdesignpeipei
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## Adding Your Images

Drop your project screenshots into `src/assets/images/` with these filenames:

| File | What it's for |
|------|---------------|
| `profile-photo.png` | Your photo in the left sidebar |
| `project-mobile-guide-1.png` | Mobile Guide project card |
| `project-kore.png` | Kore project card |
| `project-gather.png` | Gather project card |
| `project-meal-planning.png` | Meal Planning project card |
| `project-ai-planner.png` | AI Planner project card |
| `project-family-superapp.png` | Family Superapp project card |
| `project-trip-tool.png` | Trip Tool project card |
| `project-cable-crm.png` | Cable CRM project card |
| `project-travelpass.png` | Travelpass Web project card |
| `project-pcc.png` | Polynesian Cultural Center project card |
| `project-loopedin.png` | LoopedIn project card |

Images will show as light gray placeholders until you add them.

---

## Project Structure

```
src/
  components/
    HomePage.jsx    ← main page (edit this to update content)
  assets/
    images/         ← drop your images here
  App.jsx
  main.jsx
  index.css
```

## Updating Content

All project data is at the top of `src/components/HomePage.jsx` in the `ALL_PROJECTS` object. Each project has:
- `title` — project name
- `platform` — e.g. "mobile", "desktop"
- `description` — short paragraph
- `image` — path to image in assets/images/

## Updating Social Links

Search for `href="https://instagram.com"` etc. in `HomePage.jsx` and replace with your real profile URLs.
