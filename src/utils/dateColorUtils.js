/**
 * Utility functions for date color coding
 */

/**
 * Determines the color for a due date based on time remaining
 * @param {string|Date} dueDate - The due date
 * @returns {string} - The color class or style
 */
export const getDueDateColor = dueDate => {
  if (!dueDate) return 'text.primary'

  try {
    const due = new Date(dueDate)
    const now = new Date()
    const diffInHours = (due - now) / (1000 * 60 * 60)

    // Red if 24 hours or less remaining
    if (diffInHours <= 24) {
      return 'error.main'
    }

    // Orange if 48 hours or less remaining
    if (diffInHours <= 48) {
      return 'warning.main'
    }

    // Default color for more than 48 hours
    return 'text.primary'
  } catch (error) {
    console.error('Error calculating due date color:', error)
    return 'text.primary'
  }
}

/**
 * Determines the color for a due date based on time remaining (for MUI Typography color prop)
 * @param {string|Date} dueDate - The due date
 * @returns {string} - The color value for MUI Typography
 */
export const getDueDateTypographyColor = dueDate => {
  if (!dueDate) return 'text.primary'

  try {
    const due = new Date(dueDate)
    const now = new Date()
    const diffInHours = (due - now) / (1000 * 60 * 60)

    // Red if 24 hours or less remaining
    if (diffInHours <= 24) {
      return 'error.main'
    }

    // Orange if 48 hours or less remaining
    if (diffInHours <= 48) {
      return 'warning.main'
    }

    // Default color for more than 48 hours
    return 'text.primary'
  } catch (error) {
    console.error('Error calculating due date color:', error)
    return 'text.primary'
  }
}

/**
 * Determines if a due date is overdue
 * @param {string|Date} dueDate - The due date
 * @returns {boolean} - True if overdue
 */
export const isOverdue = dueDate => {
  if (!dueDate) return false

  try {
    const due = new Date(dueDate)
    const now = new Date()
    return due < now
  } catch (error) {
    console.error('Error checking if overdue:', error)
    return false
  }
}

/**
 * Gets the time remaining text for a due date
 * @param {string|Date} dueDate - The due date
 * @returns {string} - Human readable time remaining
 */
export const getTimeRemaining = dueDate => {
  if (!dueDate) return ''

  try {
    // Ensure we have a valid date
    const due = new Date(dueDate)
    if (isNaN(due.getTime())) {
      console.error('Invalid due date:', dueDate)
      return ''
    }

    const now = new Date()

    // Normalize dates to UTC to avoid timezone issues
    const dueUTC = new Date(due.getUTCFullYear(), due.getUTCMonth(), due.getUTCDate())
    const nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())

    // Calculate difference in days
    const diffInDays = Math.floor((dueUTC - nowUTC) / (1000 * 60 * 60 * 24))

    // Calculate difference in hours for more precise calculations
    const diffInHours = (due - now) / (1000 * 60 * 60)

    // If overdue (negative days)
    if (diffInDays < 0) {
      const overdueDays = Math.abs(diffInDays)
      const overdueHours = Math.abs(diffInHours)

      // If overdue less than 24 hours, show hours
      if (overdueHours < 24) {
        return `${Math.round(overdueHours)}h overdue`
      }
      // If overdue 24+ hours, show days
      else {
        if (overdueDays === 1) {
          return '1d overdue'
        } else {
          return `${overdueDays}d overdue`
        }
      }
    }

    // If due today
    if (diffInDays === 0) {
      if (diffInHours < 0) {
        // Overdue today
        const overdueHours = Math.abs(diffInHours)
        if (overdueHours < 1) {
          return 'Due soon'
        } else {
          return `${Math.round(overdueHours)}h overdue`
        }
      } else if (diffInHours < 1) {
        return 'Due soon'
      } else {
        return `${Math.round(diffInHours)}h remaining`
      }
    }

    // If due tomorrow
    if (diffInDays === 1) {
      return '1d remaining'
    }

    // If due within 2 days (48 hours)
    if (diffInDays === 2) {
      return '2d remaining'
    }

    // More than 2 days - don't show time remaining for better UX
    return ''
  } catch (error) {
    console.error('Error calculating time remaining:', error)
    return ''
  }
}

