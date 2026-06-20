import type { TenantBranding } from '@/types/tenantBranding';
import { defaultTenantBranding } from '@/types/tenantBranding';

export const tenantBrandingStorageKey = 'blaze-tenant-branding';
export const tenantBrandingChangedEvent = 'blaze-tenant-branding-changed';

export function normalizeTenantBranding(value: Partial<TenantBranding> | null | undefined): TenantBranding {
  return {
    ...defaultTenantBranding,
    ...(value ?? {}),
  };
}

export function getStoredTenantBranding(): TenantBranding {
  if (typeof window === 'undefined') {
    return defaultTenantBranding;
  }

  try {
    const stored = window.localStorage.getItem(tenantBrandingStorageKey);
    if (!stored) {
      return defaultTenantBranding;
    }

    return normalizeTenantBranding(JSON.parse(stored) as Partial<TenantBranding>);
  } catch {
    return defaultTenantBranding;
  }
}

export function saveTenantBranding(branding: TenantBranding) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(tenantBrandingStorageKey, JSON.stringify(branding));
  applyTenantBranding(branding);
  window.dispatchEvent(new Event(tenantBrandingChangedEvent));
}

export function resetTenantBranding() {
  saveTenantBranding(defaultTenantBranding);
}

export function applyTenantBranding(branding: TenantBranding) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.style.setProperty('--primary', branding.primaryColor);
  root.style.setProperty('--secondary', branding.secondaryColor);
  root.style.setProperty('--accent', branding.accentColor);
  root.style.setProperty('--ring', branding.accentColor);
  root.style.setProperty('--primary-foreground', getReadableForeground(branding.primaryColor));
  root.style.setProperty('--secondary-foreground', getReadableForeground(branding.secondaryColor));
  root.style.setProperty('--accent-foreground', getReadableForeground(branding.accentColor));
}

export function subscribeToTenantBranding(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();
  window.addEventListener('storage', handleChange);
  window.addEventListener(tenantBrandingChangedEvent, handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(tenantBrandingChangedEvent, handleChange);
  };
}

export function getTenantBrandingSnapshot() {
  return JSON.stringify(getStoredTenantBranding());
}

export function getTenantBrandingServerSnapshot() {
  return JSON.stringify(defaultTenantBranding);
}

export function getReadableForeground(hexColor: string) {
  const fallback = '#ffffff';
  const normalized = hexColor.replace('#', '').trim();

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback;
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62 ? '#0f172a' : '#ffffff';
}
