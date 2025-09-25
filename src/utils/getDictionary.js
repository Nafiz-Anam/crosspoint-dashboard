// Dictionary imports
import enDictionary from '@/data/dictionaries/en.json'
import itDictionary from '@/data/dictionaries/it.json'

const dictionaries = {
  en: enDictionary,
  it: itDictionary
}

export const getDictionary = locale => {
  return dictionaries[locale] || dictionaries.en
}
