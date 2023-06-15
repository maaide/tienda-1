import React from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { ButtonAddToCart, ButtonNone, ItemCounter } from '../ui'

interface Props {
  product: IProduct,
  tempCartProduct: ICartProduct,
  setTempCartProduct: any
}

export const ProductDetails: React.FC<Props> = ({ product, tempCartProduct, setTempCartProduct }) => {

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( (currentProduct: any) => ({
      ...currentProduct,
      quantity
    }))
  }

  const selectVariation = (e: any) => {
    const variation = product.variations?.find(variation => variation.variation === e.target.value)
    setTempCartProduct({...tempCartProduct, variation: variation})
  }

  return (
      <div className='m-auto p-4 block bg-white shadow-det rounded-md gap-2 w-1200 justify-around dark:bg-neutral-900 dark:border dark:border-neutral-800 sm:flex'>
        <div className='flex mb-2 justify-around gap-2 sm:mb-0'>
          <img className='w-20 h-20 mt-auto mb-auto' src={product.images[0]} />
          <div className='mt-auto mb-auto'>
            <h3>{product.name}</h3>
            <div className='flex gap-1'>
              <span className='font-medium'>${NumberFormat(product.price)}</span>
              {
                product.beforePrice
                  ? <span className='line-through text-sm'>${NumberFormat(product.beforePrice)}</span>
                  : ''
              }
            </div>
            {
              product.variations?.length
                ? product.variations[0].variation !== ''
                  ? <select onChange={selectVariation} value={tempCartProduct.variation?.variation ? tempCartProduct.variation.variation : 'Seleccionar variación'} className='border p-1 rounded-md focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                    <option>Seleccionar vartiación</option>
                    {
                      product.variations.map(variation => (
                        <option key={variation.variation}>{variation.variation}</option>
                      ))
                    }
                  </select>
                  : ''
                : ''
              }
          </div>
        </div>
        {
          product.stock === 0
            ? (
              <div className='flex'>
                <div className='m-auto flex flex-col'>
                  <p className='mb-2 text-sm'>Deja tu correo para avisarte cuando tengamos este producto nuevamente en stock</p>
                  <div className='flex gap-2 m-auto'>
                    <input type='text' placeholder='Correo' className='p-2 text-sm w-64 rounded border focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                    <button className='pt-1.5 pb-1.5 h-fit mt-auto mb-auto pl-7 pr-7 rounded-md bg-button text-white'>Enviar</button>
                  </div>
                </div>
              </div>
            )
            : (
              <div className='flex'>
                <div className='flex m-auto justify-around gap-2 h-fit'>
                  <ItemCounter
                    currentValue={ tempCartProduct.quantity }
                    updatedQuantity={ onUpdateQuantity }
                    maxValue={ product.stock }
                  />
                  {
                    product.variations?.length
                      ? product.variations[0].variation !== ''
                        ? tempCartProduct.variation
                          ? <ButtonAddToCart tempCartProduct={tempCartProduct} />
                          : <ButtonNone>Añadir al carrito</ButtonNone>
                        : <ButtonAddToCart tempCartProduct={tempCartProduct} />
                      : <ButtonAddToCart tempCartProduct={tempCartProduct} />
                  }
                </div>
              </div>
            )
        }
      </div>
  )
}
