# Veritas Engine - Design Document

## 1. System Architecture

### 1.1 High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │  External APIs  │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│  (Gemini AI)    │
│                 │    │                 │    │                 │
│ - URL Input     │    │ - Analysis      │    │ - Content       │
│ - Terminal      │    │ - Content Fetch │    │   Analysis      │
│ - Results       │    │ - AI Integration│    │ - Fact Checking │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 Component Architecture
```
App Router (Next.js 15)
├── / (Home Page)
│   └── URLInput Component
├── /analyze (Analysis Page)
│   ├── Terminal Component
│   └── Verdict Component
└── /api/analyze (API Route)
    ├── Content Fetching
    ├── Gemini AI Integration
    └── Response Processing
```

## 2. Frontend Design

### 2.1 Page Structure

#### 2.1.1 Home Page (`/`)
**Purpose**: URL input and analysis initiation
**Components**:
- Header with application title and description
- URLInput component with drag-drop functionality
- Navigation to analysis page

**Layout**:
```
┌─────────────────────────────────────┐
│            Veritas Engine           │
│     Real-time credibility analysis  │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐│
│  │     Paste or drag URL here      ││
│  │                                 ││
│  │         [Analyze Button]        ││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘
```

#### 2.1.2 Analysis Page (`/analyze`)
**Purpose**: Real-time analysis display and results
**Components**:
- Terminal component for live execution logs
- Verdict component for analysis results
- Suspense boundary for search params handling

