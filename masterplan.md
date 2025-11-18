# masterplan.md — TrainSmartCoach (Blueprint)

## 1) App overview & objectives

**TrainSmartCoach** is a web-first platform that helps football coaches plan and organize training sessions quickly and intuitively.  
Primary audience: **grassroots** and **youth academy** coaches; scalable to clubs.

**Core objectives**

- Make it effortless to **find drills** and **assemble sessions**.
- Provide a clean **club → team → coach → player** structure with sensible permissions.
- Enable **sharing as PDF** and **simple player visibility** (read-only + notifications).
- Start with **solo-coach self-service** and **manual club onboarding** for revenue.

**Why this matters**

- Coaches lack time, structure, and inspiration.
- Clubs want consistency, oversight, and branding without heavy complexity.

---

## 2) Target audience

- **Primary:** Grassroots & youth academy coaches.
- **Secondary:** Club admins who want centralized oversight and branding.
- **Later:** Senior/amateur/professional teams, performance analysts.

---

## 3) Core features & functionality (MVP → later)

**MVP**

- Drill library with **multi-category filtering** (predefined taxonomy).
- Session builder (**Option A**): title, focus/topic, notes, ordered list of drills, per-drill duration, auto total.
- Public vs. private visibility:

  - **Public drills** (visible to everyone, even logged-out).
  - **Club / Team drills** (restricted visibility; coach-created drills visible only to their team/club).

- Auth: **email + password**.
- Storage: **external object storage** for images/PDFs.
- Export/Share: **session PDF**, **drill PDF**.
- Player portal (read-only): view upcoming sessions & drills; **email notifications** on new/updated sessions.
- Roles & access control (RBAC): **Club Admin, Coach, Player, Public**.

**Phase-2+**

- Club onboarding by you (manual), with **light branding** (logo + colors).
- Club-wide structure & permissions (admins manage teams/coaches/players).
- Level-1 internal analytics (usage events for product decisions).
- Optional invite codes & email invitations for coaches/players.

**Future**

- Drill drawing **generator** (V1 via 3rd-party uploads; V2 in-app builder).
- Video analysis & presentations.
- Coach-facing & club-facing analytics dashboards.
- Mobile apps via Capacitor/wrapper.
- Payments (freemium for coaches; setup + subscription for clubs).
- AI suggestions: session templates, drill recommendations.

---

## 4) High-level technical stack recommendations

_(Conceptual, not implementation)_

- **Platform:** Web app (responsive). Later wrap with **Capacitor** for iOS/Android.
- **Front-end:** Modern component framework with strong mobile UX and offline-friendly patterns.  
  My recommendation: **React + a headless UI library** (fast dev velocity, ecosystem, component quality).
- **Back-end:** A simple REST or GraphQL API.  
  Recommendation: **REST** for MVP (faster to ship, easier docs/debugging).
- **Auth:** Email + password, secure password hashing, email verification, password reset.
- **Database:** Document or relational are both viable.

  - **Document (recommended initially):** Flexible for evolving drill/session schemas; fast iteration.
  - **Relational:** Strong constraints for multi-tenancy; great for analytics later.  
    **Best suggestion:** Start **document** for speed (e.g., Mongo-style modeling) with clear IDs and indexes; introduce a small number of relational tables later for analytics if needed.

- **Storage:** External object storage (e.g., DigitalOcean Spaces, S3, or Cloudinary for images).
- **Email/Notifications:** Transactional email provider (e.g., Postmark/SendGrid) for session notifications & invites.
- **PDF generation:** Headless browser service (e.g., Puppeteer) or a managed PDF API.
- **Analytics (internal only):** Lightweight event pipeline (server-side events + simple dashboard or exports).

**Why these choices?**  
They minimize complexity, keep costs low, and maximize speed while leaving clear paths for growth.

---

## 5) Conceptual data model (high-level)

**Identity & org**

- **User** { id, email, passwordHash, role, status, createdAt }
- **Club** { id, name, brandThemeId, createdAt }
- **Team** { id, clubId, name, ageGroup, createdAt }
- **Membership** { id, userId, clubId, teamId, roleInTeam }  
  _(supports a user in multiple teams/clubs with different roles)_

