import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button, Box, Typography, Alert } from '@mui/material'
import enhancedClientService from '@/services/enhancedClientService'

const TokenTest = () => {
  const { data: session } = useSession()
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testTokenInjection = async () => {
    setLoading(true)
    setTestResult(null)

    try {
      console.log('Testing token injection...')
      console.log('Session:', session)
      console.log('Access Token:', session?.accessToken)

      // Test with a simple API call
      const result = await enhancedClientService.getClients(
        session?.accessToken,
        {},
        {
          showToast: false,
          successMessage: null
        }
      )

      setTestResult({
        success: true,
        message: 'Token injection test successful!',
        data: result
      })
    } catch (error) {
      console.error('Token injection test failed:', error)
      setTestResult({
        success: false,
        message: `Token injection test failed: ${error.message}`,
        error: error
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h5' gutterBottom>
        Token Injection Test
      </Typography>

      <Typography variant='body1' sx={{ mb: 2 }}>
        This component tests whether the authentication token is properly injected into API calls.
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant='body2' color='text.secondary'>
          Session Status: {session ? 'Authenticated' : 'Not authenticated'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Access Token: {session?.accessToken ? 'Present' : 'Missing'}
        </Typography>
        {session?.accessToken && (
          <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
            Token: {session.accessToken.substring(0, 20)}...
          </Typography>
        )}
      </Box>

      <Button
        variant='contained'
        onClick={testTokenInjection}
        disabled={loading || !session?.accessToken}
        sx={{ mb: 2 }}
      >
        {loading ? 'Testing...' : 'Test Token Injection'}
      </Button>

      {testResult && (
        <Alert severity={testResult.success ? 'success' : 'error'} sx={{ mt: 2 }}>
          <Typography variant='body2'>{testResult.message}</Typography>
          {testResult.data && (
            <Typography variant='body2' sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
              Response: {JSON.stringify(testResult.data, null, 2)}
            </Typography>
          )}
        </Alert>
      )}
    </Box>
  )
}

export default TokenTest
