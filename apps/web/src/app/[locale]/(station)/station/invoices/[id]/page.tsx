import { notFound } from 'next/navigation'

type Props = {
    params: { id: string }
}

export default function InvoiceDetailPage({ params }: Props) {
    const { id } = params

    // Placeholder: in real implementation fetch invoice by id
    if (!id) return notFound()

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Invoice Detail</h1>
            <p className="text-sm text-muted-foreground mb-6">Skeleton detail for invoice <strong>{id}</strong>.</p>

            <section className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                    <h2 className="font-medium">Summary</h2>
                    <dl className="mt-2 text-sm text-gray-600">
                        <div>Invoice number: —</div>
                        <div>Issue date: —</div>
                        <div>Due date: —</div>
                        <div>Total: —</div>
                    </dl>
                </div>
                <div className="p-4 border rounded">
                    <h2 className="font-medium">Actions</h2>
                    <div className="mt-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded">Send Invoice</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
