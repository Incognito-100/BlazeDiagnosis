import { AppShell } from '../../../components/layout/AppShell';
import { PaymentsPanel } from '../components/PaymentsPanel';

export default function PaymentsPage() {
  return (
    <AppShell title="Workshop Dashboard">
      <PaymentsPanel />
    </AppShell>
  );
}
