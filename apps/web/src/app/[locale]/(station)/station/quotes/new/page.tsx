// apps/web/src/app/[locale]/(station)/station/quotes/new/page.tsx
import { QuoteBuilder } from "@/features/quotes/components/quote-builder";

export default function NewQuotePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Quote</h1>
      <QuoteBuilder />
    </div>
  );
}