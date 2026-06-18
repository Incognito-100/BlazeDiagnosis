"use client"
import  {AppShell}  from '@/components/common/app-shell' ;
import React, { useState } from "react"

//TypeScript interface that defines the shape of a Vehicle object. In plain terms, it’s a contract that says: “Any object of type 
//Vehicle must have these properties, and they must be strings.” The required fields are customerId, registrationNumber, make, model,
//and vin, which means every vehicle must include those values. The optional fields, marked with a ?, like variant, year, engineType, 
//fuelType, transmission, odometer, and color, can be left out if they’re not relevant. This helps TypeScript catch errors early by 
//ensuring that when you create or update a vehicle, you’re using the correct property names and types, and it makes your code more 
//predictable and easier to maintain.

interface Vehicle {
    customerId: string;
    registrationNumber: string;
    make: string;
    model: string;
    vin?: string;
    variant?: string;
    year?: string;
    engineType?: string;
    fuelType?: string;
    transmission?: string;
    odometer?: string;
    color?: string;
}

const VehicleForm: React.FC = () => {
    const [vehicle , setVehicle] = useState<Vehicle>({
        customerId: "",
        registrationNumber: "",
        make: "",
        model:"",
        vin: "",
        variant: "",
        year: "",
        engineType: "",
        fuelType: "",
        transmission: "",
        odometer: "",
        color: "",
    })

//This code gives your form its behavior. The handleChange function updates the vehicle state whenever you type into an input or
//select a value, making sure only the field you changed is replaced while the rest stay the same. The handleSubmit function runs 
//when you press the submit button, stopping the page from refreshing and then working with the current vehicle data.    

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vehicle submitted:", vehicle);
    // TODO: integrate with backend API
  };

//This return block renders your vehicle form inside the app’s layout. The <AppShell> provides the global frame, and inside it the 
//<form> contains all the input fields tied to the vehicle state. Each field updates through handleChange, while pressing the submit
//button triggers handleSubmit to stop the page refresh and work with the current vehicle data. In short, it’s a styled, controlled
//form for adding vehicle details, wrapped in your app’s layout.
  
return (
  <AppShell title= "Vehicle" surface="customer">
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-blue-400">Add Vehicle</h2>

      {/* Required fields */}
      <input
        type="text"
        name="customerId"
        value={vehicle.customerId}
        onChange={handleChange}
        placeholder="Customer ID"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      
      />
      <input
        type="text"
        name="registrationNumber"
        value={vehicle.registrationNumber}
        onChange={handleChange}
        placeholder="Registration Number"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      
      />
      <input
        type="text"
        name="make"
        value={vehicle.make}
        onChange={handleChange}
        placeholder="Make"
        className= "w-full p-2 rounded bg-gray-800 border border-gray-700"
        required 
      />
      <input
        type="text"
        name="model"
        value={vehicle.model}
        onChange={handleChange}
        placeholder="Model"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Optional fields */}
      <input
        type="text"
        name="vin"
        value={vehicle.vin}
        onChange={handleChange}
        placeholder="VIN"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="variant"
        value={vehicle.variant}
        onChange={handleChange}
        placeholder="Variant"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="year"
        value={vehicle.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="engineType"
        value={vehicle.engineType}
        onChange={handleChange}
        placeholder="Engine Type"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="fuelType"
        value={vehicle.fuelType}
        onChange={handleChange}
        placeholder="Fuel Type"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="transmission"
        value={vehicle.transmission}
        onChange={handleChange}
        placeholder="Transmission"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="odometer"
        value={vehicle.odometer}
        onChange={handleChange}
        placeholder="Odometer"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      <input
        type="text"
        name="color"
        value={vehicle.color}
        onChange={handleChange}
        placeholder="Color"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Save Vehicle
      </button>
    </form>
  </AppShell>
  );
};

export default VehicleForm;