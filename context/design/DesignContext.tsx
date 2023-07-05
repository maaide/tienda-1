import { IDesign } from '@/interfaces'
import { createContext } from 'react'

interface ContextProps {
    design: IDesign,
    setDesign: any
}

const DesignContext = createContext({} as ContextProps)

export default DesignContext