# Client-Proof Filming Guide Generator

## Overview

This is a Next.js-based lead magnet application that helps social media managers create custom-branded PDF filming guides for their clients. Users can input their company details, upload a logo, select brand colors and a layout style, see a real-time preview, and receive a professionally formatted PDF guide via email. The application features three distinct PDF layout styles (Modern, Bold, Classic) with instant preview updates and uses PDF generation with email delivery to capture leads.

## Recent Changes

**November 13, 2025 - Style Selection Feature Complete**
- Added "Choose Your Style" feature with three distinct PDF layout options
- Implemented Modern style (clean, minimal, lots of white space)
- Implemented Bold style (dark header, strong typography, high contrast with numbered badges)
- Implemented Classic style (traditional serif fonts, formal layout, cream background)
- Created real-time style preview switching in LivePreview component
- Updated PdfDocument component to support all three style variations
- Extended GeneratorContext to include style state management
- Modified API route and ConversionModal to pass style parameter through PDF generation
- All style implementations reviewed and approved by architect

**November 13, 2025 - Initial Implementation Complete**
- Initialized Next.js 14 project with TypeScript and Tailwind CSS
- Implemented all core components: GeneratorTool, LivePreview, ConversionModal, PdfDocument
- Created GeneratorContext for state management
- Built API route for PDF generation and email delivery via Resend
- Fixed critical bug: Resend attachment now receives base64-encoded PDF buffer
- Added modal state reset on close for improved UX during repeated submissions
- Dev server running successfully on port 5000

**Next Steps**
- Add RESEND_API_KEY environment variable to test email functionality
- Test all three style variations end-to-end
- Optional: Configure allowedDevOrigins in next.config.js to suppress warnings

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: Next.js 14 with App Router**
- **Problem**: Need server-side rendering capabilities, API routes, and modern React features
- **Solution**: Next.js App Router provides file-based routing, built-in API routes, and server components
- **Rationale**: Simplifies full-stack development in a single framework with TypeScript support

**UI Component Strategy: Hybrid Approach**
- **Problem**: Need both Material-UI icons and custom components with Tailwind styling
- **Solution**: Material-UI icons (@mui/icons-material) for consistent iconography, Tailwind CSS for utility-first styling
- **Alternatives**: Could use a complete UI library like Material-UI or Chakra UI
- **Pros**: Lightweight, flexible styling with Tailwind; professional icons from MUI
- **Cons**: Mixing styling approaches requires careful management

**State Management: React Context API**
- **Problem**: Share user input (company name, logo, brand color, style) between Generator Tool and Live Preview components
- **Solution**: Custom GeneratorContext with React Context API and hooks
- **Rationale**: Simple state sharing without external dependencies; sufficient for this application's limited state complexity
- **Structure**: Centralized state in `GeneratorContext.tsx` with provider wrapping the main page
- **State**: companyName, brandColor, logo, style (modern | bold | classic)

**Real-time Preview System**
- **Problem**: Users need immediate visual feedback as they customize their guide
- **Solution**: Two-panel layout with live preview that updates on every state change
- **Implementation**: Generator tool on left updates context; preview component on right consumes context and re-renders
- **Rationale**: Improves user experience and increases conversion likelihood

**Style Selection System**
- **Problem**: Different clients prefer different aesthetic approaches for their branded materials
- **Solution**: Three distinct layout styles with instant preview switching
- **Implementation**: 
  - GeneratorTool displays three clickable style preview cards
  - LivePreview component has three rendering functions (renderModernStyle, renderBoldStyle, renderClassicStyle)
  - PdfDocument component branches on style prop with separate StyleSheet definitions for each variant
  - Style preference persists from selection through PDF generation
- **Style Variants**:
  - **Modern**: Clean, minimal layout with subtle borders, white background, compact spacing
  - **Bold**: High contrast design with dark header, numbered badges, checkmarks/crosses, gray background
  - **Classic**: Traditional formal layout with serif fonts, cream background, circled numbers, border accents
- **Rationale**: Allows users to match their brand identity; increases perceived value of lead magnet

### Backend Architecture

**API Route Design: Server Actions**
- **Problem**: Generate PDF and send email without exposing API keys to client
- **Solution**: Next.js API route at `/api/generate/route.ts` handles server-side processing
- **Configuration**: Server actions enabled with 4mb body size limit to accommodate logo uploads
- **Rationale**: Keeps sensitive operations server-side while maintaining Next.js architecture

