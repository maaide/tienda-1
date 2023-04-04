import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { IProduct } from '../../interfaces/'

interface Props {
  stars: number
  quantity: number
  product: IProduct
}

export const ReviewsProductCard: React.FC<Props> = ({ stars, quantity, product }) => {
  return (
    <div className='flex gap-1 mt-2'>
      <span className='mr-1 font-light'>{(stars / quantity).toFixed(1)}</span>
      {stars / quantity === 0
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 0.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 1
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 1.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 2
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 2.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 3
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 3.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars / quantity === 4
        ? <BsStar className='text-lg text-yellow-400' />
        : stars / quantity <= 4.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      <span className='font-light'>({product.reviews?.length})</span>
    </div>
  )
}

export const NoReviewsProductCard = () => {
  return (
    <div className='flex gap-1 mt-2'>
      <span className='mr-1'>0</span>
      <BsStar className='text-lg' />
      <BsStar className='text-lg' />
      <BsStar className='text-lg' />
      <BsStar className='text-lg' />
      <BsStar className='text-lg' />
    </div>
  )
}
