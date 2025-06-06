---
trigger: model_decision
---

# LearnFun SL - Development Tasks

## Phase 1: Foundation (Weeks 1-2)

### Project Setup

- [ ] Initialize Next.js project with TypeScript
- [ ] Configure ESLint, Prettier, and Git hooks
- [ ] Set up environment variables and validation
- [ ] Create basic folder structure and routing

### External Services Integration

- [ ] **Supabase**: Create database schema (users, content, progress)
- [ ] **Clerk**: Configure authentication with metadata fields
- [ ] **Cloudflare R2**: Set up file storage with signed URLs
- [ ] **Pinecone**: Initialize vector database for RAG
- [ ] **Google Gemini**: Configure AI API with rate limiting
- [ ] **PostHog**: Implement analytics tracking

### Multilingual Support

- [ ] Install next-i18next for EN/SI/TA support
- [ ] Add Sinhala/Tamil fonts (Noto Sans)
- [ ] Create translation files for UI components
- [ ] Implement language switcher component

## Phase 2: Core Features (Weeks 3-6)

### UI Framework

- [ ] Design system with Tailwind CSS
- [ ] Responsive layout components (header, nav, footer)
- [ ] Reusable UI components (buttons, forms, cards)
- [ ] Authentication pages and user profile setup

### Past Papers Feature

- [ ] Admin content upload interface with validation
- [ ] Multi-level filtering system (grade, subject, year, medium)
- [ ] Secure download system with tracking
- [ ] Search and pagination functionality

### Textbook Library

- [ ] PDF upload and text extraction
- [ ] Chapter-wise organization system
- [ ] Integrated PDF viewer with bookmarks
- [ ] Content summarization pipeline

### Video Lessons

- [ ] YouTube video curation interface
- [ ] Metadata extraction and curriculum alignment
- [ ] Video gallery with filtering options
- [ ] Progress tracking for watched content

## Phase 3: AI Implementation (Weeks 7-8)

### RAG System

- [ ] Content preprocessing and chunking pipeline
- [ ] Vector embedding and storage in Pinecone
- [ ] Semantic search implementation
- [ ] Context-aware response generation

### Chatbot Interface

- [ ] Real-time chat UI with conversation history
- [ ] Rate limiting system (20 queries/day per user)
- [ ] Multilingual prompt engineering
- [ ] File upload for homework assistance
- [ ] Safety filters and content moderation

### Specialized AI Features

- [ ] Career guidance knowledge base
- [ ] Subject-specific response templates
- [ ] Exam preparation assistance
- [ ] Study technique recommendations

## Phase 4: User Management (Weeks 8-9)

### User Profiles

- [ ] Profile management with grade/language preferences
- [ ] Progress tracking dashboard with visualizations
- [ ] Study streak calculations
- [ ] Personalized content recommendations

### Admin Panel

- [ ] Role-based access control
- [ ] Content management interface
- [ ] User analytics dashboard
- [ ] System monitoring and alerts

## Phase 5: Optimization & Security (Weeks 9-10)

### Performance

- [ ] Code splitting and lazy loading
- [ ] Progressive Web App configuration
- [ ] CDN setup for static assets
- [ ] Database query optimization
- [ ] Mobile-first responsive optimization

### Security

- [ ] Input validation and XSS protection
- [ ] File upload security (type validation, virus scanning)
- [ ] Rate limiting for all API endpoints
- [ ] GDPR compliance implementation

### Testing

- [ ] Unit tests with Jest and React Testing Library
- [ ] Integration tests for critical flows
- [ ] End-to-end testing with Playwright
- [ ] Performance testing and monitoring

## Phase 6: Deployment & Launch (Weeks 10-11)

### Production Setup

- [ ] Vercel deployment configuration
- [ ] Environment variables and domain setup
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Error tracking with Sentry

### Content Collection

- [ ] O/L and A/L past papers (2016-2025)
- [ ] NIE textbook summaries by grade
- [ ] Curated YouTube educational content
- [ ] Quality assurance and categorization

### Launch Preparation

- [ ] Beta testing with feedback collection
- [ ] User documentation and FAQ
- [ ] Support system setup
- [ ] Marketing materials and demos

## Phase 7: Post-Launch (Week 12+)

### Monitoring & Support

- [ ] User feedback analysis and bug fixes
- [ ] Performance monitoring and optimization
- [ ] Content expansion based on usage patterns
- [ ] Feature enhancements and A/B testing

## Database Schema Priorities

```sql
-- Core tables for MVP
CREATE TABLE content (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type content_type NOT NULL,
  grade INTEGER CHECK (grade >= 1 AND grade <= 13),
  subject VARCHAR(100) NOT NULL,
  medium content_medium NOT NULL,
  file_url TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  content_id UUID REFERENCES content(id),
  progress_type VARCHAR(50) NOT NULL,
  progress_value INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Technical Stack Summary

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase PostgreSQL
- **Auth**: Clerk with role management
- **Storage**: Cloudflare R2 for files
- **AI**: Google Gemini 2.5 Flash + Pinecone RAG
- **Analytics**: PostHog for user tracking
- **Deployment**: Vercel with CI/CD

## Success Metrics

- User registration and retention rates
- Content download/view statistics
- AI chatbot usage and satisfaction
- Mobile vs desktop usage patterns
- Language preference distribution

## Risk Mitigation

- Implement comprehensive error handling
- Create fallback systems for external services
- Monitor API rate limits and costs
- Maintain regular data backups
- Plan for scaling based on user growth
