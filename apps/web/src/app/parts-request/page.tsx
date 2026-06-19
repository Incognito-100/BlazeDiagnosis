import React from "react";
import { PartsRequestForm } from "../../components/forms/parts-request-form";

export default function PartsRequestPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Parts Request</h1>

      {/* Demo form with props */}
      <PartsRequestForm jobCardId="demo-job-001" tenantId="tenant-xyz" />

      {/* Optional second form for testing */}
      {/* <PartsRequestForm jobCardId="demo-job-002" tenantId="tenant-abc" /> */}

      <div className="border p-4 rounded-md">
        <h3 className="font-medium">Submitted Requests (Demo)</h3>
        <table className="w-full mt-2 border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Part Name</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Brake Pads</td>
              <td className="p-2">4</td>
              <td className="p-2">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