**PDF Generation Strategy**
- **Problem**: Create custom-branded PDFs dynamically on the server
- **Solution**: @react-pdf/renderer library to generate PDFs using React components
- **Implementation**: `PdfDocument.tsx` component defines PDF structure; rendered to buffer server-side
- **Alternatives**: Traditional PDF libraries (PDFKit, jsPDF)
- **Pros**: React-based syntax familiar to developers; declarative styling
- **Cons**: Learning curve for PDF-specific styling constraints

**Email Delivery Architecture**
- **Problem**: Send generated PDFs to users reliably
- **Solution**: Resend API for transactional email delivery
- **Implementation**: API key stored in environment variable; PDF attached as buffer
- **Rationale**: Modern, developer-friendly API; reliable delivery; simple integration

**File Handling Approach**
- **Problem**: Process user-uploaded logos securely
- **Solution**: FormData API for multipart uploads; logo converted to base64 for PDF embedding
- **Implementation**: Logo uploaded as File, converted to buffer, then base64 data URL for rendering
- **Rationale**: Ensures compatibility with @react-pdf/renderer image requirements

### Data Flow

**User Interaction Flow**:
1. User inputs data in GeneratorTool component
2. State updates via GeneratorContext
3. LivePreview component re-renders with updated data
4. User clicks "Generate" → ConversionModal opens
5. User submits email → POST to `/api/generate`
6. Server generates PDF, sends email, returns success
7. Modal displays success message

**Logo Processing Pipeline**:
1. File upload via input element
2. File stored in context state
3. Preview URL created via `URL.createObjectURL()` for browser preview
4. On generation: File → ArrayBuffer → Base64 → Data URL for PDF

### Component Architecture

**Modal Pattern for Conversion**
- **Problem**: Capture email without disrupting user flow
- **Solution**: ConversionModal component with controlled visibility
- **States**: idle, loading, success, error
- **Rationale**: Non-intrusive lead capture; clear user feedback

**Reusable PDF Component**
- **Problem**: Maintain consistency between preview and generated PDF
- **Solution**: Shared PdfDocument component with props for customization
- **Note**: Browser preview uses simplified HTML/CSS; actual PDF uses @react-pdf/renderer

## External Dependencies

### Third-Party Services

**Resend Email Service**
- **Purpose**: Transactional email delivery for sending generated PDFs
- **Authentication**: API key via environment variable `RESEND_API_KEY`
- **Usage**: Sending custom-branded PDF guides to user emails
- **Integration**: Server-side only in `/api/generate` route

### Key Libraries

**@react-pdf/renderer (v4.3.1)**
- **Purpose**: Server-side PDF generation using React components
- **Features**: React-based PDF creation, custom styling, image embedding
- **Usage**: PdfDocument component renders to PDF buffer

**Material-UI Icons (@mui/icons-material v7.3.5)**
- **Purpose**: Professional iconography for filming guide rules
- **Dependencies**: Requires @emotion/react and @emotion/styled
- **Usage**: Icons for light, sound, frame, clean, and upload rules

**Tailwind CSS (v3.4.1)**
- **Purpose**: Utility-first CSS framework for rapid UI development
- **Configuration**: Standard setup with PostCSS and Autoprefixer
- **Usage**: All component styling except MUI icons

### Development Tools

**TypeScript (v5)**
- **Purpose**: Type safety and improved developer experience
- **Configuration**: Strict mode enabled; path aliases configured (`@/*`)

**ESLint with Next.js Config**
- **Purpose**: Code quality and consistency
- **Configuration**: Next.js-specific linting rules

### Runtime Requirements

**Node.js Environment Variables**:
- `RESEND_API_KEY`: Required for email functionality

**Port Configuration**:
- Development: Port 5000 (configured in package.json scripts)
- Production: Standard Next.js deployment (Vercel)

### Build Dependencies

**PostCSS with Autoprefixer**
- **Purpose**: CSS processing and vendor prefixing for Tailwind

**Next.js Build System**
- **Configuration**: Server actions enabled with 4mb body size limit for file uploads
- **Target Platform**: Vercel serverless deployment