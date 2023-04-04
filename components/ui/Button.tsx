import React, { PropsWithChildren } from 'react'

export const Button: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <button className='pt-1.5 pb-1.5 pl-7 pr-7 rounded-md bg-main text-white'>
      { children }
    </button>
  )
}
