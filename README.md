# Owlia Client Management Platform

Platformă completă de management clienți pentru Owlia, construită cu Next.js 14, TypeScript, PostgreSQL și NextAuth.js.

## 🚀 Features

- **Autentificare securizată** - NextAuth.js cu role-based access (ADMIN/CLIENT)
- **Management clienți** - CRUD complet pentru clienți și proiecte
- **Generare contracte** - Template HTML → PDF automat cu Puppeteer
- **File management** - Upload/download securizat în Coolify volumes
- **Timeline tracking** - 12 luni milestone-uri pentru fiecare pachet
- **Notificări email** - Resend pentru notificări automate
- **Landing page** - Calculator buget și pachete editabile
- **Admin dashboard** - Module toggle, statistici, rapoarte
- **Client portal** - Acces la contracte, files, timeline

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
  /(public)/page.tsx          # Landing page
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
  /ui                         # Reusable components
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
- `Client` - Client information + relationships
- `Package` - Service packages (SMART, PREMIUM, etc.)
- `Contract` - Generated contracts with PDF
- `File` - Uploaded documents
- `Timeline` - 12-month milestones per client
- `Setting` - Module toggles & configuration
- `Notification` - In-app notifications
- `Lead` - Lead capture from landing page

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

- **Framework:** Next.js 14 (App Router + Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5
- **Email:** Resend
- **PDF:** Puppeteer
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **Deployment:** Coolify (Docker)

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

### 🚧 Phase 2: Landing Page (IN PROGRESS)
- [ ] Problem section with pain points
- [ ] Calculator buget (interactive)
- [ ] Pricing section with toggle (annual/monthly)
- [ ] FAQ accordion
- [ ] Lead capture forms + API routes
- [ ] Convert ghid HTML to Next.js page
- [ ] Download ghid tracking

### 📋 Phase 3: Admin Dashboard
- [ ] Admin layout (sidebar + header)
- [ ] Dashboard overview (stats, charts)
- [ ] Clients table with CRUD operations
- [ ] Client details page
- [ ] Add/Edit client forms
- [ ] Settings page with module toggles

### 📄 Phase 4: Contract System
- [ ] HTML contract templates
- [ ] Contract generator (Puppeteer → PDF)
- [ ] Contract preview before generation
- [ ] Save PDFs to Coolify volume
- [ ] Contract management UI in admin

### 📅 Phase 5: Timeline Management
- [ ] Timeline display component
- [ ] Milestone status tracking
- [ ] Admin timeline editor
- [ ] Client timeline view (read-only)
- [ ] Automated deadline reminders

### 📁 Phase 6: File Management
- [ ] File upload API with validation
- [ ] Secure file storage (Coolify volume)
- [ ] File listing in admin/client
- [ ] Download with signed URLs
- [ ] File type/size restrictions

### 👤 Phase 7: Client Portal
- [ ] Client dashboard layout
- [ ] Overview page (package, progress)
- [ ] Contracts page
- [ ] Files page
- [ ] Timeline visualization
- [ ] Profile settings (change password)

### 📧 Phase 8: Notifications
- [ ] Resend integration
- [ ] Email templates (HTML)
- [ ] Welcome email
- [ ] Contract generated notification
- [ ] File upload notification
- [ ] Milestone reminders
- [ ] In-app notifications

### ⚙️ Phase 9: Advanced Features
- [ ] Editable packages in admin
- [ ] Module toggles enforcement
- [ ] Lead management
- [ ] Analytics & reporting
- [ ] Export data (CSV/PDF)

### 🚀 Phase 10: Production
- [ ] Performance optimization
- [ ] Security audit
- [ ] Coolify deployment guide
- [ ] Database backups
- [ ] Monitoring setup

## 🔐 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT sessions with NextAuth.js
- Role-based access control (middleware)
- File ownership verification
- SQL injection prevention (Prisma)
- XSS protection (Next.js auto-escape)
- CSRF tokens (NextAuth)

## 📧 Support

For questions or issues, contact: admin@owlia.ro

## 📄 License

Proprietary - © 2025 OWLIA. All rights reserved.
