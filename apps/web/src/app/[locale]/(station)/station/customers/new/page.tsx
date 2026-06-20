import { UserPlus } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { CustomerVehicleWizard } from '@/components/customers';
import { Button } from '@/components/ui/button';

export default function NewCustomerPage() {
  return (
    <AppShell
      actions={
        <Button disabled variant="outline">
          <UserPlus className="size-4" />
          Wizard mode
        </Button>
      }
      description="Create a customer and their first vehicle in one guided intake flow. The UI is ready for tenant-aware mutations once production auth is connected."
      surface="station"
      title="Add customer and vehicle"
    >
      <CustomerVehicleWizard />
    </AppShell>
  );
}
