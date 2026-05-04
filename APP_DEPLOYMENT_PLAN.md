# App Store & Play Store Deployment Plan

A concrete, codebase-specific plan to ship E-Code Halal Check to the Apple App Store and Google Play Store, starting from the existing PWA.

---

## Phase 1 — App-context detection layer (foundation) ✅

Everything else depends on this. Goal: at runtime, know whether we're in `browser`, `pwa`, `twa` (Play Store wrapper), or `native` (Capacitor / App Store), and gate UI accordingly.

### 1.1 Create `src/hooks/use-app-context.tsx` ✅

✅ **Done.** Created `src/hooks/use-app-context.tsx` exporting `AppContextProvider` + `useAppContext()`. Detection runs once at mount via lazy `useState` initializer:

- `(window as any).Capacitor?.isNativePlatform?.()` → `native`
- `?source=twa` query param OR `document.referrer.startsWith('android-app://')` → `twa`
- `window.matchMedia('(display-mode: standalone)').matches` OR iOS `navigator.standalone` → `pwa`
- otherwise → `browser`

Hook exposes `{ mode, isInApp, isWeb }`. Also sets `data-app-mode="..."` on `<html>` so CSS in Phase 2.4 can gate via `[data-app-mode="native"] body { ... }` etc. Wired into `src/App.tsx` between `HelmetProvider` and `Router`.

### 1.2 Update `public/manifest.json` ✅

✅ **Done.** Changed `start_url` from `"/"` → `"/?source=pwa"` so PWA installs are attributable in GA4 (TWA wrapper will override with `?source=twa`).

### 1.3 Drop web-only scripts when in-app ✅

✅ **Done.** Removed the Lovable `gptengineer.js` script tag from `index.html` and dropped `https://cdn.gpteng.co` from the CSP `script-src`.

Optional follow-up: remove `lovable-tagger` from `vite.config.ts` and `package.json` (dev-mode only, no runtime impact) and clean up the Lovable boilerplate in `README.md`.

---

## Phase 2 — Two-layout architecture (web + native)

This phase is the bulk of the codebase work. Goal: when `isInApp === true`, the UI must look and feel like a native app, not a website in a frame.

### Architectural decision: two layouts, ~30% shared primitives

Web and app serve different jobs:

| | Web | App |
|---|---|---|
| Primary traffic | Google ("is E120 halal?") + social | Returning installed users |
| First-time vs return | ~80% first-time | ~100% return |
| Needs SEO | Critical (drives MAU) | Zero |
| Needs trust signals (Hero, InfoSection, attribution) | Yes | No |
| Right list density | Multi-column cards on desktop, hover affordances | Single-column dense rows |

**Conclusion:** keep two distinct visual languages. Don't try to unify the SearchBar, list tiles, headers, or nav — they're divergent for good reasons. Share only what's content-level (status badges, detail-section cards, the ECode hero card on detail pages).

### Component organization

```
src/components/
  shared/                ← imported by both layouts
    StatusBadge.tsx      (extract from inline pills)
    DetailSection.tsx    (extract from ECodePage's About/Foods/Source/Alts cards)
    ECode.tsx            (existing — already shared)
    ECodeSkeleton.tsx    (existing — already shared)
    StatusDistribution.tsx
  web/
    Header.tsx           (current)
    Footer.tsx           (current)
    Hero.tsx             (current)
    InfoSection.tsx      (current)
    PWAInstallPrompt.tsx (current)
    ECodeListTile.tsx    (current — 3-col grid card)
    CardGrid.tsx         (current)
    BrowseByCategory.tsx (current — 3-col grid)
    MostSearchedECodes.tsx (current)
    KorbanBanner.tsx     (current)
    SearchBar.tsx        (current — full web variant)
    WebLayout.tsx        (new — composes Header + children + Footer)
  app/
    AppHeader.tsx        (new — title + optional back chevron + optional right action)
    BottomTabBar.tsx     (new — 4 tabs: Search/Browse/Categories/About)
    AppSearchBar.tsx     (new — iOS-style, no submit button, enterKeyHint="search")
    ECodeListRow.tsx     (new — single-column dense row)
    AppCategoryCard.tsx  (new — full-width row variant)
    AppLayout.tsx        (new — composes AppHeader + children + BottomTabBar)
src/pages/
  AboutScreen.tsx        (new — native About screen at /about)
```

**Note on file moves:** to minimize churn, existing components stay where they are for v1. The `web/` and `app/` folders are about *new* code organization. We can move existing files into `web/` later as a separate cleanup.

### Page composition pattern

Every page becomes:

