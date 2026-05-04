/**
 * Capacitor wrappers with web fallbacks.
 *
 * Each function tries the native API first (when running inside a Capacitor
 * native shell), then degrades to the closest web equivalent. Safe to call
 * from any context — browser, PWA, TWA, or native — without conditional
 * imports at the call site.
 */

import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Share } from '@capacitor/share';
import { StatusBar, Style } from '@capacitor/status-bar';

export const isNative = (): boolean => Capacitor.isNativePlatform();

export const nativePlatform = (): 'ios' | 'android' | 'web' =>
  Capacitor.getPlatform() as 'ios' | 'android' | 'web';

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  dialogTitle?: string;
}

export async function shareContent(options: ShareOptions): Promise<'native' | 'web' | 'clipboard' | 'cancelled'> {
  if (isNative()) {
    try {
      await Share.share(options);
      return 'native';
    } catch {
      return 'cancelled';
    }
  }

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare?.(options)) {
    try {
      await navigator.share(options);
      return 'web';
    } catch {
      return 'cancelled';
    }
  }

  if (options.url && typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(options.url);
    return 'clipboard';
  }

  return 'cancelled';
}

export async function openExternalUrl(url: string): Promise<void> {
  if (isNative()) {
    await Browser.open({ url, presentationStyle: 'popover' });
    return;
  }

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export async function impactLight(): Promise<void> {
  if (!isNative()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // ignore — haptics unavailable on this device
  }
}

export async function impactMedium(): Promise<void> {
  if (!isNative()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    // ignore
  }
}

export async function notifySuccess(): Promise<void> {
  if (!isNative()) return;
  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch {
    // ignore
  }
}

export async function notifyWarning(): Promise<void> {
  if (!isNative()) return;
  try {
    await Haptics.notification({ type: NotificationType.Warning });
  } catch {
    // ignore
  }
}

export async function setStatusBarStyle(theme: 'light' | 'dark'): Promise<void> {
  if (!isNative()) return;
  try {
    await StatusBar.setStyle({ style: theme === 'dark' ? Style.Dark : Style.Light });
  } catch {
    // ignore — likely Android < 6 or status bar plugin unavailable
  }
}

/**
 * Register an Android hardware back button handler.
 * Returns a cleanup function. iOS uses native swipe-back automatically;
 * this is a no-op on iOS and web.
 */
export async function onHardwareBack(handler: () => boolean | void): Promise<() => void> {
  if (!isNative() || nativePlatform() !== 'android') {
    return () => {};
  }
  const listener = await App.addListener('backButton', ({ canGoBack }) => {
    const handled = handler();
    if (!handled && !canGoBack) {
      App.exitApp();
    } else if (!handled && canGoBack) {
      window.history.back();
    }
  });
  return () => {
    listener.remove();
  };
}
