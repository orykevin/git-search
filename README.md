# GitHub Search

## Overview
GitHub Search is a React-based web application designed to help users search for repositories and users on GitHub. Built with Vite for blazing-fast development, TailwindCSS for modern styling, and Shadcn components for accessible, customizable UI elements.

## Features
- 🔍 **Search repositories and users** on GitHub
- 🎯 **Responsive and dynamic UI** with TailwindCSS
- 🎉 **Modern components** powered by Shadcn (Accordion, Dialog, Dropdown, etc.)

## Tech Stack
- **React 19**
- **Vite** for development & build
- **TailwindCSS** with `tailwind-merge` and `tailwindcss-animate`
- **Shadcn** UI components
- **React Hook Form** for form handling
- **Zod** for schema validation
- **Vitest** & **Testing Library** for unit tests
- **ESLint** for code linting

## Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-repo/github-search.git
   cd github-search
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

6. **Run tests:**
   ```bash
   npm run test
   ```

7. **Lint code:**
   ```bash
   npm run lint
   ```

## Environment Variables
Create a `.env` file in the root directory and add:
```
VITE_GITHUB_TOKEN=your_personal_access_token
```

> **Note:** A GitHub personal access token (PAT) is required to avoid API rate limits. Get one from [GitHub Settings](https://github.com/settings/tokens).

## Credits
- UI Components: [Shadcn](https://ui.shadcn.com)
- Icons: [Lucide React](https://lucide.dev)
- Styling: [TailwindCSS](https://tailwindcss.com)