```tsx
const Layout = isInApp ? AppLayout : WebLayout;
return (
  <Layout title="Search">
    {isWeb && <Hero />}              {/* web-only marketing slabs */}
    <SharedSearchInput />            {/* OR pick AppSearchBar vs SearchBar */}
    <StatusDistribution ... />       {/* shared */}
    {isInApp ? <AppList /> : <CardGrid />}  {/* density swap */}
    {isWeb && <InfoSection />}
  </Layout>
);
```

Two `isWeb` checks per page (for the optional marketing slabs), one layout swap, one list-component swap. Everything else is shared content.

### What goes where

**Shared primitives (extract once, used in both):**

| Component | Source | Why share |
|---|---|---|
| `ECode` (hero status card) | already at `src/components/ECode.tsx` | Same intent in both contexts |
| `ECodeSkeleton` | already exists | Loading state is universal |
| `StatusBadge` | extract from inline spans | Halal/doubtful pill — same pattern |
| `DetailSection` | extract from `ECodePage.tsx:289-391` (currently 5× inline cards) | Same content cards on detail page |
| `StatusDistribution` | already exists | Filter chips work for both |

**Web-only chrome:**

| Component | Why web-only |
|---|---|
| `Header` (logo + wordmark + theme toggle) | Web brand bar pattern |
| `Footer` | Web nav pattern |
| `Hero` | Marketing — drives SEO + first-time trust |
| `InfoSection` | Educational marketing for first-timers |
| `PWAInstallPrompt` | Pointless when already installed |
| `KorbanBanner` | App Store 3.1.1 risk; keep on web |
| `ECodeListTile` + `CardGrid` | Multi-column grid right for desktop |
| `BrowseByCategory` | 3-col grid with hover |
| `SearchBar` | Border-2 + prominent submit button — desktop pattern |

**Native-only chrome:**

| Component | Why native-only |
|---|---|
| `AppHeader` | iOS HIG nav bar — title + back chevron + right action |
| `BottomTabBar` | iOS Tab Bar — primary navigation paradigm |
| `AppSearchBar` | iOS-style gray rounded bg, keyboard-driven submit |
| `ECodeListRow` | Single-column dense row — phone-screen optimal |
| `AppCategoryCard` | Full-width row variant |
| `AboutScreen` | Houses settings + privacy + attribution |

### Implementation order

1. Build shells: `AppHeader`, `BottomTabBar`, `AppLayout`, `WebLayout`
2. Add `AboutScreen` page + `/about` route
3. Refactor `Index.tsx` to use layout pattern (proves the model)
4. Refactor remaining pages: `ECodePage`, `AllEcodes`, `CategoryPage`
5. Extract shared primitives as we touch them: `StatusBadge`, `DetailSection`
6. Build native list/search components: `AppSearchBar`, `ECodeListRow`, `AppCategoryCard`
7. Safe-area CSS via `data-app-mode` attribute (already wired by `useAppContext`)

### Safe-area insets and viewport

Add to `src/App.css`:

```css
[data-app-mode="native"] body,
[data-app-mode="pwa"] body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

In `index.html`, change viewport to `viewport-fit=cover`.

### Native-only enhancements (Phase 3.2 alongside Capacitor)

| Enhancement | Plugin |
|---|---|
| Pull-to-refresh on list views | custom |
| Haptic feedback on search/filter/share | `@capacitor/haptics` |
| Native camera picker (replace `<input type="file">`) | `@capacitor/camera` |
| Offline indicator banner | `@capacitor/network` |
| Android hardware back button | `@capacitor/app` |
| Native splash screen | `@capacitor/splash-screen` |
| Status bar styling synced to theme | `@capacitor/status-bar` |
| Native share sheet (replace `navigator.share` fallback) | `@capacitor/share` |
| First-launch onboarding (3 cards) | new `Onboarding.tsx` |

### Reference design

See the Pencil canvas (`design/native-app-layout.pen` once saved) for the visual reference of all 5 native screens (Search, E-Code Detail, Browse, Categories, About) plus the reusable component library.

---

## Phase 3 — Native wrappers

### 3.1 Android — Trusted Web Activity (TWA) via Bubblewrap

Cheapest path. Wraps the live PWA at `ecodehalalcheck.com`.

Steps:

1. `npm i -g @bubblewrap/cli`
2. `bubblewrap init --manifest=https://ecodehalalcheck.com/manifest.json`
3. Configure: package name `com.tenkbb.ecodehalalcheck` (or similar), signing key, app name
4. Add `assetlinks.json` to `public/.well-known/assetlinks.json` so Android verifies your domain owns the app — without this you get an ugly URL bar
5. `bubblewrap build` → produces `app-release-bundle.aab`

