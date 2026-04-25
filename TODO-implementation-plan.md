# Culbridge Frontend Implementation Plan

## Phase 1: Landing Page Complete Redesign
- [ ] Rewrite `app/page.tsx` with full brand content
  - Hero section with CTA
  - Supported Commodities table
  - Four-Step Validation pipeline
  - Regulatory Coverage
  - Risk Assessment & Financial Impact
  - Technical API Endpoints
  - Core System Guarantees
  - Performance Metrics & Sample Report
  - "The Problem" section
  - Professional footer

## Phase 2: Auth System Fixes
- [ ] Fix login cookie persistence in `app/(auth)/login/page.tsx`
- [ ] Add required fields (contactName, phone) to `app/(auth)/signup/page.tsx`
- [ ] Create `app/api/auth/logout/route.ts`

## Phase 3: Navigation, User State & Logout
- [ ] Redesign `components/layout/Sidebar.tsx` with user profile, active states, logout
- [ ] Add user data fetching in `app/dashboard/layout.tsx`
- [ ] Enhance `middleware.ts` for proper auth verification

## Phase 4: API Connectivity
- [ ] Add `logout()` and `getCurrentUser()` to `src/lib/api.ts`
- [ ] Polish `app/dashboard/page.tsx` with user welcome

## Phase 5: Build Verification
- [ ] Ensure all imports resolve
- [ ] Fix any TypeScript/ESLint blocking errors
- [ ] Test full user journey

