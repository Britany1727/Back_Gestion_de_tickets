import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

const connection = async () => {
    try {

        const uri =
            process.env.MONGODB_URI_PRODUCTION 

        if (!uri) {
            throw new Error('No hay URI de MongoDB definida en .env')
        }

        console.log('Conectando a:', uri)

        const { connection } = await mongoose.connect(uri)

        console.log(`Database connected on ${connection.host} - ${connection.port}`)

    } catch (error) {
        console.error('Error completo:', error)
    }
}

export default connection