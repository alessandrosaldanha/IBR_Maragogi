# IBR Maragogi - SPEC.md

## 1. Project Overview

**Project Name:** IBR Maragogi - Institutional Website  
**Type:** Single Page Application (SPA) - React  
**Core Functionality:** Institutional website for church/organization with content management and file repository system  
**Target Users:** Church members, visitors, general public seeking information about the institution

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Main Layout:**
- Fixed sidebar navigation (desktop) → Drawer/Hamburger (mobile)
- Main content area with max-width of 1400px
- Responsive breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

**Page Sections:**
- Header with mobile menu toggle (mobile only)
- Sidebar navigation (desktop) / Drawer (mobile)
- Main content area
- Footer with institutional info

### 2.2 Visual Design

**Color Palette:**
```
--color-primary: #FFD700       /* Yellow - accent/highlight */
--color-primary-light: #FFE44D /* Lighter yellow for hover */
--color-primary-dark: #E6C200 /* Darker yellow for active */
--color-dark: #1A1A1A         /* Black - primary text */
--color-dark-medium: #333333  /* Medium black for secondary text */
--color-light: #FFFFFF        /* White - background */
--color-light-gray: #F8F8F8   /* Light gray for sections */
--color-border: #E5E5E5       /* Border color */
--color-text-secondary: #666666 /* Secondary text */
--color-success: #22C55E      /* Success green */
--color-error: #EF4444       /* Error red */
--color-warning: #F59E0B      /* Warning orange */
```

**Typography:**
- Primary Font: "Playfair Display" (headings) - elegant, institutional
- Secondary Font: "Source Sans 3" (body) - clean, readable
- Font sizes:
  - h1: 48px / 3rem
  - h2: 36px / 2.25rem
  - h3: 24px / 1.5rem
  - h4: 20px / 1.25rem
  - body: 16px / 1rem
  - small: 14px / 0.875rem

**Spacing System:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

**Visual Effects:**
- Box shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- Border radius: 8px (cards), 4px (buttons), 12px (modals)
- Transitions: 0.2s ease for hover states, 0.3s ease for page transitions

### 2.3 Components

**Sidebar Navigation:**
- Fixed left sidebar (280px width on desktop)
- Logo at top
- Navigation items with icons
- Active state: Yellow highlight with left border
- Hover state: Light gray background
- Mobile: Slide-in drawer from left with overlay

**Buttons:**
- Primary: Yellow background, black text
- Secondary: White background, black border, black text
- Ghost: Transparent, black text
- States: Default, Hover, Active, Disabled

**Cards:**
- White background
- Subtle shadow
- 8px border radius
- Yellow accent on hover or active

**Form Elements:**
- Input fields with 1px border
- Focus state: Yellow border
- Labels above inputs
- Error states with red border and message

**Accordion (FAQ):**
- Click to expand/collapse
- Yellow indicator for open state
- Smooth transition animation

**File Cards:**
- Thumbnail/icon on left
- File info in center
- Action buttons on right
- Color-coded by file type

---

## 3. Functionality Specification

### 3.1 Navigation

**Menu Items:**
1. Início (Home)
2. Sobre Nós (About)
3. Projetos (Projects)
4. Mensagens e Materiais (Messages & Materials)
5. FAQ

**Behavior:**
- Active item highlighted in sidebar
- Mobile menu closes on navigation
- Smooth page transitions

### 3.2 Pages

#### 3.2.1 Início (Home)

**Hero Section:**
- Full-width banner area with background gradient/image
- Welcome title: "Bem-vindo à IBR Maragogi"
- Subtitle with institutional message
- CTA button: "Saiba Mais"

**Quick Access Cards:**
- 4 cards in grid (2x2 on tablet, 1 column mobile)
- Cards for: Sobre Nós, Projetos, Mensagens e Materiais, FAQ
- Each card: icon, title, brief description, link

**Recent Highlights:**
- Section showing latest 3-4 items
- Could be recent sermons, projects, or materials
- "Ver todos" link

**Footer:**
- Institution name
- Address/contact info
- Quick links

#### 3.2.2 Sobre Nós (About)

**Content:**
- Hero/banner image area
- History section with text
- Mission, Vision, Values section (3-column grid)
- Team/leadership section (optional, placeholder)
- Editable text areas prepared for API

