import React, { useMemo, useState } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { NumberFormat } from '../../utils'
import { ReviewsProductCard } from '.'
import { Button2AddToCart } from '../ui'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface Props {
  product: IProduct
}

export const ProductCard2: React.FC<Props> = ({ product }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    name: product.name,
    image: product.images[0],
    price: product.price,
    beforePrice: product.beforePrice,
    slug: product.slug,
    quantity: 1,
    stock: product.stock,
    category: product.category
  })
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const router = useRouter()

  const productImage = useMemo(() => {
    if (product.images[1]) {
      return isHovered
      ? product.images[1]
      : product.images[0]
    } else {
      return product.images[0]
    }
  }, [isHovered, product.images])

  let stars = 0
  let quantity = 0

  return (
    <div className='inline-block p-2 m-auto w-40 450:w-52 580:w-64'>
      <img
        src={ productImage } alt={ productImage }
        onLoad={ () => setIsImageLoaded(true) }
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
        className='m-auto cursor-pointer w-40 450:w-44 580:w-52'
        style={{ borderRadius: '8px' }}
        onClick={() => router.push(`/productos/${product.slug}`)}
      />
      <div style={{ display: isImageLoaded ? 'block' : 'none' }}>
        {
          product.reviews?.length
            ? product.reviews.map(review => {
              stars = stars + review.calification
              quantity = quantity + 1
              return null
            })
            : ''
        }
        {
          product.reviews?.length
            ? <ReviewsProductCard product={product} quantity={quantity} stars={stars} />
            : <div className='w-1 h-2' />
        }
        <Link href={`/productos/${product.slug}`} className='font-light cursor-pointer'>{ product.name }</Link>
        <div className='flex gap-2 mt-1 mb-1'>
          <span className='font-semibold'>${ NumberFormat(product.price) }</span>
          {
            product.beforePrice
              ? <span className='text-sm line-through font-light'>${ NumberFormat(product.beforePrice) }</span>
              : ''
          }
        </div>
        {
          product.variations?.length
            ? product.variations[0].variation !== ''
              ? <Link href={`/productos/${product.slug}`} className='pt-1.5 pb-1.5 text-sm rounded-md bg-button text-white pl-6 pr-6 450:pl-8 450:pr-8'>Ver variantes</Link>
              : <Button2AddToCart tempCartProduct={tempCartProduct} />
            : <Button2AddToCart tempCartProduct={tempCartProduct} />
        }
      </div>
    </div>
  )
}