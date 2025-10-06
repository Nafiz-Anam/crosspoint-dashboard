// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
const AddBankAccount = dynamic(() => import('@views/apps/bank-account/add'))

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const AddBankAccountPage = () => {
  return <AddBankAccount />
}

export default AddBankAccountPage
