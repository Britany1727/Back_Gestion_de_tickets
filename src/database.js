import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

const connection = async()=>{
    try {
        console.log('URI completa:', process.env.MONGODB_URI_LOCAL || process.env.MONGODB_URI_PRODUCTION);
        
        if (!process.env.MONGODB_URI_LOCAL) {
            throw new Error('MONGODB_URI_PRODUCTION no está definida en .env');
        }
        
        const {connection} = await mongoose.connect(process.env.MONGODB_URI_LOCAL)
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    } catch (error) {
        console.log('Error completo:', error);
    }
}

export default connection