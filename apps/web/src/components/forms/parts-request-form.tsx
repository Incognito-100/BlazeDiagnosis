import React, { useState } from "react";

export function PartsRequestForm({
  jobCardId,
  tenantId,
}: {
  jobCardId: string;
  tenantId: string;
}) {
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your API route instead of backend service directly
      const res = await fetch("/api/parts-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId,
          jobCardId,
          partName,
          partNumber,
          quantity,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create parts request");
      }

      console.log("Parts request created:", data);
      alert("Parts request submitted successfully!");
    } catch (error) {
      console.error(" Failed to create parts request:", error);
      alert("Error submitting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
      <h2 className="text-lg font-semibold">Parts Request</h2>

      <div>
        <label className="block font-medium">Part Name</label>
        <input
          type="text"
          value={partName}
          onChange={(e) => setPartName(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium">Part Number</label>
        <input
          type="text"
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
