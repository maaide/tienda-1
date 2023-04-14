import React, { useState } from 'react'
import { ICartProduct, IProductsOffer } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { Button2AddToCart } from '../ui'

interface Props {
  offer: IProductsOffer
}

export const ProductOffer: React.FC<Props> = ({ offer }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    name: offer.productsSale[0].name,
    image: offer.productsSale[0].image,
    price: offer.price,
    beforePrice: offer.productsSale[0].beforePrice,
    slug: offer.productsSale[0].slug,
    variation: offer.productsSale[0].variations?.length ? offer.productsSale[0].variations[0] : undefined,
    quantity: 1,
    category: offer.productsSale[0].category
  })

  const productChange = (e: any) => {
    offer.productsSale.map(product => {
      if (product.name === e.target.value) {
        setTempCartProduct({...tempCartProduct,
          name: product.name,
          image: product.image,
          beforePrice: product.beforePrice,
          slug: product.slug,
          variation: product.variations?.length ? product.variations[0] : undefined
        })
      }
    })
  }

  const variationChange = (e: any) => {
    const product = offer.productsSale.find(product => product.name === e.target.name)
    const variation = product?.variations?.find(variation => variation.variation === e.target.value)
    setTempCartProduct({...tempCartProduct,
      variation: variation
    })
  }

  return (
    <div className='flex mb-2'>
      {
        tempCartProduct.variation
          ? <img className='w-24 h-24 mr-1 mt-auto mb-auto mobile2:w-28 mobile2:h-28 mobile:w-32 mobile:mr-2 mobile:h-32' src={tempCartProduct.variation.image} />
          : <img className='w-24 h-24 mr-1 mt-auto mb-auto mobile2:w-28 mobile2:h-28 mobile:w-32 mobile:mr-2 mobile:h-32' src={tempCartProduct.image} />
      }
      <div className='mt-auto mb-auto'>
        {
          offer.productsSale.length === 1
            ? <span className='text-main dark:text-white'>{tempCartProduct.name}</span>
            : <select onChange={productChange} className='text-sm p-1 border text-main rounded-md focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-500 dark:text-white'>
              {
                offer.productsSale.map(product => <option key={product.slug}>{product.name}</option>)
              }
            </select>
        }
        <div className='flex gap-2'>
          <span className='text-main dark:text-white'>${NumberFormat(tempCartProduct.price)}</span>
          <span className='text-sm line-through text-[#444444] dark:text-neutral-400'>${NumberFormat(tempCartProduct.beforePrice!)}</span>
        </div>
        {
          tempCartProduct.variation !== undefined
            ? <select className='text-sm p-1 border rounded-md text-main block mb-1 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-500 dark:text-white' name={tempCartProduct.name} onChange={variationChange}>
              {
                offer.productsSale.map(product => {
                  if (tempCartProduct.name === product.name) {
                    return product.variations?.map(variation => <option key={variation.variation}>{variation.variation}</option>)
                  }
                  return null
                })
              }
            </select>
            : ''
        }
        <Button2AddToCart tempCartProduct={tempCartProduct} />
      </div>
    </div>
  )
}
