/**
 * Minimal, dependency-free toast for the two places that need one
 * ("link copied"). Replaces sonner (+33 KB) and the unused Radix toaster.
 */
export function showToast(message: string, durationMs = 2200): void {
  if (typeof document === 'undefined') return;
  const el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.textContent = message;
  el.className =
    'fixed left-1/2 top-4 z-[100] -translate-x-1/2 rounded-lg border bg-background px-4 py-2 text-sm shadow-lg transition-opacity duration-300';
  document.body.appendChild(el);
  window.setTimeout(() => {
    el.style.opacity = '0';
    window.setTimeout(() => el.remove(), 350);
  }, durationMs);
}
