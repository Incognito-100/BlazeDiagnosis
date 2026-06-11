import React from 'react';

export function MarketplacePanel({ selectedPartId, onSelectPart }) {
  const testParts = [
    { 
      id: 1, 
      name: "Brembo Front Brake Pads", 
      category: "Brakes", 
      price: "R 1,485.00", 
      sku: "BRK-4022",
      branches: [
        { name: "NAPA Auto Parts - Downtown Hub", stock: 8, eta: "20 mins (Hotshot)" },
        { name: "AutoZone Commercial - Northside Warehouse", stock: 4, eta: "45 mins" },
        { name: "Worldpac - Regional Distribution Center", stock: 15, eta: "Same-Day (2 PM delivery)" }
      ]
    },
    { 
      id: 2, 
      name: "Castrol EDGE 5W-30 Synthetic (5L)", 
      category: "Fluids", 
      price: " R 735.00", 
      sku: "OIL-5W30-C",
      branches: [
        { name: "AutoZone Commercial - Northside Warehouse", stock: 24, eta: "15 mins" },
        { name: "NAPA Auto Parts - East Branch", stock: 12, eta: "30 mins" }
      ]
    },
    { 
      id: 3, 
      name: "Michelin Pilot Sport 4S (245/40R18)", 
      category: "Tires", 
      price: "R 3,465.00", 
      sku: "TIR-2454018",
      branches: [
        { name: "Worldpac - Regional Distribution Center", stock: 8, eta: "Next-Day Freight" },
        { name: "NAPA Auto Parts - Downtown Hub", stock: 2, eta: "1 hour" }
      ]
    },
    { 
      id: 4, 
      name: "Bosch AGM Battery Group 35", 
      category: "Electrical", 
      price: "R 2,725.00", 
      sku: "BAT-AGM35",
      branches: [
        { name: "AutoZone Commercial - Northside Warehouse", stock: 3, eta: "30 mins" },
        { name: "NAPA Auto Parts - Downtown Hub", stock: 2, eta: "25 mins" }
      ]
    },
  ];

  // Set the first catalog item as the actively displayed sidebar focus item
  // const activePart = testParts[0]; Original
   const activePart = testParts.find(p => p.id === selectedPartId) || testParts[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 rounded-xl bg-gradient-to-bl from-[#08101c] via-[#0f1f53] to-[#0d1728] p-8">
      
      {/* Left Main Column: Catalog Items */}
      <div className="grid gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Live Inventory Marketplace</h2>
          <p className="text-sm text-gray-400">Review supplier branch stock availability and fulfillment dispatch rates across the network.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {testParts.map((part) => {
            // Highlights the first item to naturally connect it with the sidebar data display
            const isFirstItem = part.id === activePart.id;
            const totalStock = part.branches.reduce((sum, b) => sum + b.stock, 0);

            return (
              <div 
                key={part.id} 
                onClick={() => onSelectPart(part.id)}
                className={`flex flex-col justify-between rounded-xl border p-5 shadow-sm transition bg-white/5 backdrop-blur-sm hover:shadow-md ${
                  isFirstItem 
                    ? 'border-blue-400 bg-gradient-to-r from-blue-600/20 to-sky-500/20 ring-2 ring-blue-500/30' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded bg-gradient-to-r from-[#2563eb] to-[#38bdf8] px-2.5 py-0.5 text-xs font-semibold text-white">
                      {part.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {totalStock} Available
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-white line-clamp-1">{part.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">SKU: {part.sku}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <p className="text-xs text-gray-400">Trade Cost</p>
                    <p className="text-lg font-black text-white">{part.price}</p>
                  </div>
                  <span className={`text-xs font-medium ${isFirstItem ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
                    {isFirstItem ? 'Showing Details ●' : 'Active Part Item'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar: Distributor Branch Stock Breakdowns */}
      <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm h-full justify-between">
        <div>
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Branch Sourcing</span>
            <h3 className="text-lg font-bold text-white mt-0.5">{activePart.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">SKU: {activePart.sku}</p>
          </div>

          <div className="mt-4 space-y-3">
            {activePart.branches.map((branch, index) => (
              <div key={index} className="rounded-lg border border-white/5 p-3.5 bg-white/5 hover:bg-white/10 transition flex flex-col gap-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-semibold text-gray-200 leading-tight flex-1 pr-2">
                    {branch.name}
                  </span>
                  <span className="text-xs font-bold bg-[#0d1728] text-white border border-white/10 px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                    Qty: {branch.stock}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Delivery Dispatch:</span>
                  <span className="font-medium text-gray-200">{branch.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 py-3 text-sm font-semibold text-white hover:brightness-110 active:scale-[0.99] transition shadow-md shadow-blue-900/20">
            Dispatch Order from Closest Branch
          </button>
        </div>
      </div>

    </div>
  );
}