/**
 * Determines the color for a due date based on invoice status and time remaining
 * @param {string|Date} dueDate - The due date
 * @param {string} status - The invoice status (PAID, UNPAID, OVERDUE, CANCELLED)
 * @returns {string} - The color value for MUI Typography
 */
export const getInvoiceDueDateColor = (dueDate, status) => {
  if (!dueDate) return 'text.primary'

  // Normalize status to uppercase for comparison
  const normalizedStatus = status?.toString().toUpperCase()

  // If invoice is paid or cancelled, use default color regardless of date
  if (normalizedStatus === 'PAID' || normalizedStatus === 'CANCELLED') {
    return 'text.primary'
  }

  // For unpaid and overdue invoices, use the time-based color logic
  try {
    const due = new Date(dueDate)
    const now = new Date()
    const diffInHours = (due - now) / (1000 * 60 * 60)

    // Red if 24 hours or less remaining
    if (diffInHours <= 24) {
      return 'error.main'
    }

    // Orange if 48 hours or less remaining
    if (diffInHours <= 48) {
      return 'warning.main'
    }

    // Default color for more than 48 hours
    return 'text.primary'
  } catch (error) {
    console.error('Error calculating invoice due date color:', error)
    return 'text.primary'
  }
}

/**
 * Determines the color for a due date based on task status and time remaining
 * @param {string|Date} dueDate - The due date
 * @param {string} status - The task status (PENDING, IN_PROGRESS, COMPLETED, CANCELLED, ON_HOLD)
 * @returns {string} - The color value for MUI Typography
 */
export const getTaskDueDateColor = (dueDate, status) => {
  if (!dueDate) return 'text.primary'

  // Normalize status to uppercase for comparison
  const normalizedStatus = status?.toString().toUpperCase()

  // If task is completed or cancelled, use default color regardless of date
  if (normalizedStatus === 'COMPLETED' || normalizedStatus === 'CANCELLED') {
    return 'text.primary'
  }

  // For pending, in_progress, and on_hold tasks, use the time-based color logic
  try {
    const due = new Date(dueDate)
    const now = new Date()
    const diffInHours = (due - now) / (1000 * 60 * 60)

    // Red if 24 hours or less remaining
    if (diffInHours <= 24) {
      return 'error.main'
    }

    // Orange if 48 hours or less remaining
    if (diffInHours <= 48) {
      return 'warning.main'
    }

    // Default color for more than 48 hours
    return 'text.primary'
  } catch (error) {
    console.error('Error calculating task due date color:', error)
    return 'text.primary'
  }
}

/**
 * Gets time remaining text for invoices based on status
 * @param {string|Date} dueDate - The due date
 * @param {string} status - The invoice status
 * @returns {string} - Human readable time remaining or empty string
 */
export const getInvoiceTimeRemaining = (dueDate, status) => {
  if (!dueDate) return ''

  // Normalize status to uppercase for comparison
  const normalizedStatus = status?.toString().toUpperCase()

  // If invoice is paid or cancelled, don't show time remaining
  if (normalizedStatus === 'PAID' || normalizedStatus === 'CANCELLED') {
    return ''
  }

  // For unpaid and overdue invoices, show time remaining
  return getTimeRemaining(dueDate)
}

/**
 * Gets time remaining text for tasks based on status
 * @param {string|Date} dueDate - The due date
 * @param {string} status - The task status
 * @returns {string} - Human readable time remaining or empty string
 */
export const getTaskTimeRemaining = (dueDate, status) => {
  if (!dueDate) return ''

  // Normalize status to uppercase for comparison
  const normalizedStatus = status?.toString().toUpperCase()

  // If task is completed or cancelled, don't show time remaining
  if (normalizedStatus === 'COMPLETED' || normalizedStatus === 'CANCELLED') {
    return ''
  }

  // For pending, in_progress, and on_hold tasks, show time remaining
  return getTimeRemaining(dueDate)
}
