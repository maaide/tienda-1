import React, { PropsWithChildren, useState, useEffect } from 'react'
import DesignContext from './DesignContext'
import axios from 'axios'
import { IDesign } from '@/interfaces'

const DesignProvider: React.FC<PropsWithChildren> = ({ children }) => {
  
  const [design, setDesign] = useState<IDesign>({
    header: {
      topStrip: ''
    },
    home: {
      banner: [{
        image: { public_id: '', url: '' },
        title: '',
        text: '',
        textButton: '',
        linkButton: ''
      }],
      category: {
        titleCategory: true,
        descriptionCategory: true
      },
      products: {
        title: '',
        sectionProducts: 'Todos los productos'
      }
    },
    product: {
      title: '',
      sectionProducts: 'Todos los productos'
    },
    contact: {
      title: 'CONTACTO',
      text: 'Para cualquier pregunta o consulta que tengas, no dudes en ponerte en contacto con nosotros a traves del siguiente formulario, desde el chat del sitio web o desde nuestras redes sociales.',
      titleForm: 'LLENA EL SIGUIENTE FORMULARIO'
    },
    shop: {
      title: '',
      description: ''
    },
    subscription: {
      title: ''
    },
    cart: {
      title: '',
      sectionProducts: ''
    }
  })
  const [load, setLoad] = useState(false)

  const getDesign = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    if (response.data) {
      setDesign(response.data)
      setLoad(true)
    }
  }

  useEffect(() => {
    getDesign()
  }, [])

  return (
    <DesignContext.Provider value={{
      design,
      setDesign,
      load
    }}>
      { children }
    </DesignContext.Provider>
  )
}

export default DesignProvider