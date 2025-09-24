# Toast Notification System

A comprehensive toast notification system for the Crosspoint frontend application that provides consistent error handling and user feedback across all API operations.

## Features

- ✅ **Consistent Error Handling**: Standardized error message display across the application
- 🎨 **Multiple Toast Types**: Success, Error, Warning, and Info notifications
- 🔄 **API Integration**: Built-in support for API success/error handling
- ⏳ **Loading States**: Support for loading toasts during async operations
- 🎯 **Customizable**: Flexible configuration options for different use cases
- 📱 **Responsive**: Works well on all screen sizes
- 🌐 **RTL Support**: Supports right-to-left languages

## Quick Start

### 1. Basic Usage

```javascript
import { toastService } from '@/services/toastService'

// Success notification
toastService.showSuccess('Operation completed successfully!')

// Error notification
toastService.showError('Something went wrong!')

// Warning notification
toastService.showWarning('Please check your input!')

// Info notification
toastService.showInfo('Here is some information!')
```

### 2. API Error Handling

```javascript
import { toastService } from '@/services/toastService'

try {
  const response = await fetch('/api/data')
  const data = await response.json()

  if (!response.ok) {
    throw response // Pass the response object
  }

  // Handle success
} catch (error) {
  // Automatically handles API error parsing and displays appropriate toast
  await toastService.handleApiError(error, 'Failed to fetch data')
}
```

### 3. API Success Handling

```javascript
import { toastService } from '@/services/toastService'

// After successful API operation
toastService.handleApiSuccess('created', 'User') // "User created successfully!"
toastService.handleApiSuccess('updated', 'Invoice') // "Invoice updated successfully!"
toastService.handleApiSuccess('deleted', 'Client') // "Client deleted successfully!"
```

### 4. Async Operations with Loading

```javascript
import { toastService } from '@/services/toastService'

const apiCall = async () => {
  const response = await fetch('/api/data')
  return response.json()
}

try {
  const result = await toastService.handleAsyncOperation(apiCall, {
    loadingMessage: 'Processing your request...',
    successMessage: 'Operation completed successfully!',
    errorMessage: 'Operation failed',
    showLoading: true
  })
} catch (error) {
  // Error is automatically handled with toast
}
```

## Enhanced Service Integration

### Using Enhanced Client Service

```javascript
import enhancedClientService from '@/services/enhancedClientService'

// Create client with automatic toast notifications
const result = await enhancedClientService.createClient(clientData, {
  showToast: true,
  successMessage: 'Client created successfully!',
  errorMessage: 'Failed to create client',
  showLoading: true
})

// Update client
const result = await enhancedClientService.updateClient(clientId, clientData, {
  showToast: true,
  successMessage: 'Client updated successfully!',
  errorMessage: 'Failed to update client'
})

// Delete client
const result = await enhancedClientService.deleteClient(clientId, {
  showToast: true,
  successMessage: 'Client deleted successfully!',
  errorMessage: 'Failed to delete client'
})
```

## Custom Hook Integration

### Using useApiWithToast Hook

```javascript
import { useApiWithToast } from '@/hooks/useApiWithToast'

const MyComponent = () => {
  const { loading, error, execute } = useApiWithToast()

  const handleSubmit = async data => {
    await execute(() => apiService.createItem(data), {
      successMessage: 'Item created successfully!',
      errorMessage: 'Failed to create item',
      showSuccess: true,
      showError: true
    })
  }

  return <form onSubmit={handleSubmit}>{/* Your form content */}</form>
}
```

## Configuration Options

### Toast Service Options

```javascript
// Basic toast with custom options
toastService.showSuccess('Success!', {
  autoClose: 3000, // Auto close after 3 seconds
  position: 'top-center', // Position on screen
  hideProgressBar: true, // Hide progress bar
  closeOnClick: false, // Don't close on click
  pauseOnHover: false // Don't pause on hover
})

// API error with custom options
await toastService.handleApiError(error, 'Custom error message', {
  autoClose: 7000, // Longer duration for errors
  position: 'top-right' // Different position
})
```

### Enhanced Service Options

```javascript
// All enhanced service methods accept these options
const options = {
  showToast: true, // Enable/disable toast notifications
  successMessage: 'Custom success!', // Custom success message
  errorMessage: 'Custom error!', // Custom error message
  showLoading: true, // Show loading toast
  onSuccess: result => {
    // Success callback
    console.log('Success:', result)
  },
  onError: error => {
    // Error callback
    console.error('Error:', error)
  }
}
```

