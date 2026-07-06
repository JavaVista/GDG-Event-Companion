# GDG Event Companion - Design Reference

This document outlines the core visual style, user experience (UX) principles, and feature architecture of the GDG Event Companion, as defined by the approved design prototype.

![GDG Event Companion Prototype](/public/images/design-reference/gdg-event-companion-prototype.png)

---

## 1. Visual Style & Aesthetics

The application follows a premium, modern design framework inspired by **Google Material Design 3 (MD3)**, tailored specifically for Google Developer Groups (GDG) branding.

- **Theme & Colors**:
  - Uses the classic four-color Google branding palette: Blue (Primary), Green (Secondary), Yellow (Tertiary/Accent), and Red (Error/Danger).
  - Designed with clean light modes (default) and dark modes (e.g., retro-futuristic DevFest dark slate palette) using smooth gradients, glassmorphism, and color overlays (`color-mix` values).
  - Surface elevations, shapes, and border radii align with Material Design 3 container tokens (e.g., pill buttons, rounded card containers).
- **Playful yet Professional**:
  - Leverages dynamic custom vector micro-interactions and icons.
  - Combines bold headlines (Inter/Roboto sans-serif) with clear, structured metadata displays.
  - Interactive states (hover, focus, active indicator) provide immediate, delightful visual feedback.

---

## 2. Core UX Principles

- **Fast & Responsive**: Page routing and theme loading are optimized. Theme variables are loaded inline synchronously to eliminate Flash of Un-themed Content (FOUC).
- **Mobile-First App Shell**:
  - Built primarily for attendees and organizers navigating live physical events.
  - Confines the application to a centered smartphone viewport model on desktop screen sizes (`max-w-md` max-width, drop shadows, borders) and scales to a seamless full-screen app container on mobile screens.
- **Large, Accessible Tap Targets**:
  - Standard buttons, selectors, list elements, and bottom navigation tabs have generous click surfaces and padding to make touch navigation quick and error-free.
- **Organizer-Friendly**: Provides clear visual demarcations for organizer-only tools, protected behind simple access controls.

---

## 3. Architecture & Functional Requirements

### 3.1 Theme & Icon Swappability

- **Fully Replaceable Design System**:
  - Colors, gradients, hero backgrounds, and icons are controlled dynamically through theme configuration objects (`src/config/themes.ts`).
  - Icons are loaded from a semantic registry (`src/config/icons.ts`) that maps raw URL-encoded SVGs to CSS custom properties.
  - All icons render dynamically via `-webkit-mask-image` and `mask-image` utilities using `currentColor`. This allows changing the active theme or custom override SVGs to instantly propagate changes globally.

### 3.2 Offline-First Strategy

- **Linktree & Community Asset Caching**:
  - The application acts as an event linktree/dashboard containing quick links and schedules. All links, resources, and corresponding QR codes are cached on-device.
  - The QR Center serves as a repository for displaying scannable QR codes of these community links (e.g. Discord, GDG Central Florida community page, Code of Conduct) for easy sharing or projecting at events. It does NOT involve attendee tickets or check-in QR codes.
  - Key information is saved locally so users can access all community links, QR codes, and schedules even when the venue Wi-Fi is weak or offline.

### 3.3 Organizer Scripts Mode Flow

For hosting speakers, announcing housekeeping guidelines, and making opening/closing statements, organizers require a script presenter dashboard:

- **Read Mode First**:
  - By default, selecting a script (e.g. Intro Script or Outro Script) opens in **Read Mode**.
  - Read Mode presents a clean, distraction-free view of script sections, keeping texts large and readable for presenters holding mobile phones.
  - Prominent "Read / Edit" tab controls sit at the top.
- **Edit Mode (Explicit Selection)**:
  - Organizers must explicitly select **Edit Mode** to change script sections.
  - In Edit Mode, script sections transform into editable lists where users can view structural headers, drag to reorder them, add new segments, or delete existing segments.
  - "Cancel" and "Save" controls appear at the bottom to secure changes.

---

## 4. Design-to-Code Mapping Reference

| Design Artifact Panel               | Code Component/Page              | Primary Style Tokens                                    |
| :---------------------------------- | :------------------------------- | :------------------------------------------------------ |
| **Main Dashboard Frame**            | `src/pages/index.astro`          | `card-elevated`, `bg-primary-container`, `btn-filled`   |
| **App Header & Theme Selector**     | `src/components/AppShell.astro`  | `bg-surface/85`, `backdrop-blur-md`, `select-theme`     |
| **Bottom Navigation Bar**           | `src/components/BottomNav.astro` | `bg-secondary-container`, `text-on-secondary-container` |
| **QR Center (Community QRs)**       | `src/pages/qr.astro`             | `border-dashed`, `animate-pulse`, `font-mono`           |
| **Upcoming Events List**            | `src/pages/events.astro`         | `card-outlined`, `border-outline-variant`               |
| **More Options / Organizer Access** | `src/pages/more.astro`           | `card-filled`, `bg-secondary/15`, `shadow-elevation-1`  |
