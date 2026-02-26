import mongoose, {Schema, model} from 'mongoose'

const ticketSchema = new Schema({
    codigo: { type: String, required: true, trim: true, unique: true },
    descripcion: { type: String, required: true, trim: true },
    // id Tecnico
    tecnico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tecnico',
        required: true
    },
    // id Cliente
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }
},{
    timestamps: true
})

export default model('Ticket', ticketSchema)