## Migration Guide

### Replacing Inline Error States

**Before (Old Pattern):**

```javascript
const [apiError, setApiError] = useState(null)
const [apiSuccess, setApiSuccess] = useState(false)

const handleSubmit = async data => {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setApiSuccess(true)
    } else {
      const errorData = await response.json()
      setApiError(errorData.message)
    }
  } catch (error) {
    setApiError('Network error')
  }
}

// In JSX
{
  apiError && <Alert severity='error'>{apiError}</Alert>
}
{
  apiSuccess && <Alert severity='success'>Success!</Alert>
}
```

**After (New Pattern):**

```javascript
import { toastService } from '@/services/toastService'

const handleSubmit = async data => {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (response.ok) {
      toastService.showSuccess('Data saved successfully!')
    } else {
      throw response // Let handleApiError handle it
    }
  } catch (error) {
    await toastService.handleApiError(error, 'Failed to save data')
  }
}

// No need for error/success state in JSX - toasts handle it!
```

## Backend API Response Structure

The toast system expects backend API responses to follow this structure:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    /* response data */
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "..." // Only in development
}
```

## Best Practices

1. **Use Enhanced Services**: Prefer using enhanced services over manual API calls for consistent error handling
2. **Consistent Messages**: Use consistent success/error messages across similar operations
3. **Appropriate Toast Types**: Use the right toast type for the situation (success, error, warning, info)
4. **Loading States**: Use loading toasts for operations that take more than 1 second
5. **Error Context**: Provide meaningful error messages that help users understand what went wrong
6. **Clean Up**: Remove old error state management when migrating to toast system

## Examples

See `frontend/src/examples/ToastExample.jsx` for a comprehensive example of all toast system features.

## Enhanced Error Handling

The toast system now includes enhanced error handling for common API issues:

### JSON Parsing Errors

- **"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"**: Automatically converted to user-friendly messages
- **HTML Error Pages**: Detected and handled gracefully
- **Network Errors**: Properly categorized and displayed

### HTTP Status Code Handling

- **404**: "The requested resource was not found. Please check your connection and try again."
- **500**: "Server error occurred. Please try again later."
- **401**: "Authentication failed. Please log in again."
- **403**: "You do not have permission to perform this action."
- **0**: "Network error. Please check your internet connection."

### Example Error Scenarios

```javascript
// Before: Raw error message
"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

// After: User-friendly message
"Server returned an invalid response. Please check your connection and try again."
```

## Troubleshooting

### Common Issues

1. **Toasts not showing**: Make sure `AppReactToastify` is included in your layout
2. **Error messages not parsed**: Ensure backend returns error messages in the expected format
3. **Loading toasts not working**: Check that `showLoading: true` is set in options
4. **JSON parsing errors**: The system now handles these automatically with user-friendly messages

### Debug Mode

Enable debug logging by adding this to your component:

```javascript
// Add this to see toast service debug info
console.log('Toast service:', toastService)
```

## API Client System

The application now uses a centralized API client system with automatic token handling:

### Axios Instance with Interceptors

```javascript
import apiClient from '@/services/apiClient'

// Automatic token injection
const response = await apiClient.get('/clients')
const data = await apiClient.post('/clients', clientData)
```

### Base Service Class

```javascript
import BaseService from '@/services/BaseService'

class ClientService extends BaseService {
  constructor() {
    super('/clients')
  }

  // Inherits: getAll, getById, create, update, delete, bulkDelete
}
```

### Service Factory

```javascript
import { services } from '@/services/ServiceFactory'

// Pre-configured services
const clients = services.clients
const invoices = services.invoices

// Or create custom services
const customService = ServiceFactory.create('/custom-endpoint')
```

### Automatic Token Management

- **Request Interceptor**: Automatically adds `Authorization: Bearer <token>` header
- **Response Interceptor**: Handles 401 errors by clearing tokens and redirecting to login
- **Error Handling**: Converts API errors to user-friendly messages

## Future Enhancements

- [ ] Toast persistence across page navigation
- [ ] Custom toast themes
- [ ] Toast grouping for similar messages
- [ ] Offline toast queue
- [ ] Toast analytics and tracking
