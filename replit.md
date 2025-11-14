# Client-Proof Filming Guide Generator

## Overview

This project is a Next.js lead magnet application enabling social media managers to create custom-branded PDF filming guides for clients. Users input company details, upload a logo, select brand colors and a layout, view a real-time preview, and receive a professionally formatted PDF via email. The application features three distinct PDF layout styles (Modern, Bold, Classic) with instant preview updates and uses PDF generation with email delivery for lead capture.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**November 14, 2025 - Email Logo Removed for Better Deliverability**
- Removed logo image from email template to improve email deliverability and cross-client compatibility
- Replaced image with styled text "HERO NETWORK" in lime green (#D4FB5D) on black background
- Kept professional black header with lime green accent bar for brand consistency
- Eliminates external image loading issues and improves spam filter compatibility

**November 14, 2025 - Filming Tips Text Refinements**
- Updated all filming tips with improved clarity and softer tone
- Tip 2 (Stability): Added "a tripod" as option; changed em-dash to commas: "use two hands, a tripod, or prop it on a surface"
- Tip 3 (Recording): Removed "still" for clarity: "Hit record and hold your shot for at least 8 seconds"
- Tip 4 (Variety): Added "try" to make less prescriptive: "try to capture at least three different shots"
- Tip 5 (Send): Softened tone from "Don't" to "Try not to"; changed "shrink and ruin your file!" to "can shrink the file"
- All changes applied consistently to both LivePreview.tsx and PdfDocument.tsx

**November 14, 2025 - Email Logo Update**
- Replaced styled text Hero Network logo in email template with actual logo image
- Copied Hero logo (lime green on black) to public/hero-logo.png
- Updated email template to use <img> tag with responsive sizing (max-width: 300px)
- Logo URL dynamically uses Replit dev domain in development, falls back to heronetwork.io in production
- Maintained black background and lime green accent bar in email header

**November 14, 2025 - Filming Tips Content Updates**
- Updated all 4 filming tips across Modern, Bold, and Classic templates
- Tip 1 (Light): Changed to "Keep light behind you when filming" without suggesting filming near windows; warns against aiming at windows
- Tip 2 (Stability): Removed vertical/horizontal orientation advice; kept slow movement guidance ("pan very slowly and smoothly")
- Tip 3 (Recording Duration): Changed from 10 seconds to 8 seconds minimum; removed "most important tip" language; added editing flexibility message; title reads "Hold Each Shot for at least 8 Seconds"
- Tip 4 (Variety): Changed from "More angles better" to "Vary height, treat phone as picture frame, everything intentional"
- Changes applied consistently across both LivePreview.tsx (on-screen preview) and PdfDocument.tsx (generated PDF)

**November 14, 2025 - Pipedrive Name Splitting**
- Enhanced Pipedrive integration to split full names into first and last name fields
- Name parsing: first word = first name, remaining words = last name (e.g., "Mary Jane Smith" → "Mary" + "Jane Smith")
- Updated createPerson() to accept firstName and lastName as separate parameters
- Modified Pipedrive API calls to send first_name and last_name fields separately
- Handles edge cases: single names (lastName becomes empty string), multi-word last names

**November 14, 2025 - Pipedrive CRM Integration**
- Integrated Pipedrive API to automatically capture leads when users download filming guides
- Created comprehensive Pipedrive utility library (app/lib/pipedrive.ts) with:
  - Organization search and creation (prevents duplicates)
  - Person creation linked to Organizations
  - Lead label management (finds or creates "Video Guide Lead" label with UUID)
  - Lead creation with proper organization and person linking
  - Note attachment for download metadata (date and logo upload status)
- Updated ConversionModal to capture and send user's name to API
- Updated /api/generate route to call Pipedrive integration after successful email delivery
- All Pipedrive operations are non-blocking - failures don't break PDF generation or email delivery
- Each lead includes: Name, Email, Organization, Download Date, Logo Uploaded status
- Leads are tagged with "Video Guide Lead" label for easy filtering in Pipedrive
- API token stored securely in Replit secrets (PIPEDRIVE_API_KEY)

**November 14, 2025 - Background Fill Fix for All Templates**
- Fixed Classic template background not extending to full preview height
- Removed `bg-white` from outer container in LivePreview.tsx to allow template backgrounds to fill completely
- Added explicit `bg-white` to Modern template's inner div to preserve white background
- All three templates (Modern, Bold, Classic) now fill entire 842px preview height without white gaps
- Each template maintains correct background color: Modern (white), Bold (custom primary color), Classic (amber #fef9f3)

**November 14, 2025 - Increased Padding on All Templates**
- Increased padding on all three templates while maintaining single-page PDF layout
- Modern: 35pt → 45pt padding (29% increase)
- Bold: 28pt → 38pt padding (36% increase)
- Classic: 35pt → 45pt padding (29% increase)
- Made minor spacing adjustments to ensure all content still fits on single A4 page
- All templates verified to have comfortable headroom: Modern (~240pt), Bold (~70pt), Classic (~100pt)

**November 14, 2025 - Single-Page PDF Optimization & Email Fixes**
- Optimized PDF layout spacing to ensure all content fits on a single A4 page (842pt height)
- Reduced padding, margins, and spacing across all three styles (Modern: ~667pt, Bold: ~825pt, Classic: ~797pt)
- Updated LivePreview component to match PDF spacing for accurate on-screen representation
- Fixed Resend email attachment format: changed from base64 string to Buffer (Resend's recommended format)
- Updated sender email from `onboarding@resend.dev` to `hello@heronetwork.io` (verified domain)
- Replaced broken Hero Network logo image with styled text logo (lime green on black) for email template
- Added error handling and logging for Resend API responses
- Modal now auto-closes 2.5 seconds after successful PDF generation

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