import { AppShell } from '../../../components/layout/AppShell';
import { PartsPanel } from '../components/PartsPanel';

export default function PartsPage() {
  return (
    <AppShell title='Parts Management'>
      <PartsPanel/>
    </AppShell>
  )
}
