# Store Submission Runbook

Step-by-step commands and decisions for shipping E-Code Halal Check to Play Store and App Store.

---

## Status snapshot

| Platform | Wrapper | Package ID | Status |
|---|---|---|---|
| **Android (Play Store)** | Bubblewrap TWA | `com.ecodehalalcheck.www.twa` | Already published — `public/.well-known/assetlinks.json` has the live signing-key SHA-256 |
| **iOS (App Store)** | Capacitor | `com.ecodehalalcheck.app` | Scaffolded, not yet shipped |

---

## iOS — Capacitor → App Store

### One-time setup

```bash
# 1. Add the iOS native project (creates ios/ directory with Xcode project)
npx cap add ios

# 2. Open in Xcode for first run + configure signing
npx cap open ios
```

In Xcode:

1. Select the project in the sidebar → **Signing & Capabilities**
2. Set your Team to your Apple Developer account
3. Bundle Identifier should match `capacitor.config.ts` (`com.ecodehalalcheck.app`)
4. Increment Build/Version under **General** when releasing

### Build for production

```bash
# 1. Build the web bundle
npm run build

# 2. Sync the bundle into the iOS project
npx cap sync ios

# 3. Open Xcode, archive (Product → Archive)
npx cap open ios
```

In Xcode: **Product → Archive** → **Distribute App** → **App Store Connect**.

### App Store Connect required assets

- App icon: **1024×1024 PNG, no transparency, no rounded corners** (Apple rounds them). Generate from `public/icon-512.png` upscaled or `public/logo.webp`.
- Screenshots: 3–10 per device class. Mandatory: **iPhone 6.7" (1290×2796)**. Optional: iPhone 6.5", iPad 12.9".
  - Reuse `public/ss-light-phone.jpg` / `public/ss-dark-phone.jpg` after upscaling to 1290×2796.
- App Privacy:
  - Data Linked: **none** (we don't link to user identity)
  - Data Not Linked: **Analytics → Product Interaction, Usage Data** (GA4)
  - Tracking: **No** (assuming no ad signals from GA4)
- Privacy Policy URL: `https://www.ecodehalalcheck.com/privacy-policy`
- Description, keywords (100-char comma-list), subtitle (30 chars)

### Likely review hurdles + mitigations

| Guideline | Risk | Mitigation in this build |
|---|---|---|
| 4.2 (Minimum Functionality) | "Just a website in a frame" | Native share sheet (`@capacitor/share`), haptics on filter taps + search submit, status bar synced to theme, splash screen, hardware back, in-app Browser View for external links |
| 4.3 (Spam) | Duplicate of competitors | Unique dataset (MUIS-sourced); no real competitors |
| 5.1.1 (Data Collection) | GA4 not disclosed | Privacy nutrition label declares Analytics |
| 4.2.2 (Web ads) | KorbanBanner / Advertise-with-us | Hidden when `mode === 'native'` (gated via `useAppContext`) |

Budget 2–3 review cycles, ~2 weeks for first ship.

### Local development with native shell

```bash
# Live-reload from your dev machine onto a connected device/simulator
npx cap run ios -l --external

# Or just run with the bundled dist/
npm run build && npx cap run ios
```

---

## Android — Bubblewrap TWA → Play Store

The Android wrapper is already live as a TWA. To publish a new version:

### Update existing TWA

```bash
# 1. Make sure the live PWA reflects the new code (Vercel auto-deploys on push)

# 2. Bump version in twa-manifest.json (regenerate via Bubblewrap if needed)
bubblewrap update

# 3. Build a new bundle
bubblewrap build

# 4. Upload the resulting app-release-bundle.aab to Play Console → Production → Create new release
```

The TWA wraps your live PWA, so most code changes ship automatically without resubmission. **Only resubmit when:**

- Manifest changes (icons, theme, shortcuts, name)
- New shortcuts you want exposed in the launcher
- Major version bump for marketing reasons
- Play Store policy changes that require new disclosures

### If `assetlinks.json` ever stops working

The TWA shows a Chrome URL bar instead of full-screen → assetlinks verification failed. Check:

```bash
# Verify it's served correctly
curl -i https://www.ecodehalalcheck.com/.well-known/assetlinks.json
```

Must return 200 with `Content-Type: application/json` and the SHA-256 fingerprint matching Play Console's app signing key (Play Console → Setup → App Integrity → App signing key certificate).

### New signing key after Play Console upload

Play Console may re-sign your app with their own key (Play App Signing). The `assetlinks.json` SHA-256 must reflect Play's app signing key, not your local upload key.

Find it in: **Play Console → Setup → App integrity → App signing key certificate → SHA-256**.

---

## Pre-flight checklist (both platforms)

- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit -p tsconfig.app.json` clean
- [ ] `npm audit` clean (or only `info` level)
- [ ] Tested in browser at `?source=twa` — app mode renders correctly
- [ ] Tested in installed PWA on phone — safe areas don't clip header/tab bar
- [ ] All marketing chrome (Hero, InfoSection, KorbanBanner) hidden in app mode
- [ ] Footer hidden in app mode; About screen accessible from BottomTabBar
- [ ] Theme picker works in About screen
- [ ] Share works on E-Code detail page
- [ ] Filter chips tap with haptic feedback (native only)
- [ ] Search submit haptic feedback (native only)

---

## Useful Capacitor commands

```bash
npx cap sync ios          # rebuild + copy web assets to iOS native project
npx cap sync android      # same for Android (skip — using TWA instead)
npx cap update            # update Capacitor + plugin native code
npx cap doctor            # check setup health
npx cap copy ios          # copy web assets only (no plugin re-install)
```

## Useful Bubblewrap commands

```bash
bubblewrap doctor         # verify Java/Android SDK/keystore
bubblewrap init --manifest=https://www.ecodehalalcheck.com/manifest.json
bubblewrap update         # regenerate after manifest changes
bubblewrap build          # produce app-release-bundle.aab
bubblewrap install        # install on connected Android device for testing
```
