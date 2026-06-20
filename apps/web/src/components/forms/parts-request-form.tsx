import React, { useState } from "react";

// 💡 MAP YOUR SKUs TO THE NUMERIC IDS FOUND IN YOUR DB
const partMapping: Record<string, number> = {
  "SM-001": 1,
  "SM-002": 2,
  "AL-001": 3,
  "BP-001": 4,
};

export function PartsRequestForm({
  jobCardId,
  tenantId,
}: {
  jobCardId: string;
  tenantId: string;
}) {
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState(""); // This is your SKU/String
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Convert the SKU string to the numeric ID the database expects
      const numericPartId = partMapping[partNumber] || parseInt(partNumber);

      if (!numericPartId || isNaN(numericPartId)) {
        throw new Error("Invalid Part Number: Could not map to a database ID.");
      }

      // 2. Prepare the payload structure
      const payload = {
        tenantId,
        jobCardId,
        staffId: 1, // Ensure this user ID exists in your 'users' table
        items: [
          {
            partId: numericPartId,
            quantity: quantity,
            notes: notes,
          },
        ],
      };

      const res = await fetch("/api/parts-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create parts request");
      }

      alert("Parts request submitted successfully!");
    } catch (error) {
      console.error("Failed to create parts request:", error);
      alert("Error: " + (error instanceof Error ? error.message : "Submission failed"));
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
        <label className="block font-medium">Part Number (SKU)</label>
        <input
          type="text"
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          placeholder="e.g. SM-001"
          required
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