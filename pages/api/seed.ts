import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Category } from '../../models'

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (  process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a este API'});
    }

    await db.dbConnect()

    await Category.deleteMany()
    await Category.insertMany(seedDatabase.initialData.categories)

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}