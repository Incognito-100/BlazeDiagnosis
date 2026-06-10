### **User Story: Service Check-In and Job Card Creation**

**As a** Service Advisor  
**I want** to quickly create a new service job card for a customer’s vehicle upon arrival  
**So that** I can capture all necessary details, assign the job to a technician, and start tracking the service process accurately.

### **Acceptance Criteria:**
- The system allows searching for an existing customer by phone number, name, or vehicle registration number (with auto-suggestions).
- If the customer is new, the advisor can quickly add basic customer details (name, phone, email, address).
- Vehicle details can be auto-populated by entering the registration/plate number (make, model, year, VIN, mileage, fuel type, etc.).
- The advisor can select multiple services from a pre-defined service catalog (e.g., Oil Change, Brake Inspection, Wheel Alignment, Full Service, AC Repair, etc.).
- Ability to add ad-hoc services or customer complaints/notes.
- Parts required can be added from inventory with real-time stock availability check.
- Estimated cost and time for the service are calculated and displayed.
- Option to attach photos of the vehicle or damage.
- The job card is assigned to a specific bay/technician and given a unique job number.
- Customer is provided with a printed or digital (SMS/Email/WhatsApp) acknowledgment with job number and estimated completion time.

### **Additional Related User Stories (for context)**

1. **As a Customer**, I want to view the status of my vehicle service in real-time via SMS or a self-service portal, so I know when my car will be ready.

2. **As a Technician**, I want to update the job card with completed tasks, used parts, and labor hours, so the invoice is accurate and inventory is updated automatically.

3. **As a Cashier**, I want to generate a final invoice that includes labor, parts, taxes, and discounts, and accept multiple payment methods (cash, card, UPI, wallet), so I can close the job quickly.

4. **As a Service Station Manager**, I want real-time dashboards showing pending jobs, technician productivity, and daily revenue, so I can manage operations efficiently.