**Branding & access**

- **BrandTheme** { id, clubId, logoUrl, primaryColor, secondaryColor }
- **Invitation** { id, clubId, teamId, email, role, code, status, expiresAt }

**Content**

- **Drill** {  
  id, visibility: "public" | "club" | "team", clubId?, teamId?,  
  title, description, ageGroups[],  
  technical[], tactical[], physical[], gameSituations[],  
  minPlayers, maxPlayers, duration,  
  equipment: [{name, quantity}],  
  images: [url],  
  createdByUserId, createdAt, updatedAt  
  }
- **Session** {  
  id, clubId?, teamId?, title, focus, notes, dateTime?, totalDuration (computed),  
  drills: [ { drillId, duration, order } ],  
  createdByUserId, createdAt, updatedAt  
  }

**Comms & files**

- **Notification** { id, userId, type, payload, readAt, createdAt }
- **MediaAsset** { id, ownerScope (public/club/team), url, type (image/pdf), meta }

**Commerce (later)**

- **Subscription** { id, clubId, plan, status, seats/teams, renewsAt }
- **SetupOrder** { id, clubId, scope, price, status }

**Security & insight**

- **AuditLog** { id, actorUserId, action, targetType, targetId, metadata, createdAt }
- **AnalyticsEvent** { id, userId?, clubId?, teamId?, eventType, payload, createdAt }

---

## 6) Roles & permissions (summary)

- **Public:** read **public drills** only.
- **Player (Team member):** read **assigned team sessions**, view drills within those sessions, receive notifications.
- **Coach:** create/edit **team sessions**, create **team drills**, view **club drills** and **public drills**, share PDFs.
- **Club Admin:** manage **club, teams, coaches, players**, visibility & branding; read all within club; optionally approve content.

Visibility rules:

- **Public drills** → everyone.
- **Club drills** → club admins & coaches (and players if included in sessions).
- **Team drills** → only that team (coaches & players via sessions).
- **Coach-created drills** → default to team scope (configurable to club scope by admins).

---

## 7) UI/UX principles

**Design goals**

- **Mobile-first**; “thumb-friendly” actions; works great on the pitch.
- **Fast** filtering & drill preview.
- **Frictionless session creation** (Option A list-based flow).

**Layout concepts**

- **Left sidebar**: nav (Dashboard, Drills, Sessions, Teams, Club, Settings).
- **Top-right team selector** when user belongs to multiple teams.
- **Dashboard**: widgets/cards for “Next session”, “Recent sessions”, “Drill search”, “Season focus”.
- **Drill Library**: chips & dropdown filters (Age, Technical, Tactical, Equipment, Players, Duration). Predefined categories only.
- **Session Builder**: title, focus, notes, add drills (search + add), set per-drill duration, auto total; export to PDF.
- **Player view**: very simple list of upcoming sessions; tap to see drills & durations.
- **Branding**: light branding (logo, primary/secondary colors) per club.

**Accessibility & clarity**

- Large tap targets, readable labels, minimal jargon.
- Offline-friendly viewing for previously opened sessions (later).

---

## 8) Security considerations

- **Authentication:** email verification, secure password hashing, brute-force protection, session expiry.
- **Authorization:** strict RBAC checks on every read/write; tenant filters by **clubId/teamId**.
- **Data partitioning:** all club/team-bound records carry **clubId** (and teamId when applicable).
- **Least privilege:** players are read-only; coaches limited to their teams.
- **Audit trail:** key admin/coach actions logged.
- **PII & youth:** minimal data on players; parental consent workflow if needed; data export/delete on request; GDPR-aligned data retention.
- **File security:** time-limited signed URLs for private assets; public URLs only for public drills.

---

## 9) Scalability considerations

- **Single codebase, single database** initially; all records tagged by **clubId**.
- **Indexes** on (clubId, teamId), (visibility), and text search fields.
- **Object storage** for all media; CDN delivery for speed.
- **Stateless API** to scale horizontally later.
- **Phase to multi-tenant**: add read/write guards, then shard/split DBs by club size when needed.

---

## 10) Development phases / milestones

**Phase 0 — Foundations (1–2 sprints)**

