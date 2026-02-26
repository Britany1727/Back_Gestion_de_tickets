import mongoose, {Schema} from 'mongoose';

const clienteSchema = new Schema({
    cedula: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    ciudad:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fecha_de_nacimiento: {
        type: String,
        required: true
    },
    dependencia: {
        type: String,
        required: true
    },
}, { timestamps: true });


export default mongoose.model('Cliente', clienteSchema);