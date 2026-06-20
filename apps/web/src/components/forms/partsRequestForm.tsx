'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { FormActions, FormField } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { requestJson } from '@/lib/apiClient';
import type { PartsRequestFormProps } from '@/types/parts';

const partMapping: Record<string, number> = {
  'AL-001': 3,
  'BP-001': 4,
  'SM-001': 1,
  'SM-002': 2,
};

export function PartsRequestForm({ jobCardId }: PartsRequestFormProps) {
  const [partName, setPartName] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const numericPartId = partMapping[partNumber] ?? Number.parseInt(partNumber, 10);

      if (!numericPartId || Number.isNaN(numericPartId)) {
        throw new Error('Enter a valid part number or mapped SKU.');
      }

      const payload = {
        items: [
          {
            notes,
            partId: numericPartId,
            quantity,
          },
        ],
        jobCardId,
      };

      await requestJson<{ requestId: string }>('/api/parts-requests', {
        body: JSON.stringify(payload),
        errorMessage: 'Failed to create parts request.',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      setStatusMessage('Parts request submitted. Supplier responses can now be tracked from the parts queue.');
      setPartName('');
      setPartNumber('');
      setQuantity(1);
      setNotes('');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create parts request</CardTitle>
        <CardDescription>
          Capture the required part and send it into the supplier workflow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="partName" label="Part name">
              <Input
                id="partName"
                name="partName"
                onChange={(event) => setPartName(event.target.value)}
                required
                value={partName}
              />
            </FormField>

            <FormField
              description="Use a mapped demo SKU such as SM-001 or the numeric part ID."
              id="partNumber"
              label="Part number / SKU"
            >
              <Input
                id="partNumber"
                name="partNumber"
                onChange={(event) => setPartNumber(event.target.value)}
                placeholder="SM-001"
                required
                value={partNumber}
              />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
            <FormField id="quantity" label="Quantity">
              <Input
                id="quantity"
                min={1}
                name="quantity"
                onChange={(event) => setQuantity(Number(event.target.value))}
                type="number"
                value={quantity}
              />
            </FormField>

            <FormField id="notes" label="Supplier notes">
              <textarea
                className="min-h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                id="notes"
                name="notes"
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Brand preference, urgency, delivery instructions..."
                value={notes}
              />
            </FormField>
          </div>

          {statusMessage ? (
            <p aria-live="polite" className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
              {statusMessage}
            </p>
          ) : null}

          <FormActions>
            <Button disabled={loading} type="submit" variant="accent">
              {loading ? 'Submitting...' : 'Submit request'}
            </Button>
          </FormActions>
        </form>
      </CardContent>
    </Card>
  );
}
