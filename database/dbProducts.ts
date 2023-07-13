import { db } from "."
import { ICategory, IProduct } from "../interfaces"
import { Product, Category } from '../models'

export const getProductBySlug = async ( slug: string ): Promise<IProduct | null> => {
  await db.dbConnect()
  const product = await Product.findOne({ slug }).lean()

  if ( !product ) {
    return null
  }

  return JSON.parse( JSON.stringify( product ) )
}

interface ProductSlug {
  slug: string
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.dbConnect()
  const slugs = await Product.find().select('slug -_id').lean()

  return slugs
}

export const getProductsByTerm = async ( term: string ): Promise<IProduct[]> => {
  term = term.toString().toLowerCase()

  await db.dbConnect()
  const products = await Product.find({
    $text: { $search: term }
  })
  .select('name images price offerPrice stock slug -_id')
  .lean()

  return products
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.dbConnect()
  const products = await Product.find().lean()
  return JSON.parse( JSON.stringify( products ) )
}

interface CategorySlug {
  slug: string
}

export const getAllcategoriesSlug = async (): Promise<CategorySlug[]> => {
  await db.dbConnect()
  const slugs = await Category.find().select('slug -_id').lean()

  return slugs
}

export const getCategoriesBySlug = async (slug: string): Promise<ICategory | null> => {
  await db.dbConnect()
  const category = await Category.findOne({ slug }).lean()

  if ( !category ) {
    return null
  }

  return JSON.parse( JSON.stringify( category ) )
}
