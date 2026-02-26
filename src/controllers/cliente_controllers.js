import Cliente from '../models/Cliente.js'
import mongoose from 'mongoose'

//----------------------------------REGISTRO-CLIENTE-------------------------------------
const registrarCliente = async (req, res) => {
    try {
        const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento } = req.body
        
        if (Object.values({cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento}).includes("")) 
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        
        const verificarCedula = await Cliente.findOne({cedula})
        if(verificarCedula) 
            return res.status(400).json({msg: "La cédula ya está registrada"})

        const nuevoCliente = new Cliente(req.body)
        await nuevoCliente.save()
        
        res.status(200).json({msg: "Cliente registrado exitosamente"})
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error: error.message})
    }
}

//-------------------------------LISTAR-CLIENTES-------------------------------------
const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find().sort({createdAt: -1})
        res.status(200).json({msg: "Clientes listados exitosamente", clientes})
    } catch (error) {
        res.status(500).json({msg: "Error al listar clientes", error: error.message})
    }
}

//-------------------------------DETALLE-CLIENTE-------------------------------------
const detalleCliente = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    const cliente = await Cliente.findById(id)
    if(!cliente) return res.status(404).json({msg: "Cliente no encontrado"})

    res.status(200).json({msg: "Cliente encontrado exitosamente", cliente})
}

//-------------------------------ACTUALIZAR-CLIENTE-------------------------------------
const actualizarCliente = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    if(req.body.cedula){
        const verificarCedula = await Cliente.findOne({cedula: req.body.cedula})
        if(verificarCedula && verificarCedula._id.toString() !== id)
            return res.status(400).json({msg: "La cédula ya se encuentra registrada en otro cliente" })
    }

    await Cliente.findByIdAndUpdate(id, req.body)
    res.status(200).json({msg: "Cliente actualizado exitosamente"})
}

//-------------------------------ELIMINAR-CLIENTE-------------------------------------
const eliminarCliente = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    await Cliente.findByIdAndDelete(id)
    res.status(200).json({msg: "Cliente eliminado exitosamente"})
}

export {
    registrarCliente,
    listarClientes,
    detalleCliente,
    actualizarCliente,
    eliminarCliente
}