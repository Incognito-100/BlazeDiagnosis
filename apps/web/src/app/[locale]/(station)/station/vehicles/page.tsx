import { PlusCircle } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { VehicleForm, VehicleList } from '@/components/vehicles';
import { PageSection } from '@/components/layout/pageSection';
import { Button } from '@/components/ui/button';

export default function StationVehiclesPage() {
  return (
    <AppShell
      actions={
        <Button disabled variant="accent">
          <PlusCircle className="size-4" />
          Add vehicle
        </Button>
      }
      description="Manage tenant vehicle records, registration data, VINs, and service-history entry points."
      surface="station"
      title="Vehicles"
    >
      <PageSection title="Vehicle intake">
        <VehicleForm />
      </PageSection>
      <PageSection title="Vehicle directory">
        <VehicleList />
      </PageSection>
    </AppShell>
  );
}
