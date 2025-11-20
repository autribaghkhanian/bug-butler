# Bug Butler 🐛

> **Transform informal bug descriptions into professional, structured reports using conversational AI.**

A production-ready React + TypeScript SPA demonstrating modern web development practices and OpenAI API integration. Built to showcase clean architecture, accessibility, and mobile-first design.

[**Live Demo**](#) · [Features](#features) · [Tech Stack](#tech-stack) · [Quick Start](#quick-start)

---

## Overview

Bug Butler eliminates the friction of writing detailed bug reports. Through a simple chat interface, it guides users through key questions and automatically generates standardized reports with proper formatting, reproduction steps, and context.

**Key Benefits:**
- **For Teams:** Standardizes bug reporting across all team members
- **For Developers:** Reduces back-and-forth clarification on issues
- **For QA:** Ensures consistent, actionable bug documentation

---

## Features

### Core Functionality
- **Conversational UI** - Natural chat flow for gathering bug details
- **AI-Powered Structuring** - OpenAI GPT integration for intelligent formatting
- **One-Click Copy** - Markdown-formatted output ready for issue trackers

### Technical Highlights
- **Full TypeScript** - Type-safe codebase with proper interfaces
- **Mobile-First Design** - Responsive across all devices
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Client-Side Only** - No backend required, works entirely in-browser
- **Privacy-First** - API keys stored locally, never sent to external servers

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (build tooling)
- Tailwind CSS (styling)
- Framer Motion (animations)

**AI Integration**
- OpenAI API (GPT-4o-mini)
- Client-side API calls
- Structured prompt engineering

**Deployment**
- GitHub Pages (static hosting)
- GitHub Actions (CI/CD)

---

## Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bug-butler.git
cd bug-butler

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/bug-butler/](http://localhost:5173/bug-butler/)

### Usage

1. Click "Start Reporting"
2. Enter your OpenAI API key (stored in browser localStorage)
3. Chat with Bug Butler about the issue
4. Get a formatted bug report
5. Copy and paste into your issue tracker

---

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run type-check   # Run TypeScript checks
npm run preview      # Preview production build
```

---

## Architecture

### Project Structure
```
src/
├── components/       # React components
│   ├── ui/          # Reusable UI primitives
│   ├── Landing.tsx
│   ├── ChatInterface.tsx
│   └── BugReport.tsx
├── lib/
│   ├── constants.ts # Configuration & prompts
│   └── openai.ts    # API integration
└── styles/
    └── globals.css  # Tailwind + custom styles
```

### Key Design Decisions
- **No backend required** - Fully client-side for easy deployment
- **Constants file** - Centralized configuration for prompts and settings
- **TypeScript strict mode** - Catch errors at compile time
- **Component composition** - Reusable UI primitives with variants

---

## Deployment

### GitHub Pages (Automated)

1. Update `base` in `vite.config.js` to match your repo name
2. Push to GitHub
3. Enable GitHub Pages in Settings → Pages → Source: "GitHub Actions"
4. Workflow automatically builds and deploys on push to `main`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## Best Practices Implemented

✅ **TypeScript** - Full type safety
✅ **Accessibility** - ARIA labels, keyboard navigation
✅ **Mobile-First** - Responsive design with Tailwind breakpoints
✅ **Error Handling** - User-friendly error messages
✅ **Security** - Input validation, no API key exposure
✅ **Performance** - Code splitting, lazy loading
✅ **DX** - Hot reload, TypeScript autocomplete

---

## Use Cases

**Developer Portfolio**
- Showcases React, TypeScript, and AI integration skills
- Demonstrates clean architecture and best practices
- Production-ready code with proper error handling

**Team Tool**
- Standardize bug reports across organization
- Reduce time spent formatting issues
- Improve bug report quality

**Learning Resource**
- Study modern React patterns
- Learn OpenAI API integration
- Understand client-side architecture

---

## Configuration

**API Models**
Easily swap OpenAI models in `src/lib/constants.ts`:
```typescript
export const OPENAI_MODEL = 'gpt-4o-mini' // or gpt-5-mini, gpt-4, etc.
```

**Prompt Customization**
Modify system prompts in `src/lib/constants.ts` to change conversation flow or report format.

---

## License

MIT

---

## Contributing

Contributions welcome! Please open an issue or PR.

---

**Built with [Claude Code](https://claude.com/claude-code) ✨**
