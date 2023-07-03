import React, { PropsWithChildren, useState } from 'react'
import { Footer, Navbar, Subscribe } from '../ui'
import { useRouter } from 'next/router'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {

  const [menu, setMenu] = useState('w-0 pl-0 pr-0 pt-6 pb-6')
  const [index, setIndex] = useState('hidden')
  const router = useRouter()

  return (
    <>
      <Navbar menu={menu} setMenu={setMenu} setIndex={setIndex} index={index}>
        { children }
        {
          router.pathname !== '/finalizar-compra'
            ? <>
              <Subscribe />
              <Footer />
            </>
            : ''
        }
      </Navbar>
    </>
  )
}
