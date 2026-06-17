import { AppShell } from '@/components/common/app-shell';
import React  from "react";
//what properties it must have and what types those properties must be. 
//This interface ensures that anywhere in your codebase where you use a Customer object, TypeScript will enforce that all four fields exist and are strings
interface Customer{
    id: string;
    fullName: string;
    mobileNumber: string;
    alternateNumber: string;
    email: string; 
    address: string;
    companyName: string;
    taxNumber: string;
    preferredCommunicationChannel: string;
    marketingConsent: boolean; 
}

//This code defines a React component called CustomersPage.
//nside it, a variable named customers is created as an empty array of Customer objects. 
//It sets up a page component that expects to work with a list of customers, but for now the list is empty.

const CustomerPage =  () => {
    const customers: Customer[] = []; //empty list

//This JSX code renders a section of the page that displays a Customer List heading
//It then checks whether the customers array is empty. 
//It’s essentially the start of a conditional UI that handles the “empty state” for the customer list.
    
    return (
        <div>
      <h1>Customer List</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        
//This code renders the header section of an HTML table.
//It defines a table with borders and padding,
//Then creates a header row (<thead>) containing column titles for customer information.
//It sets up the structure for displaying detailed customer records in the table body (<tbody>).
//It generates the table body by mapping customer data into rows, handling missing fields gracefully.

        <table style={{ border: "", borderCollapse: "collapse", padding: "" }}>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Mobile Number</th>
                    <th>Alternate Number</th>
                    <th>Email</th>
                    <th>Adress</th>
                    <th>Company</th>
                    <th>Tax Number</th>
                    <th>Preferred Channel</th>
                    <th>Marketing Consent</th>
                </tr>
            </thead>
            <tbody>                
                {customers.map((c) => (
                <tr key={c.id}>
                    <td> {c.fullName}</td>
                    <td> {c.mobileNumber} </td>
                    <td> {c.alternateNumber || "-"}</td>
                    <td> {c.email || "-"} </td>
                    <td> {c.address || "-"} </td>
                    <td> {c.companyName || "-"} </td>
                    <td> {c.taxNumber || "-"} </td>
                    <td> {c.preferredCommunicationChannel || "-"} </td>
                    <td> {c.marketingConsent ? "Yes" : "No"} </td>
                </tr> 
                ))}
             </tbody>
            </table>
          )} 
        </div>
      );
    };
export default CustomerPage;
 
// TODO: Replace the table rendering with a <form> element.
// TODO: Use useState to hold a single Customer object with default empty values.
// TODO: Create controlled inputs (value + onChange) for each Customer property.
// TODO: Add a handleChange function that updates state when inputs change.
// TODO: Add a handleSubmit function that prevents default form submission and logs/sends the customer data.
// TODO: Make "fullName" and "mobileNumber" required fields with validation.
// TODO: Add a <select> input for preferredCommunicationChannel with options (Email, Phone, SMS).
// TODO: Add a checkbox input for marketingConsent.
// TODO: Style the form with consistent spacing and labels for each field.
// TODO: After submission, clear the form or show a success message.
// TODO: (Optional) Extend the form to allow adding multiple customers into an array.

<div>
    <h2>Customer Form</h2>
    <form onSubmit={handleSubmit}>
        <input required type="text" name="fullName" value={customer.fullName} onChange={handleChange} placeholder="Full Name" className="form-control" />
        <button type="submit">Register Customer</button>
    </form>
</div>