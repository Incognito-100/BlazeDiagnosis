  //List of Parts with their details

  const parts = [
    { id: 1, sku: 'SM-001', name: 'Starter Motor', category: 'Engine', quantity: 10, checkInDate: '2023-10-01', StaffMember: 'John Doe',  status: 'In Stock' },
    { id: 2, sku: 'AL-001', name: 'Alternator', category: 'Electrical', quantity: 5, checkInDate: '2023-10-01', StaffMember: 'Jane Smith', status: 'Low Stock' },
    { id: 3, sku: 'BP-001', name: 'Brake Pads', category: 'Chassis', quantity: 0, checkInDate: '2023-10-01', StaffMember: 'Bob Johnson', status: 'Out of Stock' },
  ]
 
  //Filter parts based on their status

  const OnOrderParts = parts.filter(part => part.status === 'Out of Stock' || part.status === 'Low Stock');
  const InStockParts = parts.filter(part => part.status === 'In Stock');

  // Define colors for each category

  const categoryColors: Record<string, string> = {
    'Engine': '#3b82f6',
    'Electrical': '#10b981',
    'Chassis': '#f59e0b',
  };
  


export function PartsPanel() {
  
  // Get unique categories from parts data
  
  const categories = Array.from(new Set(parts.map(part => part.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-800 to-blue-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Parts Management</h1>

      {/*Category Filters*/}
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <span key={cat} className="px-4 py-2 rounded-xl cursor-pointer bg-gradient-to-r from-blue-700 to-slate-700 hover:from-blue-600 hover:to-slate-600 transition">
            {cat}
          </span>
        ))}
      </div>

      {/*In Stock Section*/}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">In Stock</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {InStockParts.map((part) => (
            <div key={part.id} className="bg-slate-900 rounded-xl shadow-lg p-4 border border-blue-700 hover:shadow-blue-500/50 
            transition">
              <h3 className="text-lg font-bold">{part.name}</h3>
              <p className="text-sm text-slate-300">SKU: {part.sku}</p>
              <p className="text-sm">Category: {part.category}</p>
              <p className="text-sm">Quantity: {part.quantity}</p>
              <p className="text-sm">Checked in by: {part.StaffMember}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-700">
                {part.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/*An Order Section*/}
      <section>
        <h2 className="text-2xl font-semibold mb-4">On Order / Low Stock</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OnOrderParts.map((part) => (
            <div key={part.id} className="bg-slate-900 rounded-xl shadow-lg p-4 border border-yellow-600 hover:shadow-yellow-500/50 transition">
              <h3 className="text-lg font-bold">{part.name}</h3>
              <p className="text-sm text-slate-300">SKU: {part.sku}</p>
              <p className="text-sm">Category: {part.category}</p>
              <p className="text-sm">Quantity: {part.quantity}</p>
              <p className="text-sm">Checked in by: {part.StaffMember}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-700">
                {part.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
