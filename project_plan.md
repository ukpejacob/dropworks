# DropWorks — Project Plan

## 1. Project Description
DropWorks is a real-time job marketplace PWA connecting workers with nearby recruiters. Workers discover and accept nearby gigs instantly; recruiters post jobs, receive bids, and hire quickly. Payments are handled via escrow. Experience inspired by Uber (real-time), Tinder (swipe decisions), and Fiverr (job marketplace).

**Target Users:** Freelance workers seeking gigs + recruiters/employers needing fast local labor.
**Core Value:** Zero-friction, real-time local job matching with secure payment.

---

## 2. Page Structure
- `/` — Worker Home Feed (map + job cards)
- `/my-jobs` — My Jobs (Active / Bids / Completed tabs)
- `/wallet` — Wallet (Balance, Transactions, Withdraw/Top-up)
- `/profile` — Profile (Avatar, Skills, Rating, Portfolio)
- `/post-job` — Recruiter: Post a Job
- `/live-bids` — Recruiter: Live Bids view
- `/recruiter-jobs` — Recruiter: Job Management
- `/jobs-in-:city` — SEO landing: Jobs in City
- `/auth` — Login / Register / Role select

---

## 3. Core Features
- [x] App shell (TopBar, BottomNav, Worker/Recruiter toggle, dark mode)
- [x] Worker Home Feed (job cards, swipe gestures, map placeholder)
- [x] My Jobs screen (tabs, job status states)
- [x] Wallet screen (balance, transactions, withdraw)
- [x] Profile screen (stats, skills, portfolio grid)
- [x] Recruiter Post Job form
- [x] Recruiter Live Bids screen
- [x] Auth flow (email/phone, Google, role select)
- [ ] Real-time integration (Supabase/Firebase)
- [ ] Push notifications (PWA Service Worker)
- [ ] Escrow payment flow (Stripe)
- [ ] SEO landing pages (/jobs-in-[city])
- [ ] KYC / verification flow

---

## 4. Data Model Design
(Supabase when connected)

### users
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| email | text | User email |
| phone | text | Phone number |
| role | enum | worker / recruiter |
| name | text | Display name |
| avatar_url | text | Avatar image |
| rating | float | Average rating |
| verified | boolean | KYC verified |

### jobs
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| recruiter_id | uuid | FK users |
| title | text | Job title |
| category | text | Job category |
| description | text | Full description |
| budget | numeric | Posted price |
| location | point | Geo coordinates |
| city | text | City name |
| expires_at | timestamp | Job expiry |
| status | enum | open/ongoing/completed |

### bids
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| job_id | uuid | FK jobs |
| worker_id | uuid | FK users |
| amount | numeric | Bid amount |
| status | enum | pending/accepted/declined |

### transactions
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK users |
| type | enum | credit/debit/escrow |
| amount | numeric | Amount |
| description | text | Label |
| created_at | timestamp | Date |

---

## 5. Backend / Third-party Integration Plan
- **Supabase**: Auth, database (jobs, bids, users, transactions), real-time subscriptions
- **Stripe**: Escrow payments, wallet top-up, payouts
- **Google Maps / Mapbox**: Job location pins, worker proximity
- **Firebase FCM / Web Push**: Push notifications

---

## 6. Development Phase Plan

### Phase 1: Core UI Shell + All Main Screens (CURRENT)
- Goal: Complete visual UI for all major screens, dark/light mode, navigation
- Deliverable: Fully working UI with mock data, swipe gestures, mode toggle

### Phase 2: Auth Flow ✅ COMPLETE
- Goal: Login/Register with email, Google, role selection
- Deliverable: Auth pages + route guards
- Done: Landing page, Login, Sign Up (role select), Worker Setup (3-step), Recruiter Setup (3-step), Forgot Password, AuthContext, route-aware layout

### Phase 2b: Recruiter Profile ✅ COMPLETE
- Goal: Full recruiter profile page with all interactive features
- Deliverable: Mode-aware profile page, recruiter-specific sections
- Done: Recruiter profile (About/Reviews/Payments tabs), Edit Recruiter Profile modal, Payment Methods manager, Leave Review for workers, Share toast, Settings list, Quick action links to Post Job / Manage Jobs / Live Bids

### Phase 3: Supabase Integration
- Goal: Real jobs data, bids, user profiles from database
- Deliverable: Live data replacing mock data

### Phase 4: Real-time + Notifications
- Goal: WebSocket job updates, push notifications
- Deliverable: Live bid feeds, job status sync

### Phase 5: Payments (Stripe Escrow)
- Goal: Fund jobs, release payments, wallet top-up
- Deliverable: Full escrow flow

### Phase 6: SEO Landing Pages
- Goal: /jobs-in-[city] pages with structured data
- Deliverable: Static SEO pages with schema markup
