Status Workflow Review


## 1. Request Lifecycle
A job status update is processed through five layers. Each layer has a single responsibility.
[HTTP PATCH Request]
        │
        ▼
┌───────────────────┐
│   jobs.routes     │  ──►  Catches '/api/jobs/:id/status'
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  jobs.controller  │  ──►  Extracts params & payload, calls Service layer
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  jobs.validators  │  ──►  Runs validateUpdateJobStatusInput to check types/enums
└───────────────────┘
        │
        ▼
┌───────────────────┐
│   jobs.service    │  ──►  Enforces Finite State Machine (FSM) guard transition rules
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  jobs.repository  │  ──►  Mutates state in memory & appends JobStatusHistory trail
└───────────────────┘


## Layer responsibilities:

Routing (jobs.routes.ts): Catches PATCH /api/jobs/:id/status.
Controller (jobs.controller.ts): Calls updateStatus(jobId, payload).
Validator (jobs.validators.ts): Executes validateUpdateJobStatusInput(payload), asserting types and verifying the status exists in the JOB_STATUSES configuration array.
Service (jobs.service.ts): Enforces Finite State Machine (FSM) business logic rules to prevent illegal status transitions.
Repository (jobs.repository.ts): Commits the state change to db.jobs and appends a history trail tracking record into db.jobStatusHistory.


## 2. Finite State Machine 
To protect data integrity, job records cannot jump statuses arbitrarily. The following state machine rules must be enforced programmatically within the Service Layer:
From StatusAllowed To StatusesBusiness Context / TriggerDRAFTIN_PROGRESSTechnician claims the job card and begins diagnostic work.IN_PROGRESSWAITING_FOR_PARTS, COMPLETEDCar is held waiting for inventory, or work is fully wrapped up.WAITING_FOR_PARTSIN_PROGRESS, COMPLETEDParts arrive; vehicle returns to the active bay or finishes.COMPLETEDNone (Terminal State)The job is locked down. Invoicing module triggers from here.

## 3. Implementation Draft
Business Logic Enforcer (jobs.service.ts)
To implement the transition matrix without breaking the existing repository infrastructure, update the updateStatus method to validate the state transition before writing changes:
typescript// Define explicit state machine transitions
const ALLOWED_STATUS_TRANSITIONS: Record<string, string[]> = {
  'DRAFT': ['IN_PROGRESS'],
  'IN_PROGRESS': ['WAITING_FOR_PARTS', 'COMPLETED'],
  'WAITING_FOR_PARTS': ['IN_PROGRESS', 'COMPLETED'],
  'COMPLETED': [] // Terminal state
};

updateStatus(jobId: string, input: UpdateJobStatusDto) {
  const currentJob = this.repository.findById(jobId);
  if (!currentJob) {
    throw new Error('Job not found.');
  }

  const previousStatus = currentJob.status;
  const targetStatus = input.status;

  // Enforce FSM guard clause
  const allowedTransitions = ALLOWED_STATUS_TRANSITIONS[previousStatus] || [];
  if (!allowedTransitions.includes(targetStatus)) {
    throw new Error(
      `Invalid workflow transition: Cannot move job status from [${previousStatus}] to [${targetStatus}].`
    );
  }

  // Proceed with current codebase update logic
  const updatedJob = this.repository.update(jobId, { status: targetStatus });

  this.repository.addStatusHistory({
    id: nextEntityId('jsh'),
    jobId,
    fromStatus: previousStatus,
    toStatus: targetStatus,
    changedByUserId: input.changedByUserId,
    createdAt: new Date(),
  });

  return {
    ...updatedJob,
    statusHistory: this.repository.listStatusHistory(jobId),
  };
}

## 4. Architectural Questions 
State Machine Rigidity  
Should DRAFT → COMPLETED be allowed for express services (e.g., oil change)?

Read‑Only Lockout  
Once COMPLETED, should generic updates via PUT/PATCH be blocked at repository level?

External Module Coupling  
On COMPLETED, should JobsService:

Directly call InvoicesService.createFromJobCard()?

Or emit an event to keep modules decoupled?