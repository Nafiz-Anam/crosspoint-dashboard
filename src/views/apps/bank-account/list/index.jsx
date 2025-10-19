'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Component Imports
import BankAccountListTable from './BankAccountListTable'
import AddBankAccountDrawer from './AddBankAccountDrawer'
import EditBankAccountDrawer from './EditBankAccountDrawer'
import toastService from '@/services/toastService'

const BankAccountList = () => {
  // States
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [editingBankAccount, setEditingBankAccount] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Hooks
  const { data: session, status } = useSession()

  // Handle bank account actions
  const handleBankAccountAction = async (action, bankAccountId, data = null) => {
    if (!session?.accessToken) {
      toastService.showError('Authentication required to perform this action.')
      return
    }

    try {
      switch (action) {
        case 'edit':
          // Open edit drawer with bank account data
          setEditingBankAccount(data)
          setEditDrawerOpen(true)
          break

        case 'delete':
          const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${bankAccountId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web',
              Authorization: `Bearer ${session.accessToken}`
            }
          })

          if (!deleteResponse.ok) {
            const errorData = await deleteResponse.json()
            throw new Error(errorData.message || 'Failed to delete bank account')
          }
          // Trigger refresh after successful delete
          setRefreshTrigger(prev => prev + 1)
          break

        case 'update':
          const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${bankAccountId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web',
              Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(data)
          })

          if (!updateResponse.ok) {
            const errorData = await updateResponse.json()
            throw new Error(errorData.message || 'Failed to update bank account')
          }
          // Trigger refresh after successful update
          setRefreshTrigger(prev => prev + 1)
          break
        default:
          break
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err)
      await toastService.handleApiError(err, `Failed to ${action} bank account`)
    }
  }

  // Handle add bank account
  const handleAddBankAccount = async bankAccountData => {
    if (!session?.accessToken) {
      toastService.showError('Authentication required to add bank account.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(bankAccountData)
      })

      if (response.ok) {
        toastService.handleApiSuccess('created', 'Bank Account')
        setAddDrawerOpen(false)
        // Trigger refresh of the table data
        setRefreshTrigger(prev => prev + 1)
      } else {
        await toastService.handleApiError(response, 'Failed to add bank account')
      }
    } catch (err) {
      console.error('Error adding bank account:', err)
      await toastService.handleApiError(err, 'Network error or unexpected issue. Please try again.')
    }
  }

  // Handle edit bank account
  const handleEditBankAccount = async bankAccountData => {
    if (!session?.accessToken) {
      toastService.showError('Authentication required to edit bank account.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${editingBankAccount.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(bankAccountData)
      })

      if (response.ok) {
        toastService.handleApiSuccess('updated', 'Bank Account')
        setEditDrawerOpen(false)
        setEditingBankAccount(null)
        // Trigger refresh of the table data
        setRefreshTrigger(prev => prev + 1)
      } else {
        await toastService.handleApiError(response, 'Failed to update bank account')
      }
    } catch (err) {
      console.error('Error editing bank account:', err)
      await toastService.handleApiError(err, 'Network error or unexpected issue. Please try again.')
    }
  }

  return (
    <Grid container spacing={6}>
      {/* Bank Account List Table */}
      <Grid size={{ xs: 12 }}>
        <BankAccountListTable
          onBankAccountAction={handleBankAccountAction}
          onAddBankAccount={() => setAddDrawerOpen(true)}
          refreshTrigger={refreshTrigger}
        />
      </Grid>

      {/* Add Bank Account Drawer */}
      <AddBankAccountDrawer open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} onAdd={handleAddBankAccount} />

      {/* Edit Bank Account Drawer */}
      <EditBankAccountDrawer
        open={editDrawerOpen}
        onClose={() => {
          setEditDrawerOpen(false)
          setEditingBankAccount(null)
        }}
        onEdit={handleEditBankAccount}
        bankAccount={editingBankAccount}
      />
    </Grid>
  )
}

export default BankAccountList
