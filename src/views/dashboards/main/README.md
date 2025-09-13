# Main Dashboard Components

This directory contains the main dashboard components that match the design shown in the image.

## Components

### ClockInOutCard
- Displays current clock in/out status
- Shows clock in time when active
- Toggle button to clock in/out
- Color-coded status (green for clocked in, red for clocked out)

### TaskStatisticsCard
- Shows task statistics for the logged-in user
- Displays pending, completed, and cancelled task counts
- Color-coded icons for each status

### TimesheetChart
- Line chart showing clocked-in hours for the current month
- Interactive tooltips showing hours per day
- Responsive design with proper scaling

### ProjectsOverview
- Shows project status with chips (Open, Completed, Hold)
- Progress bar showing overall progression
- Reminder information

### AllTasksOverview
- Donut chart showing task distribution by status
- Legend with color-coded task statuses
- Total task count in the center

### TicketStatus
- Shows ticket counts by status (New, Open, Closed)
- Line chart showing new tickets over last 30 days
- Color-coded status indicators

## Usage

These components are used in the main dashboard page at `frontend/src/app/[lang]/(dashboard)/(private)/page.jsx`.

The dashboard layout follows the design from the provided image with:
- Top row: Clock in/out, task statistics, events, and clients
- Middle row: Projects, tasks, and tickets overview
- Bottom row: Timesheet chart spanning full width
