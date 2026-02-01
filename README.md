# Veritas Engine - Fake News Detection AI

A full-stack Next.js 15 application with dark neon matrix theme for real-time fake news detection using Google Gemini API.

## Features

? **Drag-Drop URL Input** - Paste or drag news URLs  
? **Gemini AI Analysis** - Real-time fact-checking powered by Google Gemini  
? **Live Terminal Output** - Watch API calls execute in real-time  
? **Dark Neon Matrix Theme** - Stunning cyberpunk-inspired UI  
? **Structured Verdict System** - 0-100% fake score with detailed proof sources  
? **Claims Verification** - Individual claim analysis with evidence  
? **Deploy-Ready** - Vercel & Netlify compatible  

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Tailwind CSS
- **AI**: Google Gemini 3 Pro API
- **State Management**: React Hooks
- **Deployment**: Vercel / Netlify

## Quick Start

### Prerequisites
- Node.js 18+
- Google Gemini API Key

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd veritas-engine

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here" > .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` and start analyzing news!

## Environment Setup

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Project Structure

```
src/
+-- app/
¦   +-- api/
¦   ¦   +-- analyze/
¦   ¦       +-- route.ts        # Gemini API endpoint
¦   +-- layout.tsx              # Root layout
¦   +-- page.tsx                # Main page
¦   +-- globals.css             # Global styles
+-- components/
¦   +-- URLInput.tsx            # Drag-drop input
¦   +-- Terminal.tsx            # Live execution output
¦   +-- Verdict.tsx             # Analysis results
¦   +-- MatrixRain.tsx          # Background animation
+-- hooks/
¦   +-- useAnalysis.ts          # Custom hook for analysis
+-- styles/
¦   +-- components.module.css   # Component styles
+-- types/
    +-- index.ts                # TypeScript interfaces
```

## Key Features Explained

### 1. URL Input Component
- Drag-drop file upload support
- Paste URL directly
- Real-time validation
- Loading states

### 2. Live Terminal
- Shows API calls in real-time
- Execution logs with timestamps
- Matrix-themed styling
- Auto-scrolling output

### 3. Verdict System
- Fake score: 0-100%
- Verdict types: TRUE | FALSE | MIXED | UNVERIFIABLE
- Claims breakdown with individual verification
- Proof sources with relevance scores
- Timestamp tracking

### 4. Gemini Integration
- Automatic URL content fetching
- Claim extraction and verification
- Source validation
- Evidence-based analysis

## Styling System

All styling uses CSS Modules with a dark neon theme:

```css
--matrix-green: #00ff41    /* Primary accent */
--matrix-cyan: #00ffff    /* Secondary accent */
--matrix-red: #ff0055     /* Error/danger */
--bg-dark: #000000        /* Dark background */
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set environment variable in Vercel dashboard:
- `NEXT_PUBLIC_GEMINI_API_KEY` = your API key

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=.next
```

Set environment variable in Netlify:
- `NEXT_PUBLIC_GEMINI_API_KEY` = your API key

## API Endpoint

### POST /api/analyze

Request:
```json
{
  "url": "https://example.com/news/article",
  "content": "optional article content"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/news/article",
    "fakeScore": 75,
    "verdict": "FALSE",
    "summary": "This article contains multiple unverified claims...",
    "claims": [
      {
        "text": "Claim text here",
        "status": "FALSE",
        "evidence": "Verification failed because..."
      }
    ],
    "proofSources": [
      {
        "title": "Source Title",
        "url": "https://source.com",
        "relevance": 85
      }
    ],
    "executionLog": [...],
    "timestamp": "2026-01-15T18:00:00.000Z"
  }
}
```

## Performance Tips

1. **Caching**: Implement Redis for caching analysis results
2. **Rate Limiting**: Add API rate limiting for production
3. **Image Optimization**: Next.js Image component for responsive images
4. **Code Splitting**: Automatic with Next.js App Router

## Error Handling

The application includes comprehensive error handling:
- Network error recovery
- Graceful fallbacks
- User-friendly error messages
- Execution log tracking

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please create a feature branch and submit a PR.

## Support

For issues and feature requests, please open a GitHub issue.

---

**Built with ?? for truth detection**