#### 3.2.3 Projetos (Projects)

**Features:**
- Grid of project cards
- Each card: image, title, description, "Ver mais" button
- Pagination or load more button
- Ready for API integration

**Project Card:**
- Thumbnail image
- Title
- Short description (max 150 chars)
- "Ver Detalhes" button

#### 3.2.4 Mensagens e Materiais (Messages & Materials)

**This is the critical section.**

**Features:**
- Search bar
- Category filter dropdown
- File type filter dropdown
- Sort options (date, title)
- Grid/List view toggle

**Material Item:**
- Title (editable)
- Category label
- Date
- File type badge
- Preview:
  - PDF: Embedded preview or thumbnail
  - Images: Thumbnail preview
  - Documents: Icon with file info
- "Visualizar" button
- "Baixar" button

**Supported File Types:**
- PDF
- DOC, DOCX
- TXT
- PPT, PPTX
- XLS, XLSX
- Images (JPG, PNG, GIF, SVG)
- Other generic files

**Preview Behavior:**
- PDF: iframe/embed preview or thumbnail
- Images: Mini thumbnail
- Other: Icon card with file info

**Categories:**
- Pregações (Sermons)
- EBD - Escola Bíblica Dominical (Sunday School)
- Materiais Complementares (Supplementary Materials)
- Documentos (Documents)

#### 3.2.5 FAQ (Frequently Asked Questions)

**Features:**
- Search/filter questions
- Accordion-style Q&A
- Expand/collapse animations
- Categories if applicable
- Ready for API data

---

## 4. Technical Architecture

### 4.1 Project Structure

```
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Modal/
│   │   └── Loader/
│   ├── layout/
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Layout/
│   └── sections/
│       ├── Hero/
│       ├── QuickAccess/
│       └── Highlights/
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   ├── Materials/
│   └── FAQ/
├── services/
│   ├── api.js           # Base API config
│   ├── xano.js          # Xano-specific service
│   └── mockData.js     # Mock data for demo
├── hooks/
│   ├── useApi.js
│   └── useLocalStorage.js
├── utils/
│   ├── formatDate.js
│   ├── fileUtils.js
│   └── helpers.js
├── types/
│   └── index.js         # TypeScript interfaces
├── styles/
│   ├── variables.css
│   └── global.css
├── App.jsx
└── main.jsx
```

### 4.2 API Service Layer

**Xano Integration Ready:**
- Base URL configurable via environment
- Service methods for:
  - GET /resources (list)
  - GET /resources/:id (detail)
  - POST /resources (create)
  - PUT /resources/:id (update)
  - DELETE /resources/:id (delete)
  - File upload endpoints
- Error handling
- Loading states
- Mock fallback

### 4.3 State Management

- React Context for global state (current page, theme)
- Local state for component-specific data
- Custom hooks for data fetching

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Sidebar navigation works on desktop (fixed, 280px width)
- [ ] Mobile menu works as hamburger/drawer
- [ ] Active menu item is highlighted in yellow
- [ ] Color scheme matches: yellow (#FFD700), black (#1A1A1A), white
- [ ] Typography uses Playfair Display + Source Sans 3
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Cards have proper shadows and border radius

### Functional Checkpoints
- [ ] All navigation links work
- [ ] Search functionality works on Materials page
- [ ] Filters work on Materials page
- [ ] File preview displays correctly for supported types
- [ ] FAQ accordion expands/collapses
- [ ] Loading states are shown during data fetch
- [ ] Error states are handled gracefully
- [ ] Empty states are displayed when no data

### Technical Checkpoints
- [ ] Project builds without errors
- [ ] No console errors on page load
- [ ] Components are properly separated
- [ ] Services are ready for Xano integration
- [ ] Mock data is available for demonstration

---

## 6. Mock Data Requirements

**Projects (3-4 items):**
- Title, description, image, date

**Materials (8-10 items):**
- Title, category, type, date, fileUrl, thumbnailUrl
- Mix of PDF, DOCX, Images

**FAQ (5-8 items):**
- Question, answer, category

**About Content:**
- History text
- Mission, Vision, Values statements

---

*This specification serves as the source of truth for implementation.*