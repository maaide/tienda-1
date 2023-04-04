import mongoose, { Schema, model, Model } from 'mongoose'
import { ICategory } from '../interfaces'

const categorySchema = new Schema({
  category: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  titleSeo: { type: String },
  descriptionSeo: { type: String }
}, {
  timestamps: true
})

const Category: Model<ICategory> = mongoose.models.Category || model('Category', categorySchema)

export default Category
