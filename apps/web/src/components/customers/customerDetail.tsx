import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Customer {
  id: number;
  name: string;
  surname: string;
  email?: string;
  cellphone?: string;
  dateOfBirth?: string;
  address?: string;

  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
}

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year?: number;
  plate?: string;
}

interface Job {
  id: number;
  title: string;
  status: string; // Defines the status job object
}
//Defines the Quote objects in a interface
interface Quote {
  id: number;
  reference: string;
  total: number;
}
//Displays all details for a customer(vehicles,jobs and quotes) fetched from an api
export default function CustomerDetailPage() {
  const  params = useParams();
  const router = useRouter();
  const customerId = params?.id ? parseInt(params.id as string) : null;
//Tracks wether a page is still loading and holds errors,declares state for customer data,vehicles,jobs and quotes
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
//Runs once the component mounts,validates the ID then fetches all related data from the API in sequence
  useEffect(() => {
    //Validates the ID then fetches all related data from the API in sequence     
    if (!customerId) {
      //If there is no ID in the URL set error and stop loading
      setError("Invalid customer ID");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        //fetches customer's core details and gives an error if none found
        // Customer
        const customerRes = await fetch(`/api/customers/${customerId}`);
        if (!customerRes.ok) throw new Error("Customer not found");
        setCustomer(await customerRes.json());
        //fetches all vehicles linked to the customer
        // Vehicles
        const vehicleRes = await fetch(`/api/vehicles?customerId=${customerId}`);
        if (vehicleRes.ok) setVehicles(await vehicleRes.json());
         //fetch all jobs linked to the customer
        // Jobs
        const jobRes = await fetch(`/api/jobs?customerId=${customerId}`);
        if (jobRes.ok) setJobs(await jobRes.json());
        //fetches all the quotes linked to this customer
        // Quotes
        const quoteRes = await fetch(`/api/quotes?customerId=${customerId}`);
         //if any fetch fails,capture the erro message to display to the user
        if (quoteRes.ok) setQuotes(await quoteRes.json());
      } catch (err: any) {
        setError(err.message || "Failed to load customer data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [customerId]);

  if (loading) return <div className="p-10 text-center">Loading…</div>;

  if (error || !customer)
    return (
      <div className="p-10 text-center text-red-600">
        {error || "Customer not found"}
      </div>
    );

  const fullName = `${customer.name} ${customer.surname}`;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => router.push("/customers")}
            className="text-blue-600 hover:underline mb-2 block"
          >
            ← Back to Customers
          </button>

          <h1 className="text-4xl font-bold">{fullName}</h1>

          {customer.archived && (
            <span className="mt-2 inline-block bg-red-100 text-red-700 px-3 py-1 rounded-lg">
              Archived — {customer.archivedAt && new Date(customer.archivedAt).toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          {!customer.archived && (
            <button
              onClick={() => router.push("/customers")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Customer Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white border rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Customer Information</h2>

          <div><strong>Full Name:</strong> {fullName}</div>
          {customer.email && <div><strong>Email:</strong> {customer.email}</div>}
          {customer.cellphone && <div><strong>Cellphone:</strong> {customer.cellphone}</div>}
          {customer.address && <div><strong>Address:</strong> {customer.address}</div>}
          {customer.dateOfBirth && (
            <div>
              <strong>Date of Birth:</strong>{" "}
              {new Date(customer.dateOfBirth).toLocaleDateString()}
            </div>
          )}

          <hr className="my-4" />

          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Created:</strong> {customer.createdAt && new Date(customer.createdAt).toLocaleString()}</div>
            <div><strong>Updated:</strong> {customer.updatedAt && new Date(customer.updatedAt).toLocaleString()}</div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Vehicles ({vehicles.length})
            </h2>

            {vehicles.length === 0 ? (
              <p>No vehicles found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((v) => (
                  <div key={v.id} className="border rounded-xl p-5">
                    <strong>{v.make} {v.model}</strong>
                    {v.year && <span> • {v.year}</span>}
                    {v.plate && <p className="mt-2">Plate: {v.plate}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Jobs */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Jobs ({jobs.length})
            </h2>

            {jobs.length === 0 ? (
              <p>No jobs found.</p>
            ) : (
              <ul className="space-y-3">
                {jobs.map((job) => (
                  <li key={job.id} className="border rounded-xl p-4">
                    <strong>{job.title}</strong>
                    <div>Status: {job.status}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Quotes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Quotes ({quotes.length})
            </h2>

            {quotes.length === 0 ? (
              <p>No quotes found.</p>
            ) : (
              <ul className="space-y-3">
                {quotes.map((q) => (
                  <li key={q.id} className="border rounded-xl p-4">
                    <strong>Quote #{q.reference}</strong>
                    <div>Total: R{q.total.toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
