import { QuoteBuilder } from './quote-builder';

export function QuotesPanel() {
  return (
    <section aria-labelledby="mvp-quotes-title" className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold" id="mvp-quotes-title">
          Quote builder
        </h2>
        <p className="text-sm text-neutral-600">
          Demo quote layout for approval workflow screens.
        </p>
      </div>
      <QuoteBuilder />
    </section>
  );
}
