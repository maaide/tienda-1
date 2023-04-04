import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { IReview } from '../../interfaces/'

interface Props {
  stars: number
}

export const Review: React.FC<Props> = ({ stars }) => {
  return (
    <div className='flex gap-1'>
      <span className='mr-1 font-light'>{(stars).toFixed(1)}</span>
      {stars === 0
        ? <BsStar className='text-lg text-yellow-400' />
        : stars <= 0.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars === 1
        ? <BsStar className='text-lg text-yellow-400' />
        : stars <= 1.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars === 2
        ? <BsStar className='text-lg text-yellow-400' />
        : stars <= 2.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars === 3
        ? <BsStar className='text-lg text-yellow-400' />
        : stars <= 3.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
      {stars === 4
        ? <BsStar className='text-lg text-yellow-400' />
        : stars <= 4.9
          ? <BsStarHalf className='text-lg text-yellow-400' />
          : <BsStarFill className='text-lg text-yellow-400' />}
    </div>
  )
}
