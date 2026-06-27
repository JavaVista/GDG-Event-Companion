# GDG Event Companion

A modern web application built with [Astro](https://astro.build) and TypeScript to serve as an event companion for GDG (Google Developer Groups) events.

## 🚀 Project Structure

This project follows a clean and standard Astro project structure:

```text
/
├── public/             # Static assets (favicons, images, etc.)
├── src/
│   ├── assets/         # Project assets (stylesheets, global images)
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Layout templates for pages
│   └── pages/          # Application routes (pages)
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # ESLint flat configuration
├── .prettierrc         # Prettier formatting configuration
├── .editorconfig       # Editor configuration rules
└── package.json        # Project scripts and dependencies
```

## 🧞 Development Commands

All commands are run from the root of the project:

| Command                | Action                                      |
| :--------------------- | :------------------------------------------ |
| `npm install`          | Installs dependencies                       |
| `npm run dev`          | Starts local dev server at `localhost:4321` |
| `npm run build`        | Builds the production site to `./dist/`     |
| `npm run preview`      | Previews the production build locally       |
| `npm run lint`         | Lints code using ESLint                     |
| `npm run lint:fix`     | Automatically fixes ESLint warnings/errors  |
| `npm run format`       | Checks code formatting with Prettier        |
| `npm run format:write` | Formats all files with Prettier             |

## 🛠️ Tech Stack & Tooling

- **Framework**: [Astro v7](https://astro.build)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Linting**: [ESLint](https://eslint.org) (Flat config)
- **Formatting**: [Prettier](https://prettier.io)
