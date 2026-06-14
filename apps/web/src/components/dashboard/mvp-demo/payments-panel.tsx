import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PaymentsPanel() {
  return (
    <section aria-labelledby="mvp-payments-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-payments-title">
          Payments placeholder
        </h2>
        <p className="text-sm text-neutral-600">
          Payment gateway work remains post-MVP; this card keeps the route
          planned.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Future payment capture</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-neutral-600 md:grid-cols-2">
          <p>Gateway integration: not implemented</p>
          <p>Deposits and partial payments: planned</p>
          <p>Credit card capture: planned</p>
          <p>Manual payment status tracking: MVP</p>
        </CardContent>
      </Card>
    </section>
  );
}
