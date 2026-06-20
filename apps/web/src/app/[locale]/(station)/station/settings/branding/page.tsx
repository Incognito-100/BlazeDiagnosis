import { Palette } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { TenantBrandingSettings } from '@/components/tenant/tenantBrandingSettings';
import { Button } from '@/components/ui/button';

export default function TenantBrandingPage() {
  return (
    <AppShell
      actions={
        <Button disabled variant="outline">
          <Palette className="size-4" />
          Tenant settings
        </Button>
      }
      description="Configure white-label colors, logo, business details, quote prefixes, and invoice prefixes for this tenant."
      surface="station"
      title="Branding"
    >
      <TenantBrandingSettings />
    </AppShell>
  );
}
