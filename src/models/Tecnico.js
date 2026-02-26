import mongoose, {Schema} from "mongoose";

const tecnicoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },  
    apellido: {
        type: String,
        required: true
    },
    cedula: {
        type: Number,
        required: true,
        unique: true
    },
    fecha_de_nacimiento: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    } },      
    {timestamps: true}
); 

export default mongoose.model('Tecnico', tecnicoSchema);