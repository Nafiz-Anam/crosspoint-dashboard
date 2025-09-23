# Clock Out Note Feature

## Overview

The Clock Out Note feature requires employees to provide a work summary when clocking out. This helps track daily accomplishments and provides valuable data for reporting and performance tracking.

## Features

### ClockOutNoteDialog Component

- **Location**: `frontend/src/components/ClockOutNoteDialog.jsx`
- **Purpose**: Modal dialog that appears when user clicks "Clock Out"
- **Validation**:
  - Minimum 10 characters required
  - Must contain at least 2 words
  - Maximum 500 characters
  - Real-time character count display

### Updated ClockInOutCard Component

- **Location**: `frontend/src/views/dashboards/main/ClockInOutCard.jsx`
- **Changes**:
  - Clock in works as before (no note required)
  - Clock out now shows note dialog first
  - Note is passed to backend API
  - Loading states for both operations

### Backend Integration

- **API Endpoint**: `POST /attendance/check-out`
- **Request Body**: `{ "notes": "work summary text" }`
- **Validation**: 500 character limit (backend validation)
- **Storage**: Notes stored in `attendances.notes` field

## User Experience

1. **Clock In**: Works normally, no changes
2. **Clock Out**:
   - Click "Clock Out" button
   - Note dialog appears with current timestamp
   - User must enter meaningful work summary
   - Validation prevents empty or too-short notes
   - Submit button disabled until valid note entered
   - Loading state during submission

## Data Flow

```
User clicks "Clock Out"
→ ClockOutNoteDialog opens
→ User enters work summary
→ Validation checks note quality
→ Note sent to backend API
→ Backend stores in database
→ User status updated to "clocked out"
→ Dialog closes
```

## Database Schema

The `attendances` table already includes a `notes` field:

```sql
notes String? // Additional notes (late arrival, early departure, etc.)
```

## Benefits

1. **Daily Work Tracking**: Employees document their daily accomplishments
2. **Performance Review**: Managers can review work summaries
3. **Reporting**: Data can be used for timesheet and productivity reports
4. **Accountability**: Encourages employees to reflect on their work
5. **Historical Data**: Builds a record of daily activities over time

## Technical Notes

- Frontend validation prevents API calls with invalid data
- Backend validation provides additional security
- Character limit prevents database bloat
- Loading states prevent double-submissions
- Error handling provides user feedback