**Pros:** ships your live site, updates instantly, no native code.
**Cons:** Play Store still requires you to handle Android back button, splash screen, and offline gracefully — your service worker already covers offline.

### 3.2 iOS — Capacitor wrapper

TWA equivalent doesn't exist for iOS; Apple rejects pure WebView apps. Capacitor with 2-3 native touches is the path.

Steps:

1. Install Capacitor + plugins:
   ```
   npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/browser \
         @capacitor/share @capacitor/haptics @capacitor/status-bar @capacitor/splash-screen
   ```
2. `npx cap init "E-Code Halal Check" com.tenkbb.ecodehalalcheck`
3. Set `webDir: "dist"` in `capacitor.config.ts`
4. `npx cap add ios`
5. **Critical native touches to pass App Store review 4.2:**
   - Native share sheet on E-code detail page (`Share.share()`)
   - Haptic feedback on search/tap (`Haptics.impact()`)
   - Status bar styling matching theme (`StatusBar.setStyle()`)
   - Native splash screen with your logo (configured in `capacitor.config.ts`)
   - Push notifications **optional** but strongly recommended — even if you don't use them yet, having the capability declared helps. Use case: "new E-codes added" weekly digest
6. `npx cap sync ios && npx cap open ios` → opens Xcode

**Build modes:** load from bundled `dist/` (offline-capable) rather than remote URL. Apple prefers bundled content.

### 3.3 Build script changes — `package.json`

Add:

```json
"build:native": "VITE_APP_MODE=native npm run build && npx cap sync",
"build:twa": "VITE_APP_MODE=twa npm run build"
```

In `vite.config.ts`, expose `VITE_APP_MODE` so the detection hook can read it as a fallback (cheaper than the runtime checks for first paint).

---

## Phase 4 — Store submission

### 4.1 Assets needed (you partially have these)

- ✅ App icons: you have 192/512 PNGs, but App Store needs **1024×1024 PNG with no transparency, no rounded corners** (Apple rounds them). Generate from `logo.webp`.
- ✅ Screenshots: you have `ss-light-phone.jpg`, `ss-dark-phone.jpg`, etc. App Store requires:
  - **iPhone 6.7" (1290×2796)** — 3–10 screenshots, mandatory
  - **iPhone 6.5"** — optional but recommended
  - **iPad 12.9"** — only if shipping iPad version
- Play Store: 2–8 phone screenshots (1080×1920 or similar), feature graphic 1024×500
- Marketing copy: short description (80 chars Play / 30 chars Apple subtitle), full description (4000 chars), keywords (Apple: 100-char comma list)

### 4.2 Apple App Store

- Apple Developer account: $99/year
- App Store Connect: create app, fill metadata, upload `.ipa` via Xcode or Transporter
- Privacy nutrition label: declare GA4 data collection (Analytics → Product Interaction, Usage Data, **not** linked to user, **not** used for tracking — assuming you don't use GA4 ad signals)
- App Privacy Policy URL: required — point to `/privacy-policy` on your live site

**Likely review hurdles:**

- 4.2 (minimum functionality): mitigated by Capacitor native touches in 3.2
- 4.3 (spam): unique enough — niche utility, no competitors with the same dataset
- 5.1.1 (data collection): GA4 needs disclosure in privacy label
- First submission rejection rate is ~30% — budget 2–3 review cycles, ~2 weeks

### 4.3 Google Play Store

- Play Console: $25 one-time
- Upload `.aab` from Bubblewrap
- Same privacy policy + data safety form (declare GA4)
- Content rating questionnaire
- Target API level: must be Android 14 (API 34) as of 2024 — Bubblewrap handles this
- Faster review (~1–3 days), much lower rejection rate

### 4.4 Post-launch ops

- **TWA auto-updates** when you deploy to Vercel — no resubmission needed for content
- **Capacitor needs a rebuild + resubmit** for any change to `dist/`. To avoid this for content updates, consider loading remote URL in production builds (Apple allows this if the wrapper has enough native value-add — risky, recommend bundled for v1)
- Add a kill switch / version check: API endpoint that returns "min supported app version" so you can force-update if you ship a breaking change

---

## Recommended order of execution

1. **Phase 1** (~half day) — detection hook + manifest tweak
2. **Phase 2** (~1 day) — gate footer, install prompt, banner, safe areas
3. **Phase 3.1** (~half day) — Bubblewrap TWA, submit to Play Store first (faster feedback loop)
4. **Phase 3.2** (~2 days) — Capacitor + native touches
5. **Phase 4** — submit iOS, iterate on rejections

**Total:** roughly **1 week of focused work** plus 1–2 weeks of review wait time.
