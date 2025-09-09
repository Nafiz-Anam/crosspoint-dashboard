// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
const AddBankAccount = dynamic(() => import('@views/apps/bank-account/add'))

const AddBankAccountPage = () => {
  return <AddBankAccount />
}

export default AddBankAccountPage