**Layout**:
```
┌─────────────────────────────────────┐
│        Veritas Engine — Analysis    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │         Terminal Output         ││
│  │  [12:34:56] Initializing...     ││
│  │  [12:34:57] Fetching content... ││
│  │  [12:34:58] Analyzing claims... ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │         Analysis Results        ││
│  │  Fake Score: 25%                ││
│  │  Verdict: MIXED                 ││
│  │  Claims: [detailed breakdown]   ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### 2.2 Component Design

#### 2.2.1 URLInput Component
**Responsibilities**:
- Accept URL input via text field or drag-drop
- Validate URL format
- Trigger analysis navigation
- Display loading states

**Props Interface**:
```typescript
interface URLInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}
```

**Features**:
- Real-time URL validation
- Drag-and-drop file support
- Loading state management
- Error handling for invalid URLs

#### 2.2.2 Terminal Component
**Responsibilities**:
- Display real-time execution logs
- Auto-scroll to latest entries
- Format timestamps and messages
- Maintain matrix-themed styling

**Props Interface**:
```typescript
interface TerminalProps {
  logs: string[];
}
```

**Features**:
- Timestamp formatting
- Auto-scrolling behavior
- Matrix-style text effects
- Log message categorization

#### 2.2.3 Verdict Component
**Responsibilities**:
- Display analysis results
- Format credibility scores
- Show claim breakdowns
- Present proof sources

**Props Interface**:
```typescript
interface VerdictProps {
  result: AnalysisResult;
  loading: boolean;
}
```

**Features**:
- Score visualization (0-100%)
- Verdict type indicators
- Expandable claim details
- Source link validation

### 2.3 Styling System

#### 2.3.1 Design Theme
**Style**: Dark neon matrix cyberpunk theme
**Color Palette**:
```css
:root {
  --matrix-green: #00ff41;    /* Primary accent */
  --matrix-cyan: #00ffff;     /* Secondary accent */
  --matrix-red: #ff0055;      /* Error/danger */
  --bg-dark: #000000;         /* Dark background */
  --bg-gradient: linear-gradient(135deg, #0b1020, #020617, #000000);
}
```

#### 2.3.2 Component Styling
**Glass Effect**:
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
```

**Glow Effects**:
```css
.glow-text {
  text-shadow: 0 0 10px var(--matrix-green);
}

.glow-border {
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}
```

## 3. Backend Design

### 3.1 API Architecture

#### 3.1.1 Analysis Endpoint (`/api/analyze`)
**Method**: POST
**Purpose**: Process news article URLs and return credibility analysis

**Request Flow**:
1. Receive and validate request body
2. Extract URL and optional content
3. Fetch article content if not provided
4. Initialize Gemini AI model
5. Generate analysis prompt
6. Process AI response
7. Format and return results

**Request Schema**:
```typescript
interface AnalysisRequest {
  url: string;           // Required: Article URL
  content?: string;      // Optional: Pre-fetched content
}
```

**Response Schema**:
```typescript
interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

interface AnalysisResult {
  url: string;
  fakeScore: number;                    // 0-100
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIABLE';
  claims: Claim[];
  summary: string;
  proofSources: ProofSource[];
  executionLog: string[];
  timestamp: string;
}
```

### 3.2 Content Processing

#### 3.2.1 URL Content Fetching
**Process**:
1. Validate URL format and accessibility
2. Fetch HTML content with appropriate headers
3. Strip HTML tags and extract text content
4. Limit content length (3000 characters)
5. Handle fetch timeouts and errors

**Error Handling**:
- Network timeouts (20 second limit)
- Invalid URLs or inaccessible content
- Rate limiting from target websites
- Malformed HTML or encoding issues

#### 3.2.2 AI Integration (Gemini)
**Model**: `gemini-2.5-flash` (free-tier compatible)
**Configuration**:
- Temperature: Default (balanced creativity/accuracy)
- Max tokens: Automatic based on content length
- Safety settings: Default (balanced filtering)

**Prompt Engineering**:
```
Analyze this news article for potential fake news and misinformation:
URL: {url}
Content: {content}

Provide a JSON response with this exact structure:
{
  "fakeScore": <number 0-100>,
  "verdict": "<TRUE|FALSE|MIXED|UNVERIFIABLE>",
  "summary": "<brief summary of findings>",
  "claims": [...],
  "proofSources": [...]
}
```

## 4. Data Models

### 4.1 Core Types

#### 4.1.1 Analysis Result
```typescript
interface AnalysisResult {
  url: string;                          // Source URL
  fakeScore: number;                    // Credibility score (0-100)
  verdict: VerdictType;                 // Overall assessment
  claims: Claim[];                      // Individual claim analysis
  summary: string;                      // Executive summary
  proofSources: ProofSource[];          // Supporting evidence
  executionLog: string[];               // Process tracking
  timestamp: string;                    // ISO timestamp
}
```

#### 4.1.2 Claim Analysis
```typescript
interface Claim {
  text: string;                         // Claim statement
  status: 'VERIFIED' | 'FALSE' | 'UNVERIFIABLE';
  evidence: string;                     // Supporting reasoning
}
```

#### 4.1.3 Proof Sources
```typescript
interface ProofSource {
  title: string;                        // Source title
  url: string;                          // Source URL
  relevance: number;                    // Relevance score (0-100)
}
```

## 5. State Management

### 5.1 Client-Side State

#### 5.1.1 Analysis Hook (`useAnalysis`)
**Purpose**: Manage analysis process and results
**State Variables**:
- `loading: boolean` - Analysis in progress
- `result: AnalysisResult | null` - Analysis results
- `terminal: string[]` - Execution logs
- `error: string | null` - Error messages

**Methods**:
- `analyze(request: AnalysisRequest)` - Initiate analysis
- `addLog(message: string)` - Add terminal entry
- Auto-scrolling terminal reference management

#### 5.1.2 State Flow
```
Initial State
    ↓
URL Input → Loading State → Analysis Request
    ↓                           ↓
Navigation → Terminal Updates → Results Display
    ↓                           ↓
Analysis Page ← Success/Error ← API Response
```

## 6. Error Handling

### 6.1 Frontend Error Handling

#### 6.1.1 Network Errors
- Connection timeouts (30 second limit)
- Server unavailability
- API rate limiting
- Invalid responses

**Recovery Strategies**:
- Retry mechanisms for transient failures
- Graceful degradation with partial results
- User-friendly error messages
- Fallback to cached results when available

#### 6.1.2 Validation Errors
- Invalid URL formats
- Empty or malformed requests
- Unsupported content types
- Security violations

### 6.2 Backend Error Handling

#### 6.2.1 API Errors
- Gemini API failures or rate limits
- Content fetching timeouts
- JSON parsing errors
- Authentication failures

**Error Response Format**:
```typescript
{
  success: false,
  error: "Descriptive error message",
  code?: "ERROR_CODE"
}
```

#### 6.2.2 Fallback Mechanisms
- Default analysis results for API failures
- Cached responses for repeated URLs
- Graceful degradation with limited functionality
- Comprehensive logging for debugging

## 7. Performance Optimization

### 7.1 Frontend Optimization

#### 7.1.1 Code Splitting
- Automatic route-based splitting (Next.js)
- Component lazy loading where appropriate
- Dynamic imports for heavy dependencies
- Optimized bundle sizes

#### 7.1.2 Rendering Optimization
- Server-side rendering for initial page load
- Static generation for non-dynamic content
- Suspense boundaries for async operations
- Efficient re-rendering with React hooks

### 7.2 Backend Optimization

#### 7.2.1 API Performance
- Request/response compression
- Efficient content processing
- Optimized AI prompt engineering
- Connection pooling for external APIs

#### 7.2.2 Caching Strategy
- Response caching for repeated URLs
- Static asset optimization
- CDN integration for global performance
- Browser caching headers

## 8. Security Considerations

### 8.1 Input Validation
- URL format validation and sanitization
- Content length limits
- XSS prevention in user inputs
- CSRF protection for API endpoints

### 8.2 API Security
- Environment variable protection for API keys
- Rate limiting to prevent abuse
- Request size limits
- Secure HTTP headers

### 8.3 Content Security
- Safe HTML parsing and content extraction
- Protection against malicious URLs
- Secure external API communications
- Input sanitization for AI prompts

## 9. Testing Strategy

### 9.1 Unit Testing
**Components to Test**:
- URLInput validation logic
- Terminal log formatting
- Verdict result display
- Analysis hook functionality

**Testing Framework**: Jest with React Testing Library

### 9.2 Integration Testing
**API Testing**:
- Analysis endpoint functionality
- Error handling scenarios
- Gemini API integration
- Content fetching reliability

### 9.3 End-to-End Testing
**User Flows**:
- Complete analysis workflow
- Error recovery scenarios
- Cross-browser compatibility
- Mobile responsiveness

## 10. Deployment Architecture

### 10.1 Production Environment
**Platform**: Vercel (primary), Netlify (secondary)
**Configuration**:
- Automatic deployments from main branch
- Environment variable management
- Custom domain configuration
- SSL certificate automation

### 10.2 Environment Variables
```
GEMINI_API_KEY=<google_gemini_api_key>
NEXT_PUBLIC_APP_URL=<application_url>
NODE_ENV=production
```

### 10.3 Build Process
1. TypeScript compilation and type checking
2. ESLint code quality validation
3. Tailwind CSS optimization
4. Next.js production build
5. Static asset optimization
6. Deployment to hosting platform

## 11. Monitoring and Analytics

### 11.1 Performance Monitoring
- Page load time tracking
- API response time monitoring
- Error rate analysis
- User engagement metrics

### 11.2 Error Tracking
- Client-side error logging
- Server-side error monitoring
- API failure tracking
- User feedback collection

## 12. Future Enhancements

### 12.1 Planned Features
- User authentication and analysis history
- Batch URL processing capabilities
- Advanced AI model integration
- Real-time collaboration features
- Mobile application development

### 12.2 Scalability Improvements
- Database integration for persistent storage
- Redis caching layer
- Microservices architecture
- Load balancing and auto-scaling
- Multi-region deployment