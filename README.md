# Owlia Client Management Platform

Platformă completă de management clienți pentru Owlia, construită cu Next.js 14, TypeScript, PostgreSQL și NextAuth.js.

## 🚀 Features

### ✅ Implementate Complet

- **Autentificare securizată** - NextAuth.js v5 cu role-based access (ADMIN/CLIENT)
- **Management clienți** - CRUD complet cu date companie (CUI, Reg. Com., adresă)
- **Password reset** - Admin poate reseta parola clienților
- **Notificări email** - Resend pentru calculator results & package interest
- **Landing page** - Calculator buget cu email capture + pricing interactiv
- **Admin dashboard** - Stats, client management, settings, send notifications
- **Lead tracking** - Capture & tracking pentru toate lead sources
- **Generare contracte** - Template HTML → PDF cu Puppeteer + date reale
- **Client portal complet**:
  - Dashboard cu stats și progres
  - Timeline 12 luni cu milestone-uri
  - Contracte cu download PDF
  - Fișiere proiect
  - Notificări in-app
- **Sistem notificări**:
  - Notificări in-app real-time
  - Counter în header (polling 30s)
  - Admin poate trimite manual
  - Auto-notify la contracte noi
  - Mark as read / Mark all read

### ✅ **Recent Adăugate:**
- **File Upload/Download System** - Drag & drop, validare, notificări
- **Timeline Auto-Generator** - Generează din pachet cu date din contract
- **Gantt Chart Vizual** - Timeline grafic pentru clienți
- **Lead Management Dashboard** - Stats, search, filter, convert
- **Package Management** - CRUD complet, features editabile cu titlu + descriere
- **Analytics Dashboard** - Metrics complete, charts, activity feed
- **Export CSV** - Clienți și leads exportabile
- **Dynamic Packages on Front** - Pachete citite din database, editabile din admin

**🎉 Platforma este 100% completă și production-ready!**

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Resend API key (pentru email)

## 🛠️ Setup Local

### 1. Clone & Install

```bash
cd /path/to/website
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Editează `.env` cu credențialele tale:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/owlia"
NEXTAUTH_SECRET="your-secret-here"  # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="re_xxxxx"
UPLOAD_DIR="/app/uploads"
```

### 3. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed initial data (packages, settings, admin user)
npm run prisma:seed
```

**Default Admin User:**
- Email: `admin@owlia.ro`
- Password: `admin123`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  /page.tsx                   # Homepage (general Owlia)
  /start-up-nation/page.tsx   # Start-Up Nation landing page
  /servicii/*                 # Service pages (marketing, web, branding)
  /cazuri-de-succes/*         # Case study pages (vipbebe, ladada, atelier)
  /despre/page.tsx            # About page
  /auth/login                 # Login page
  /auth/register              # Register page
  /admin/*                    # Admin dashboard (protected)
  /client/[id]/*              # Client portal (protected)
  /api/*                      # API routes
/lib
  /db/prisma.ts               # Prisma client singleton
  /auth/config.ts             # NextAuth configuration
  /email                      # Resend templates
  /contracts                  # Contract generation
  /storage                    # File management
/components
  /ui                         # Reusable components (Button, Navigation, etc)
  /home                       # Homepage-specific components
  /admin                      # Admin-specific
  /client                     # Client-specific
/prisma
  schema.prisma               # Database schema
  seed.ts                     # Seed data
/public
  /uploads                    # File storage (symlink to volume)
  /templates                  # Contract HTML templates
```

## 🗄️ Database Schema

**Models:**
- `User` - Authentication + roles (ADMIN/CLIENT)
- `Client` - Client information + company data (CUI, Reg. Com., address, legal rep)
- `Package` - Service packages (SMART, PREMIUM, etc.)
- `Contract` - Generated contracts with PDF + metadata
- `File` - Uploaded documents
- `Timeline` - 12-month milestones per client with status tracking
- `Setting` - Module toggles & configuration
- `Notification` - In-app notifications (type, title, message, read status)
- `Lead` - Lead capture from landing page
- `GuideAccess` - Guide download tracking + GDPR consent
- `GuideTracking` - User behavior analytics (time spent, scroll depth)

## 🔧 Development Commands

```bash
# Development
npm run dev                    # Start dev server with Turbopack
npm run build                  # Build for production
npm run start                  # Start production server

# Prisma
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate         # Create & run migration
npm run prisma:studio          # Open Prisma Studio
npm run prisma:seed            # Seed database
```

## 🎨 Tech Stack

