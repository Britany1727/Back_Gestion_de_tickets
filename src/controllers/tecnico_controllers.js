import Tecnico from '../models/Tecnico.js'
import mongoose from 'mongoose'

//----------------------------------REGISTRO-TÉCNICO-------------------------------------
const registrarTecnico = async (req, res) => {
    try {
        const { nombre, apellido, cedula, fecha_nacimiento, genero, ciudad, direccion, telefono, email } = req.body
        
        if (Object.values({nombre, apellido, cedula, fecha_nacimiento, genero, ciudad, direccion, telefono, email}).includes("")) 
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        
        const verificarCedula = await Tecnico.findOne({cedula})
        if(verificarCedula) 
            return res.status(400).json({msg: "La cédula del técnico ya se encuentra registrada"})

        const nuevoTecnico = new Tecnico(req.body)
        await nuevoTecnico.save()
        
        res.status(200).json({msg: "Técnico registrado exitosamente"})
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error: error.message})
    }
}

//----------------------------------LISTAR-TÉCNICOS-------------------------------------
const listarTecnicos = async (req, res) => {
    try {
        const tecnicos = await Tecnico.find().sort({createdAt: -1})
        res.status(200).json({msg: "Técnicos listados exitosamente", tecnicos})
    } catch (error) {
        res.status(500).json({msg: "Error al listar técnicos", error: error.message})
    }
}

//----------------------------------DETALLE-TÉCNICO-------------------------------------
const detalleTecnico = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    const tecnico = await Tecnico.findById(id)
    if(!tecnico) return res.status(404).json({msg: "Técnico no encontrado"})

    res.status(200).json({msg: "Técnico encontrado exitosamente", tecnico})
}

//----------------------------------ACTUALIZAR-TÉCNICO-------------------------------------
const actualizarTecnico = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    if(req.body.cedula){
        const verificarCedula = await Tecnico.findOne({cedula: req.body.cedula})
        if(verificarCedula && verificarCedula._id.toString() !== id)
            return res.status(400).json({msg: "La cédula ya se encuentra registrada en otro técnico" })
    }

    await Tecnico.findByIdAndUpdate(id, req.body)
    res.status(200).json({msg: "Técnico actualizado exitosamente"})
}

//-------------------------------ELIMINAR-TÉCNICO-------------------------------------
const eliminarTecnico = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    await Tecnico.findByIdAndDelete(id)
    res.status(200).json({msg: "Técnico eliminado exitosamente"})
}

export {
    registrarTecnico,
    listarTecnicos,
    detalleTecnico,
    actualizarTecnico,
    eliminarTecnico
}