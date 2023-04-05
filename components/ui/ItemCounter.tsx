import React from 'react'

interface Props {
  currentValue: number
  maxValue: number
  updatedQuantity: (maxValue: number) => void
}

export const ItemCounter: React.FC<Props> = ({ currentValue, updatedQuantity, maxValue }) => {
  
  const addOrRemove = ( value: number ) => {
    if ( value === -1 ) {
      if ( currentValue === 1 ) return

      return updatedQuantity( currentValue - 1 )
    }

    if ( currentValue >= maxValue ) return

    updatedQuantity( currentValue + 1 )
  }
  
  return (
    <div className='border border-button w-fit flex rounded-md bg-white dark:bg-neutral-800'>
      <button className='pl-3 pr-3 text-button text-sm' onClick={ () => addOrRemove(-1) }>-</button>
      <span className='mt-auto mb-auto text-button w-4 text-center text-sm'>{ currentValue }</span>
      <button className='pl-3 pr-3 text-button text-sm' onClick={ () => addOrRemove(+1) }>+</button>
    </div>
  )
}
