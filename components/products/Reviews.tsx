import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { IReview } from '../../interfaces/'

interface Props {
  stars: number
  quantity: number
  reviews: IReview[]
}

export const Reviews: React.FC<Props> = ({ stars, quantity, reviews }) => {
  return (
    <div className='flex gap-1 mb-2'>
      <span className='mr-1 text-sm text-[#444444] dark:text-neutral-400'>{(stars / quantity).toFixed(1)}</span>
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
      <span className='text-sm text-[#444444] dark:text-neutral-400'>({reviews?.length})</span>
    </div>
  )
}

export const NoReviews = () => {
  return (
    <div className='flex gap-1 mb-2'>
      <span className='mr-1 text-[#444444] text-[14px] dark:text-neutral-400'>0</span>
      <BsStar className='text-lg text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-lg text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-lg text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-lg text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-lg text-[#444444] dark:text-neutral-400' />
    </div>
  )
}
