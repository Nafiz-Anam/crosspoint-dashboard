// React Imports
import { useParams } from 'next/navigation'

// Config Imports
import { getDictionary } from '@/utils/getDictionary'

export const useTranslation = () => {
  const params = useParams()

  // Function to get translation string
  const t = key => {
    try {
      // Split the key by dots to access nested properties
      const keys = key.split('.')

      // Get the dictionary based on the current locale
      const locale = params?.lang || 'en'
      const dictionary = getDictionary(locale)

      // Traverse the dictionary using the keys
      let value = dictionary
      for (const k of keys) {
        value = value?.[k]
        if (!value) break
      }

      // Return the translation or the key if not found
      return value || key
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return { t }
}