- Taxonomy finalized (age groups, technical, tactical, etc.); predefined categories only.
- Data model & RBAC rules finalized.
- Visual design system (tokens, spacing, typography) + light brand theming.

**Phase 1 — MVP for solo coaches (2–3 sprints)**

- Auth (email + password), profile, team-less personal workspace.
- Drill Library: filters, drill details, image uploads to external storage.
- Session Builder (Option A), total time auto-calculated.
- Export **session PDF** & **drill PDF**.
- Public library (readable w/out login).

**Phase 2 — Club model (2 sprints)**

- Org entities: Club, Team, Membership, basic admin console.
- Manual club onboarding (done by you) + light branding (logo/colors).
- Coach & player invitations via email.

**Phase 3 — Player portal & notifications (1–2 sprints)**

- Player read-only view (upcoming sessions & drills in session).
- Email notifications on session added/updated.

**Phase 4 — Level-1 analytics (1 sprint)**

- Internal-only usage tracking & basic dashboard (top drills, sessions created, active users).

**Phase 5 — Monetization (2 sprints)**

- Pricing pages.
- Club setup workflow (internal).
- Subscriptions for clubs (Stripe), plan enforcement.

**Phase 6 — Drill drawing (beta)**

- V1: third-party images or uploads.
- V2: in-app drag-and-drop generator (premium).

**Phase 7 — Mobile wrappers**

- Capacitor build, app store presence (optional when adoption warrants).

**Success metrics**

- D30 coach retention, sessions/week/coach, drills added/coach, time-to-first-session, number of clubs onboarded, NPS.

---

## 11) Potential challenges & mitigations

- **Taxonomy sprawl** → **Only predefined categories**; admin-managed list; avoid user-defined tags initially.
- **Scope creep** (analytics, video, white-label) → phased roadmap; keep MVP tight.
- **Permissions complexity** → Membership table with unambiguous checks; comprehensive tests for RBAC.
- **PDF fidelity** across devices → standardize templates; server-side rendering.
- **Adoption friction** → free for solo coaches; instant value; templates.
- **Club onboarding workload** → packaged setup checklist + fixed-fee pricing.

---

## 12) Third-party integrations (suggested)

- **Email**: Postmark/SendGrid for invites & notifications.
- **Storage/CDN**: DigitalOcean Spaces or AWS S3 (+ CDN); Cloudinary if you want instant transforms.
- **PDF**: Puppeteer-based service.
- **Payments (later)**: Stripe for club subscriptions & invoices.
- **Auth email service**: same transactional provider as above.

---

## 13) Pricing model (agreed)

- **Solo Coaches:** free at launch. Later: freemium or one-time unlock for full library/premium content.
- **Clubs:** one-time **setup fee** (branding, structure, onboarding) + **monthly subscription** (scales by teams/coaches/features).

---

## 14) Future expansion possibilities

- **AI recommendations**: suggest drills based on age, focus, recent sessions.
- **Templates/periodization**: ready-made sessions & season plans per age group.
- **Advanced analytics**: load management, category balance, season coverage.
- **Video analysis**: attach clips to drills/sessions; simple telestration.
- **Community & marketplace**: curated public drills; verified creators.
- **Integrations**: calendar sync, attendance tracking, export to club systems.

---

## 15) Open questions to validate later (non-blocking)

- Do players need a calendar feed (iCal) for sessions?
- Should coaches mark sessions as “completed” and capture quick notes?
- Should admins approve “club-visible” drills before they appear club-wide?

---

## 16) What to build first (practical starting checklist)

1.  Finalize taxonomy lists (age groups, technical, tactical, equipment).
2.  Set up auth (email/password) + profile.
3.  Drill Library (filters + details + image uploads).
4.  Session Builder (Option A) + PDF export.
5.  Public library view (no login).
6.  Internal event logging for MVP analytics.

---

### That’s the plan. 🚀

I’ve kept this conceptual and implementation-agnostic while giving you clear, phased guidance and strong defaults.

---

## Feedback

What would you like to adjust or clarify?

- Any taxonomy changes (e.g., exact tactical phases, equipment list)?
- Anything you want added/removed from the MVP scope?
- Do you want the player portal in Phase 1 or Phase 3 as outlined?
