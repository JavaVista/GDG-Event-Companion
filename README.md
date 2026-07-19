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

## 🔌 Bevy API Integration

This application integrates with the public [Bevy API Reference](https://help.bevy.com/hc/en-us/articles/21156148264215-Bevy-API-Reference) to dynamically retrieve event information for Google Developer Groups (GDG) chapters. Because it queries Bevy's public endpoints, **no API key is required** for the project to run.

### How it Works

1. **Chapter Event Querying**:
   Retrieves chapter events using the Bevy chapter event listing endpoint. You will need to know your chapter's ID (for example, `920` for Central Florida). This can be customized in the project's Bevy configuration file:
   `src/config/bevy-config.ts`.
2. **Details Fetching**:
   For active, upcoming, or live events, the app requests deep event details (including cropped banners, descriptions, virtual venue links, RSVP counts, and location metadata).
3. **Resilience & Fallbacks**:
   If the Bevy API is offline or returns a `403 Forbidden` response, the application automatically handles the failure gracefully and loads predefined fallback mock event configurations.
4. **Interactive Modal Mapping**:
   retrieved event fields are mapped to a clean domain-specific `Event` schema which populates the **Event Detail Modal** when clicking cards across the application.

## 🧼 Code Quality & Clean Code Best Practices

To maintain code health and reliability, this project enforces the following styling and structure configurations:

### ⚙️ Code Quality Configurations

- **EditorConfig (`.editorconfig`)**: Enforces standard formatting across different IDEs—defining space indentation (2 spaces), UTF-8 character encoding, Unix-style line endings (`LF`), and trimming trailing whitespaces.
- **Prettier (`.prettierrc`)**: Defines stylistic preferences such as using single quotes, trailing commas (`es5`), mandatory semicolons, and automatically formats Astro component structures using `prettier-plugin-astro`.
- **ESLint (`eslint.config.js`)**: Employs the flat config syntax to apply recommended rules for JavaScript, TypeScript (`@typescript-eslint/recommended`), and Astro templates (`eslint-plugin-astro`). It integrates `eslint-config-prettier` to prevent styling conflicts.

### 🌟 Clean Code & Development Best Practices

- **Type Safety & Domain Modeling**: Enforces strict TypeScript compile-time checking. Explicit data contracts exist for Bevy's API response formats (`BevyEvent`) and local presentation models (`Event`). Avoid using `any` types.
- **Component-Driven Architecture**: Keeps components small, reusable, and single-purpose (e.g., `Icon.astro`, `EventDetailModal.astro`). All layout and global definitions live inside `src/components/` and `src/layouts/`.
- **Zero Flash of Un-themed Content (FOUC)**: Theme loading and system preference evaluations are executed synchronously via inline `<script>` snippets in the document header before HTML paint.
- **API Failure Resilience**: Always implement robust client-side fallbacks. When external Bevy API payloads are incomplete, the app gracefully falls back to local mocks and generates dynamic location links from geographic details on the fly.

## Contact / Social Media

- Bluesky – [@code-vista.bsky.social](https://bsky.app/profile/code-vista.bsky.social)
- GitHub - [https://github.com/JavaVista/](https://github.com/JavaVista/)
- LinkedIn - [Javier Carrion](https://www.linkedin.com/in/technologic)
- Website - [techno-logic.us](https://www.techno-logic.us)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
