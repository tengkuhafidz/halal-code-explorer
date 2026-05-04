import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ecodehalalcheck.app',
  appName: 'E-Code Halal Check',
  webDir: 'dist',
  // Loads bundled dist/ on device — Apple prefers this over remote URLs.
  // For dev with live reload, run `npx cap run ios -l --external` instead.
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff',
    limitsNavigationsToAppBoundDomains: true,
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    backgroundColor: '#ffffff',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 2000,
      backgroundColor: '#10b981',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: '#ffffff',
      overlaysWebView: false,
    },
  },
};

export default config;
