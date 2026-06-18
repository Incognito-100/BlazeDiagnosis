## Pod Name
Pod 3 – Job Cards & Workshop Board

## Members Active Today
- Tyrique Prince 
- Franco van Rooyen

## Issues Worked On
- Reviewed `job_cards` schema and related tables (`job_status_events`, `job_notes`).  
- Checked enums for internal vs. customer statuses.  
- Planned Job Card Creation Form inputs and flow.

## Completed Today
- Schema review completed.  
- Status flow documented.  
- Draft plan for Job Card Creation Page prepared.

## In Progress
- Workshop Board layout planning (job number, customer, vehicle, status badge, timeline, notes).  
- Mapping integration points with notifications and audit logs.

## Blocked
- None today.  


## Pull Requests Opened
- None (planning day only).

## Pull Requests Needing Review
- None.

## Questions for Ben


## Plan for Tomorrow
- Implement Job Card Creation Form component (`apps/web/src/components/forms/job-card-form.tsx`).  
- Connect backend service (`apps/web/src/features/job-cards/services/jobs.ts`) to insert job cards via `db`.  
- Test insertion with default statuses and audit log entry.  
- Begin Workshop Board skeleton (layout + status badge + empty state).
