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

  return ()
    

}
