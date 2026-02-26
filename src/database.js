import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

const connection = async()=>{
    const mongoUri =
        process.env.MONGODB_URI_PRODUCTION ||
        process.env.MONGODB_URI_LOCAL ||
        process.env.MONGODB_URI

    if (!mongoUri) {
        throw new Error('No existe MONGODB_URI_PRODUCTION, MONGODB_URI_LOCAL o MONGODB_URI en .env')
    }

    try {
        const {connection} = await mongoose.connect(mongoUri)
        console.log(`Database connected on ${connection.host} - ${connection.port}`)

    } catch (error) {
        console.error('Error completo:', error)
    }
}

export default connection