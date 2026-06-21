// apps/web/src/app/[locale]/(station)/station/quotes/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function QuotesPage() {
  // This will be replaced with real data in Week 3
  const mockQuotes = [
    { id: "1", customer: "John Doe", vehicle: "Toyota Corolla", total: 4500, status: "draft" },
    { id: "2", customer: "Jane Smith", vehicle: "Honda Civic", total: 3200, status: "sent" },
    { id: "3", customer: "Bob Johnson", vehicle: "Ford Focus", total: 2100, status: "approved" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quotes</h1>
        <Link href="/station/quotes/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4">Quote #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockQuotes.map((quote) => (
              <tr key={quote.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">Q-{quote.id}</td>
                <td className="p-4">{quote.customer}</td>
                <td className="p-4">{quote.vehicle}</td>
                <td className="p-4">R {quote.total.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    quote.status === "draft" ? "bg-gray-200" :
                    quote.status === "sent" ? "bg-blue-100 text-blue-800" :
                    quote.status === "approved" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {quote.status}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}