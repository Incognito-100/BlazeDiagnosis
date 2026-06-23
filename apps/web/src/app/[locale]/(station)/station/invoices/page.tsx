import Link from 'next/link'
import { StatusBadge } from '@/components/status'

export default function InvoiceListPage() {
    const sampleInvoices = [
        {
            id: 'inv_0001',
            number: 'WS-2026-06-0001',
            total: 'R1,234.00',
            status: 'ISSUED',
            jobCardId: 'job_0001',
            quoteId: 'quote_0001',
        },
        {
            id: 'inv_0002',
            number: 'WS-2026-06-0002',
            total: 'R2,450.00',
            status: 'DRAFT',
            jobCardId: 'job_0002',
            quoteId: 'quote_0002',
        },
    ]

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Invoices</h1>
            <p className="text-sm text-muted-foreground mb-6">
                Invoice list skeleton for station UI. Each invoice is linked conceptually to a quote and job.
            </p>

            <ul className="space-y-4">
                {sampleInvoices.map((inv) => (
                    <li key={inv.id} className="p-4 border rounded-lg">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="font-medium">{inv.number}</div>
                                <div className="text-sm text-gray-500">{inv.status} • {inv.total}</div>
                                <div className="mt-2 text-sm text-gray-500">
                                    Job {inv.jobCardId} · Quote {inv.quoteId}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge value={inv.status} />
                                <Link href={`./${inv.id}`} className="text-blue-600 hover:underline">
                                    View
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
