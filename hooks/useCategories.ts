import useSWR, { SWRConfiguration } from 'swr'
import { ICategory } from '../interfaces'

export const useCategories = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<ICategory[]>(`https://server-production-e234.up.railway.app${ url }`, config )

  return {
    categories: data || [],
    isLoadingCategories: !error && !data,
    isError: error
  }

}