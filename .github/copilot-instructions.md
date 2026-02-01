# Veritas Engine - Copilot Instructions

## Project Overview
Full-stack React/Next.js 15 web app for fake news detection using Gemini API with dark neon matrix theme.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark neon theme
- **AI**: Google Gemini 3 API
- **State Management**: React Hooks
- **HTTP**: Fetch API

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── api/
│       └── analyze/        # Gemini fact-check endpoint
├── components/
│   ├── URLInput.tsx        # Drag-drop URL input
│   ├── Terminal.tsx        # Live execution output
│   ├── Verdict.tsx         # Fact-check results
│   └── MatrixRain.tsx      # Background animation
├── hooks/
│   └── useAnalysis.ts      # Custom analysis hook
├── styles/
│   └── globals.css         # Dark neon matrix theme
└── types/
    └── index.ts            # TypeScript interfaces
```

## Environment Setup
Create `.env.local` with:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## Key Features
- [x] Next.js 15 scaffolding
- [ ] Drag-drop URL input component
- [ ] Gemini API integration with code execution
- [ ] Live terminal output for API calls
- [ ] Dark neon matrix CSS theme
- [ ] Structured verdict system (0-100% fake score)
- [ ] API routes for fact-checking
- [ ] Responsive design
- [ ] Error handling & validation

## Current Progress
- [x] Project scaffolding complete
- [x] Dependencies installed
- [ ] Install additional packages (google-generative-ai, cheerio, axios)
- [ ] Create UI components
- [ ] Build API routes
- [ ] Style with neon theme
- [ ] Deploy configuration

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run start` - Start production server

## Notes
- Dark neon matrix theme uses: `#00FF41` (matrix green), `#000` (black bg)
- Gemini API calls use code_execution mode for fact verification
- Terminal component shows real-time API activity
- Verdict component displays confidence score + proof sources
