# CULBRIDGE AUTH + RBAC — FINAL ARCHITECTURE

## Core Principle

> Public routes create identity. Protected routes use identity.

If you mix this, the system collapses.

---

## 1. ROUTE CLASSIFICATION (LOCKED)

### PUBLIC ROUTES (NO AUTH — EVER)
- `/api/auth/signup` — creates user, returns JWT + cookie
- `/api/auth/login` — validates credentials, returns JWT + cookie

Rules:
- No JWT required
- No session required
- No middleware
- Accept raw POST

### PROTECTED ROUTES (AUTH REQUIRED)
- `/api/shipments` — requires JWT, enforces role + user_id scoping
- `/api/shipments/:id` — requires JWT, enforces ownership
- `/api/farm-plots` — requires JWT, scopes by exporter_id
- `/api/admin/*` — requires JWT + ADMIN role
- `/api/auth/me` — requires JWT, returns current user

Rules:
- Must use `requireAuth(req)`
- Must validate role with `requireRole()` where needed
- Must reject unauthorized (401) and forbidden (403)

---

## 2. AUTH MIDDLEWARE — SINGLE SOURCE OF TRUTH

File: `lib/auth.ts`

### `requireAuth(req: NextRequest): AuthUser`
- Extracts token from `Authorization: Bearer <token>` header OR `auth-token` cookie
- Verifies JWT signature against `JWT_SECRET`
- Validates `userId` and `role` exist in payload
- Validates role is in allowed set: `ADMIN`, `EXPORTER`, `COMPLIANCE_OFFICER`
- Returns `{ userId, email, role }`
- Throws `AuthError(401)` on any failure

### `requireRole(user: AuthUser, allowedRoles: string[]): void`
- Authorization layer — call AFTER `requireAuth`
- Throws `AuthError(403)` if user's role not in allowed list

### `handleAuthError(error: unknown): NextResponse`
- Converts `AuthError` to proper JSON response with correct status code
- Logs unexpected errors
- Returns 500 for unknown errors

---

## 3. APPLY AUTH ONLY WHERE NEEDED

### ✅ CORRECT — Protected Route
```ts
import { requireAuth, requireRole, handleAuthError } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);
    // proceed with logic
  } catch (error) {
    return handleAuthError(error);
  }
}
```

### ❌ WRONG — Never do this
```ts
export async function POST(req: NextRequest) {
  const user = requireAuth(req); // ❌ breaks signup/login
}
```

---

## 4. ROLE-BASED ACCESS CONTROL (RBAC)

### Roles
| Role | Description |
|------|-------------|
| `EXPORTER` | External user — creates shipments, views own data |
| `ADMIN` | Internal operator — views all data, admin tools |
| `COMPLIANCE_OFFICER` | Future role for compliance-specific access |

### Route Permission Matrix

| Route | EXPORTER | ADMIN |
|-------|----------|-------|
| `/api/auth/signup` | ✅ | ✅ |
| `/api/auth/login` | ✅ | ✅ |
| `/api/auth/me` | ✅ | ✅ |
| `/api/shipments` (GET own) | ✅ | ✅ (all) |
| `/api/shipments` (POST) | ✅ | ❌ |
| `/api/shipments/:id` | ✅ (own) | ✅ (any) |
| `/api/farm-plots` | ✅ (own) | ❌ |
| `/api/admin/shipments` | ❌ | ✅ |

### Data Access Control

**❌ WRONG — Global access**
```sql
SELECT * FROM shipments;
```

**✅ CORRECT — Scoped access**
```sql
-- EXPORTER sees only own
SELECT * FROM shipments WHERE user_id = $1;

-- ADMIN sees all (explicit exception)
SELECT * FROM shipments;
```

---

## 5. FRONTEND MIDDLEWARE

File: `middleware.ts`

- `/dashboard/*` — any authenticated user
- `/shipments/*` — any authenticated user
- `/admin/*` — ADMIN role required (redirects to `/dashboard` if not admin)

Token verification happens server-side in middleware using `JWT_SECRET`.

---

## 6. ADMIN BOOTSTRAP

Admin user is seeded in `db/auth-pg-schema.sql`:
```sql
INSERT INTO users (email, password_hash, role, is_verified)
VALUES (
  'culbridge01@gmail.com',
  '$2b$12$...',
  'ADMIN',
  TRUE
);
```

No special login logic. Admin logs in via same `/api/auth/login` endpoint.

---

## 7. SYSTEM INTEGRITY RULES

### ❌ Forbidden
- Auth middleware on `/auth/*`
- Fake success responses
- Skipping DB writes
- Accepting empty tokens
- Silent failures
- Hardcoded admin passwords
- Frontend-only security checks

### ✅ Required
- All auth logic centralized in `lib/auth.ts`
- JWT validated on protected routes only
- DB is source of truth
- Every signup → DB write
- Every login → DB read + token
- Role enforced in backend routes AND database queries

---

## 8. FINAL VALIDATION CHECKLIST

Run this after deployment:

1. **Signup** → returns success, DB row created with `role='EXPORTER'`
2. **Login** → returns token with `{ userId, email, role }`
3. **Protected route without token** → 401 Unauthorized
4. **Protected route with invalid token** → 401 Invalid token
5. **Exporter accessing admin route** → 403 Forbidden
6. **Exporter accessing another exporter's shipment** → 404 Not Found (or 403)
7. **Admin accessing any shipment** → 200 Success

---

## 9. FILES CHANGED

| File | Change |
|------|--------|
| `lib/auth.ts` | Added `requireAuth`, `requireRole`, `AuthError`, `handleAuthError` |
| `middleware.ts` | Added JWT verification, admin route protection |
| `app/api/auth/me/route.ts` | Uses `requireAuth` |
| `app/api/shipments/route.ts` | Uses `requireAuth` + role checks + user_id scoping |
| `app/api/shipments/[id]/route.ts` | Uses `requireAuth` + ownership check |
| `app/api/farm-plots/route.ts` | Uses `requireAuth` + exporter_id scoping |
| `app/api/admin/shipments/route.ts` | NEW — ADMIN-only, returns all shipments |
| `app/(app)/admin/page.tsx` | Server-side admin role check + redirect |

---

## 10. FINAL RULE

> If role is not enforced in backend routes AND database queries, RBAC does not exist.
