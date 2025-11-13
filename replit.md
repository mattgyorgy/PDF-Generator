# Client-Proof Filming Guide Generator

## Overview

This project is a Next.js lead magnet application enabling social media managers to create custom-branded PDF filming guides for clients. Users input company details, upload a logo, select brand colors and a layout, view a real-time preview, and receive a professionally formatted PDF via email. The application features three distinct PDF layout styles (Modern, Bold, Classic) with instant preview updates and uses PDF generation with email delivery for lead capture.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**November 13, 2025 - Professional Email Design & Logo Alignment**
- Redesigned email template with Hero Network branding (black #000000 and lime green #D4FB5D)
- Professional HTML email layout with responsive tables for cross-client compatibility
- Added Hero Network logo in email header with black background and lime green accent bar
- Included CTA button linking to https://heronetwork.io for additional information
- Updated email subject line to "Your Custom Filming Guide is Ready! 🎬"
- PDF filename now includes company name for personalization
- Added logo alignment selector (left, center, right) in GeneratorTool.tsx
- Logo alignment applies to both live preview and PDF generation in all three styles
- Added Name field to ConversionModal above Email Address field with validation

**November 13, 2025 - Expanded Font Selection for Professional Brands**
- Expanded font selector from 7 to 16 professional brand fonts
- Added popular professional fonts: Arial, Georgia, Lato, Open Sans, Poppins, Raleway, Merriweather, Nunito, and Work Sans
- Retained existing fonts: Helvetica, Times New Roman, Courier, Inter, Playfair Display, Roboto, Montserrat
- Updated FontType in GeneratorContext.tsx to include all 16 font options
- Updated font mappings in LivePreview.tsx for browser-safe fallbacks
- Updated font mappings in PdfDocument.tsx for PDF generation compatibility

**November 13, 2025 - Style Template Updates**
- Removed "Powered by Hero" footer from all three style templates (Modern, Bold, Classic)
- Changed Bold style header from "Pro Video Tips" to "Video Filming Tips"
- Increased checkmark (✓) and X (✗) icon size in Bold style from default to 14pt for better visibility
- Reorganized color palette to 36 colors (6 rows × 6 columns) organized by color family
- Added white (#FFFFFF) as first color option in palette
- Color picker panels now open upward instead of downward
- Changed default primary color from blue to black (#000000)

**November 13, 2025 - Real-Time Background Removal Feature**
- Added "Magic-Remove Background" checkbox with instant preview
- Background removal processes immediately when checkbox is checked
- Created `/api/remove-background` route for client-side API calls
- Implemented loading spinner and disabled state during processing
- PDF generation uses pre-processed logo to avoid duplicate API calls

## System Architecture

### Frontend Architecture

**Framework:** Next.js 14 with App Router, chosen for server-side rendering, API routes, and modern React features.
**UI/UX:** A hybrid approach using Material-UI icons for iconography and Tailwind CSS for utility-first styling. The application features a dark theme with a lime-green accent, a reorganized 36-color palette, and an improved form layout with a dropdown for font selection and clickable color squares.
**State Management:** React Context API is used for managing application state, including company details, logo, colors, font, and selected style.
**Real-time Preview:** A two-panel layout provides immediate visual feedback as users customize their guide, updating on every state change.
**Style Selection:** Three distinct layout styles (Modern, Bold, Classic) are offered, allowing users to switch and preview styles instantly to match their brand identity.

### Backend Architecture

**API Routes:** Next.js API routes at `/api/generate` handle server-side PDF generation and email sending, keeping sensitive operations secure. Server actions are enabled with a 4mb body size limit for logo uploads.
**PDF Generation:** `@react-pdf/renderer` library is used to dynamically create PDFs from React components on the server, ensuring consistency between the live preview and the final PDF.
**Email Delivery:** Resend API is integrated for reliable transactional email delivery, sending the generated PDFs to users.
**File Handling:** User-uploaded logos are processed via the FormData API, converted to base64, and embedded into the PDF. A "Magic-Remove Background" feature integrates the Remove.bg API for instant background removal with real-time preview updates.

### Data Flow

**User Interaction:** User inputs data, state updates via `GeneratorContext`, `LivePreview` re-renders. Upon clicking "Generate," a `ConversionModal` appears for email submission, triggering a POST request to `/api/generate`. The server processes, sends the email, and confirms success.
**Logo Processing:** Uploaded logos are stored in context, previewed using `URL.createObjectURL()`, and converted to Base64 for PDF embedding during generation.

## External Dependencies

### Third-Party Services

**Resend:** Used for transactional email delivery to send generated PDFs.
**Remove.bg API:** Integrated for real-time background removal from uploaded logos.

### Key Libraries

**@react-pdf/renderer:** For server-side PDF generation using React components.
**@mui/icons-material:** Provides professional iconography.
**Tailwind CSS:** Utility-first CSS framework for UI styling.

### Development Tools

**TypeScript:** For type safety and improved developer experience.
**ESLint:** For code quality and consistency.

### Runtime Requirements

**Node.js Environment Variables:** `RESEND_API_KEY` and `REMOVE_BG_API_KEY` are required for email and background removal functionalities, respectively.