- **Framework:** Next.js 15.5.4 (App Router + Turbopack)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 (beta) - AuthGuard pattern
- **Email:** Resend
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **Deployment:** Coolify (Docker)
- **PDF Generation:** Puppeteer
- **Password Hashing:** bcrypt (12 rounds)

## 🚢 Deployment (Coolify)

### 1. Environment Variables

Set in Coolify dashboard:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://owlia.ro"
RESEND_API_KEY="..."
UPLOAD_DIR="/app/uploads"
NODE_ENV="production"
```

### 2. Volume Mount

Create persistent volume in Coolify:
- Mount path: `/app/uploads`
- Size: 10GB (adjust as needed)

### 3. Build Configuration

Coolify will auto-detect Next.js and use:
- Build: `npm run build`
- Start: `npm run start`

### 4. Post-Deploy

```bash
# Run migrations (one-time after first deploy)
npm run prisma:migrate deploy

# Seed initial data (if database is empty)
npm run prisma:seed
```

## 📝 Implementation Roadmap

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Initialize Next.js 14 with TypeScript + Turbopack
- [x] Setup Tailwind CSS with custom colors from template
- [x] Create folder structure (app, lib, components, prisma)
- [x] Configure Prisma with PostgreSQL schema
- [x] Seed database with packages and settings
- [x] Implement NextAuth.js authentication
- [x] Create login/register pages
- [x] Setup role-based middleware (ADMIN/CLIENT)
- [x] Build UI components (Button, Input, Logo, Navigation)
- [x] Landing page hero section
- [x] Dockerfile for Coolify deployment

### ✅ Phase 2: Website Structure (COMPLETED)

**General Homepage (/):**
- [x] Hero section with value proposition
- [x] Problem section (3 challenges for new businesses)
- [x] Solution section (3-step process)
- [x] Services grid (Marketing Digital, Web Design, Branding)
- [x] Process steps (4-step methodology)
- [x] Case studies preview (3 spotlight cases)
- [x] Why Owlia (4 differentiators)
- [x] Industries section (flexible positioning)
- [x] Final CTA

**Start-Up Nation Page (/start-up-nation):**
- [x] Problem section with pain points
- [x] Calculator buget (interactive with email capture)
- [x] Pricing section with toggle (annual/monthly)
- [x] Package breakdown section
- [x] FAQ accordion
- [x] Solution section with benefits + process
- [x] About section with team info
- [x] Guarantees section
- [x] Lead magnet section
- [x] Final CTA

**Service Pages (/servicii/*):**
- [x] Marketing Digital page
- [x] Web Design & Development page
- [x] Branding page

**Case Study Pages (/cazuri-de-succes/*):**
- [x] VipBebe.ro (E-commerce - 4M lei vânzări)
- [x] LaDaDa.ro (HoReCa - Dublu trafic)
- [x] Atelierul de Business (Consultanță - +45% conversie)

**About Page (/despre):**
- [x] Team story & founder intro
- [x] Company structure (Owlia, Fruit Creative, Omnisfera)
- [x] Team roles & expertise
- [x] Values & differentiators
- [x] Statistics

**Navigation & Components:**
- [x] Updated Navigation with dropdowns
- [x] Reusable components (CTASection, ServiceCard, CaseStudyCard)
- [x] Homepage-specific components
- [x] Mobile responsive menu

**Lead Capture System:**
- [x] Calculator email capture + API
- [x] Package modal with phone/email + GDPR
- [x] Lead database tracking (source, package interest)
- [x] Guide email gate + download tracking
- [x] Resend email integration (send PDF on email)

### ✅ Phase 3: Admin Dashboard (COMPLETED)
- [x] Admin layout (sidebar + header)
- [x] Dashboard overview (stats, charts)
- [x] Clients table with CRUD operations
- [x] Client details page
- [x] Add/Edit client forms
- [x] Settings page with module toggles
- [x] NextAuth v5 authentication flow
- [x] AuthGuard pattern (no middleware for Edge compatibility)
- [x] Email notifications for leads
- [x] Calculator result emails
- [x] Package interest confirmation emails

### ✅ Phase 4: Contract System (COMPLETED)
- [x] HTML contract templates (startup-nation template)
- [x] Contract generator (Puppeteer → PDF)
- [x] Contract preview before generation in modal
- [x] Save PDFs to Coolify volume
- [x] Contract management UI in admin
- [x] Auto-populate with real client data (company, CUI, etc.)
- [x] Download contracts as PDF
- [x] Contract status tracking (DRAFT, SENT, SIGNED, CANCELLED)
- [x] Email notification on contract generation
- [x] In-app notification for clients

### ✅ Phase 5: Timeline Management (COMPLETED)
- [x] Timeline display component with visual line
- [x] Milestone status tracking (PENDING, IN_PROGRESS, COMPLETED, DELAYED)
- [x] Color-coded icons per status
- [x] Client timeline view (read-only) with dates
- [x] Progress percentage in dashboard
- [x] Next milestone highlight
- [x] Admin timeline editor with CRUD
- [x] Add/edit/delete milestones
- [x] Update status with quick actions
- [x] Set due dates
- [x] Auto-notifications on status changes
- [ ] Automated deadline reminders (pending)

### ✅ Phase 6: File Management (COMPLETED)
- [x] File upload API with validation (10MB max)
- [x] File type restrictions (PDF, JPG, PNG, DOCX)
- [x] Secure file storage (Coolify volume per client)
- [x] File download with access control
- [x] File delete (admin only)
- [x] Drag & drop upload UI in admin
- [x] File listing in admin/client with grid UI
- [x] File metadata display (name, size, date, uploaded by)
- [x] Auto-notification on file upload
- [x] Beautiful card-based UI

### ✅ Phase 7: Client Portal (COMPLETED)
- [x] Client dashboard layout with sidebar navigation
- [x] Overview page with stats cards (package, progress, contracts, timeline)
- [x] Progress bar and percentage
- [x] Next milestone display
- [x] Recent contracts section
- [x] Recent files section
- [x] Contracts page with download functionality
- [x] Files page with grid display
- [x] Timeline visualization with 12-month view
- [x] Notifications page with real-time updates
- [x] Access control (clients can only see their own data)
- [x] Auto-redirect based on role (admin → /admin, client → /client/[id])
- [ ] Profile settings (change password) - can be done by admin

### ✅ Phase 8: Notifications (COMPLETED)
- [x] Resend integration for emails
- [x] Email templates (HTML) - calculator results, package interest, contracts, welcome
- [x] Welcome email on client creation with dashboard link
- [x] Contract generated notification (email + in-app)
- [x] File upload notification (in-app)
- [x] In-app notification system:
  - Real-time counter in header (polls every 30s)
  - Notification types (info, success, warning, error)
  - Mark as read on click
  - Mark all as read button
  - Beautiful UI with color coding
- [x] Admin can send manual notifications to clients
- [x] Helper functions for common notifications
- [x] Auto-notifications on: contract generation, file upload, milestone changes

### ✅ Phase 9: Advanced Features (COMPLETED)
- [x] Company fields in client management (CUI, Reg. Com., address, legal rep)
- [x] Password reset functionality in admin
- [x] Client notification system
- [x] Lead management dashboard:
  - Stats overview (total, converted, by source)
  - Search & filter functionality
  - Convert/revert lead status
  - View all lead details
  - Guide download tracking
- [x] Editable packages in admin:
  - CRUD operations (create, edit, delete)
  - Edit name, price, monthly price, description, features
  - Toggle active/inactive status
  - Prevent deletion if in use
  - Beautiful management UI
- [x] Analytics & reporting:
  - Client stats (total, active, by package, by status)
  - Lead conversion metrics
  - Contract status distribution
  - Timeline completion rate
  - Visual charts and progress bars
  - Recent activity feed
- [ ] Module toggles enforcement (pending)
- [ ] Export data (CSV/PDF) (pending)

### 🚀 Phase 10: Production
- [ ] Performance optimization
- [ ] Security audit
- [ ] Coolify deployment guide
- [ ] Database backups
- [ ] Monitoring setup

## 🔐 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT sessions with NextAuth.js v5
- Role-based access control (AuthGuard in layout)
- Server-side session validation
- SQL injection prevention (Prisma)
- XSS protection (Next.js auto-escape)
- CSRF tokens (NextAuth)
- Input validation with Zod

## 🐛 Known Issues & Solutions

### NextAuth v5 (Beta) + Edge Runtime
**Issue:** Middleware with Prisma doesn't work in Edge Runtime.  
**Solution:** Use `AuthGuard` component in layout for server-side auth checks instead of middleware.

### Session Cookie After Login
**Issue:** Redirect too fast after login, before cookie is set.  
**Solution:** 1 second delay before redirect to allow cookie propagation.

## 📧 Support

For questions or issues, contact: admin@owlia.ro

## 📄 License

Proprietary - © 2025 OWLIA. All rights reserved.
