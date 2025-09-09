// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
const BankAccountList = dynamic(() => import('@views/apps/bank-account/list'))

const BankAccountListPage = () => {
  return <BankAccountList />
}

export default BankAccountListPage

