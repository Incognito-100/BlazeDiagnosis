import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StatusBadge } from '@/components/status'

type Props = {
    params: { id: string }
}

export default function InvoiceDetailPage({ params }: Props) {
    const { id } = params

    // Placeholder: in real implementation fetch invoice by id
    if (!id) return notFound()

    const invoice = {
        id,
        number: 'WS-2026-06-0001',
        status: 'ISSUED',
        total: 'R1,234.00',
        issuedAt: '2026-06-15',
        dueAt: '2026-07-15',
        quoteId: 'quote_0001',
        jobCardId: 'job_0001',
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Invoice detail</h1>
            <p className="text-sm text-muted-foreground mb-6">
                Skeleton invoice detail for <strong>{invoice.number}</strong>.
            </p>

            <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                    <div className="p-4 border rounded">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="font-medium">Summary</h2>
                                <p className="text-sm text-gray-500">Invoice and related job/quote reference.</p>
                            </div>
                            <StatusBadge value={invoice.status} />
                        </div>
                        <dl className="mt-4 grid gap-2 text-sm text-gray-600">
                            <div>Invoice number: {invoice.number}</div>
                            <div>Issue date: {invoice.issuedAt}</div>
                            <div>Due date: {invoice.dueAt}</div>
                            <div>Total: {invoice.total}</div>
                            <div>Related quote: <Link href={`../../quotes/${invoice.quoteId}`} className="text-blue-600 hover:underline">{invoice.quoteId}</Link></div>
                            <div>Related job: <Link href={`../../job-cards/${invoice.jobCardId}`} className="text-blue-600 hover:underline">{invoice.jobCardId}</Link></div>
                        </dl>
                    </div>

                    <div className="p-4 border rounded">
                        <h2 className="font-medium">Status history</h2>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>Draft &rarr; Issued &rarr; Paid status flow will be surfaced here.</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border rounded">
                    <h2 className="font-medium">Actions</h2>
                    <div className="mt-4 space-y-2 text-sm">
                        <button className="w-full rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                            Send invoice
                        </button>
                        <button className="w-full rounded border border-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-50">
                            Mark as paid
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
