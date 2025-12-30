'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Component Imports
import BankAccountListTable from './BankAccountListTable'
import AddBankAccountDrawer from './AddBankAccountDrawer'
import EditBankAccountDrawer from './EditBankAccountDrawer'
import toastService from '@/services/toastService'
import apiClient from '@/services/apiClient'

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
    try {
      switch (action) {
        case 'edit':
          // Open edit drawer with bank account data
          setEditingBankAccount(data)
          setEditDrawerOpen(true)
          break

        case 'delete':
          await apiClient.delete(`/bank-accounts/${bankAccountId}`)
          // Trigger refresh after successful delete
          setRefreshTrigger(prev => prev + 1)
          break

        case 'update':
          await apiClient.patch(`/bank-accounts/${bankAccountId}`, data)
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
    try {
      await apiClient.post('/bank-accounts', bankAccountData)
      toastService.handleApiSuccess('created', 'Bank Account')
      setAddDrawerOpen(false)
      // Trigger refresh of the table data
      setRefreshTrigger(prev => prev + 1)
    } catch (err) {
      console.error('Error adding bank account:', err)
      await toastService.handleApiError(err, 'Failed to add bank account')
    }
  }

  // Handle edit bank account
  const handleEditBankAccount = async bankAccountData => {
    try {
      await apiClient.patch(`/bank-accounts/${editingBankAccount.id}`, bankAccountData)
      toastService.handleApiSuccess('updated', 'Bank Account')
      setEditDrawerOpen(false)
      setEditingBankAccount(null)
      // Trigger refresh of the table data
      setRefreshTrigger(prev => prev + 1)
    } catch (err) {
      console.error('Error editing bank account:', err)
      await toastService.handleApiError(err, 'Failed to update bank account')
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
