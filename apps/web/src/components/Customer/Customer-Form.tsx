"use client";
import { AppShell } from '@/components/common/app-shell';
import React, {useState} from "react";

//what properties it must have and what types those properties must be. 
//This interface ensures that anywhere in your codebase where you use a Customer object, TypeScript will enforce that all four fields 
// exist and are strings.
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

//That code defines a React component called CustomerPage and uses the useState hook to create a piece of state named Customer. The state 
// holds an object with all the properties of a customer, such as ID, full name, mobile number, email, address, and so on, each initialized 
// to an empty string (except for marketingConsent.
const CustomerPage = () => {
    const [Customer, setCustomers] = useState<Customer>({
      id: "",
      fullName: "",
      mobileNumber: "",
      alternateNumber: "",
      email: "",
      address: "",
      companyName: "",
      taxNumber: "",
      preferredCommunicationChannel: "",
      marketingConsent: false,
    });


//That function is the input change handler for your form. In short, it listens for changes on any input, select, or textarea.
// It grabs the field’s name, value, and type from the event, and if the field is a checkbox it uses the checked property instead 
// of the text value. Then it calls setCustomers to update the state, spreading the previous customer object and replacing only the field 
// that changed.
const handleChange = (
 e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
    const { name, value, type } = e.currentTarget ; 
    const checked = (e.currentTarget as HTMLInputElement) . checked;

    setCustomers((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));
};
    
//That function is the form submission handler. When the user clicks submit, it first calls e.preventDefault() to stop the browser’s
//  default behavior of refreshing the page. Then it logs the current Customer state object to the console.
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("submitted customer:",Customer);
};

//returns the JSX that builds your customer form interface. It creates a styled container with a heading and a form, then places each 
//input field one after the other so they stack vertically. Each input is bound to the Customer state and uses handleChange to update 
//values as the user types, while the form itself uses handleSubmit to process the data when submitted. In short, it renders a neatly
//styled, column‑based form where all fields appear under each other with consistent spacing.
//adds two extra parts to your customer form. The first is a dropdown menu for selecting the preferred communication channel, where the
//  user can choose between options like email, WhatsApp, or SMS. The second is a checkbox for marketing consent, which lets the user agree
//  to receive marketing communications. Finally, there’s a submit button labeled “Register Customer” that triggers the form submission. 
// In short, it extends the form with a choice field, a consent checkbox, and a button to send the customer’s data.

//format can be improved
return(
    <div 
    className="text-l font-bold  mb-8 p-8 flex  flex-col gap-3 items-center space-y-10 max-w-2xl mx-auto bg-[#0A1A2f] rounded-lg shadow-lg text-blue-200">
        <h2>Customer Form</h2>
            <form onSubmit={handleSubmit}> 
            <input required type="text" name="id" value={Customer.id} onChange={handleChange} placeholder="id" className="form-control" />
            <input required type="text" name="fullName" value={Customer.fullName} onChange={handleChange} placeholder="Full Name" className="form-control" />
            <input required type="text" name="mobileNumber" value={Customer.mobileNumber} onChange={handleChange} placeholder="mobileNumber" className="form-control" />
            <input required type="text" name="alternateNumber" value={Customer.alternateNumber} onChange={handleChange} placeholder="alternateNumber" className="form-control" />
            <input required type="text" name="email" value={Customer.email} onChange={handleChange} placeholder="email" className="form-control" />
            <input required type="text" name="address" value={Customer.address} onChange={handleChange} placeholder="address" className="form-control" />
            <input required type="text" name="companyName" value={Customer.companyName} onChange={handleChange} placeholder="companyName" className="form-control" />
            <input required type="text" name="taxNumber" value={Customer.taxNumber} onChange={handleChange} placeholder="taxNumber" className="form-control" />       
            

            {/* preferred Communication Channel*/}
            <label>
                preferredCommunicationChannel:
            <select
                name="preferredCommunicationChannel"
                value={Customer.preferredCommunicationChannel}
                onChange={handleChange}
            >
                <option value = "">select...</option>
                <option value ="email">email</option>
                <option value ="email">Whatsapp</option>
                <option value ="email">SMS</option>
            </select>
          </label>
          {/* Marketing Consent */}
          <label>
            <input 
             type="checkbox"
             name="marketingConsent"
             checked={Customer.marketingConsent}
             onChange={handleChange}
            />

            I agree to marketing consent
          </label>

          <button type="submit">Register Customer</button>
        </form>
    </div>
  );
};

export default CustomerPage;