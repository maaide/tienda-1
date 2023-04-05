import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { IReview } from '../../interfaces'
import { Review } from './'

interface Props {
  stars: number
  quantity: number
  reviews: IReview[]
}

export const ReviewsProduct: React.FC<Props> = ({ stars, quantity, reviews }) => {
  return (
    <>
      <div className='flex gap-1 mb-1'>
        <span className='mr-1 font-light'>{(stars / quantity).toFixed(1)}</span>
        {stars / quantity === 0
          ? <BsStar className='text-xl text-yellow-400' />
          : stars / quantity <= 0.9
            ? <BsStarHalf className='text-xl text-yellow-400' />
            : <BsStarFill className='text-xl text-yellow-400' />}
        {stars / quantity === 1
          ? <BsStar className='text-xl text-yellow-400' />
          : stars / quantity <= 1.9
            ? <BsStarHalf className='text-xl text-yellow-400' />
            : <BsStarFill className='text-xl text-yellow-400' />}
        {stars / quantity === 2
          ? <BsStar className='text-xl text-yellow-400' />
          : stars / quantity <= 2.9
            ? <BsStarHalf className='text-xl text-yellow-400' />
            : <BsStarFill className='text-xl text-yellow-400' />}
        {stars / quantity === 3
          ? <BsStar className='text-xl text-yellow-400' />
          : stars / quantity <= 3.9
            ? <BsStarHalf className='text-xl text-yellow-400' />
            : <BsStarFill className='text-xl text-yellow-400' />}
        {stars / quantity === 4
          ? <BsStar className='text-xl text-yellow-400' />
          : stars / quantity <= 4.9
            ? <BsStarHalf className='text-xl text-yellow-400' />
            : <BsStarFill className='text-xl text-yellow-400' />}
      </div>
      <div>
        <div className='mb-2'>
          <span className='font-light text-[#444444] dark:text-neutral-400'>{reviews.length} {reviews.length === 1 ? 'calificación' : 'calificaciones'}</span>
        </div>
        {
          reviews.map(review => {
            const date = new Date(review.createdAt)
            return (
              <div key={review._id} className='pb-2 mb-2 border p-2 rounded-md dark:border-neutral-800'>
                <div className='flex gap-2 justify-between'>
                  <span className='text-[#444444] dark:text-neutral-400'>{review.name}</span>
                  <span className='mt-auto mb-auto font-light text-[#444444] text-[14px] dark:text-neutral-400'>{date.toLocaleTimeString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <Review stars={review.calification} />
                {
                  review.title
                    ? <span className='font-light text-lg'>{review.title}</span>
                    : ''
                }
                <span className='font-light'>{review.review}</span>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export const NoReviewsProduct = () => {
  return (
    <div className='flex gap-1'>
      <span className='text-lg font-light text-[#444444] dark:text-neutral-400'>0</span>
      <BsStar className='text-2xl text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-2xl text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-2xl text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-2xl text-[#444444] dark:text-neutral-400' />
      <BsStar className='text-2xl text-[#444444] dark:text-neutral-400' />
    </div>
  )
}
