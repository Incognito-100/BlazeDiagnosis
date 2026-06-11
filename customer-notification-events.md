# Task 4: Identify which status changes should create customer notifications.

## Customer Notification Status Events

### Overview
The Blaze Diagnostics system should notify customers when important job status changes occur during the repair process. Notifications help customers stay informed about vehicle progress without needing to contact the workshop directly.

------------------------------------------------

### Recommended Customer Notification Events
1. Vehicle Booked In

# Reason
The customer should receive confirmation that the vehicle has been successfully checked into the workshop.

# Example Notification
"Your vehicle has been booked into the workshop and inspection will begin shortly"

2. Inspection Started

# Reason
The customer should know that mechanics have started assessing the vehicle.

# Example Notification
"Inspection of your vehicle has started."

3. Quote Ready / Awaiting Approval

# Reason
The customer must be informed that approval is required before repairs continue.

# Example Notification
"A repair quote is ready for your review and approval."

4. Quote Approved

# Reason
The customer should receive confirmation that the workshop received approval.

# Example Notification
"Thank you for approving your quote, work will continue."

5. Parts Ordered

# Reason
The customer should know that required parts have been ordered.

# Example Notification
"Required vehicle parts have been ordered."

6. Parts Received

# Reason
The customer should know that repairs can continue once parts arrive.

# Example Notification
"Required vehicle parts have been received."

7. Repair In Progress

# Reason
The customer should receive confirmation that repair work has officially started. 

# Example Notification
"Repairs on your vehicle are currently in progress."

8. Quality Check 

# Reason
The customer should know the vehicle is undergoing final inspection before collection.

# Example Notification
"Your vehicle is currently undergoing final quality checks."

9. Ready for Collection

# Reason
This is one of the most important customer notifications.

# Example Notification
"Your vehicle is reading for collection."

10. Job Completed

# Reason
The customer should receive final confirmation that the job has been completed successfully. 

# Example Notification
"Your vehicle service and repairs have been completed successfully."

 -------------------
# Additional Notes
  * Notifications should only be sent to the customer linked to the job card.
  * Notifications should use clear and professional wording.
  * Important notifications should include vehicle details and timestamps where applicable.
  * Notification history should be stored for reference.

