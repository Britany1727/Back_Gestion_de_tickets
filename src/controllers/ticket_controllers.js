import Ticket from '../models/Ticket.js'
import Cliente from '../models/Cliente.js'
import Tecnico from '../models/Tecnico.js'
import mongoose from 'mongoose'

//-------------------------------REGISTRAR-TICKET-------------------------------------
const registrarTicket = async (req, res) => {
    try {
        const { codigo, descripcion, tecnico, cliente } = req.body
        
        if (Object.values({codigo, descripcion, tecnico, cliente}).includes("")) 
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        
        const verificarCodigo = await Ticket.findOne({codigo})
        if(verificarCodigo) 
            return res.status(400).json({msg: "El código del ticket ya existe"})

        // Verificar que el Cliente exista
        const clienteExiste = await Cliente.findById(cliente)
        if(!clienteExiste) return res.status(404).json({msg: "El cliente asignado no existe"})

        // Verificar que el Técnico exista
        const tecnicoExiste = await Tecnico.findById(tecnico)
        if(!tecnicoExiste) return res.status(404).json({msg: "El técnico asignado no existe"})

        const nuevoTicket = new Ticket(req.body)
        await nuevoTicket.save()
        
        res.status(200).json({msg: "Ticket registrado exitosamente"})

    } catch (error) {
        res.status(500).json({msg: "Error en el servidor", error: error.message})
    }
}

//-------------------------------LISTAR-TICKETS-------------------------------------
const listarTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate('cliente', 'nombre apellido cedula dependencia') 
            .populate('tecnico', 'nombre apellido telefono')             
        
        res.status(200).json({msg: "Tickets listados exitosamente", tickets})
    } catch (error) {
        res.status(500).json({msg: "Error al listar tickets", error: error.message})
    }
}

// -------------------------------DETALLE-TICKET-------------------------------------
const detalleTicket = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    const ticket = await Ticket.findById(id)
        .populate('cliente', 'nombre apellido cedula ciudad direccion dependencia')
        .populate('tecnico', 'nombre apellido cedula telefono')

    if(!ticket) return res.status(404).json({msg: "Ticket no encontrado"})

    res.status(200).json({msg: "Ticket encontrado exitosamente", ticket})
}

//----------------ACTUALIZAR TICKET-------------------------------------
const actualizarTicket = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    if(req.body.codigo){
        const verificarCodigo = await Ticket.findOne({codigo: req.body.codigo})
        if(verificarCodigo && verificarCodigo._id.toString() !== id)
            return res.status(400).json({msg: "El código ya existe en otro ticket"})
    }

    await Ticket.findByIdAndUpdate(id, req.body)
    res.status(200).json({msg: "Ticket actualizado exitosamente"})
}

//--------------------------------ELIMINAR-TICKET-------------------------------------
const eliminarTicket = async (req, res) => {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg: "ID no válido"})

    await Ticket.findByIdAndDelete(id)
    res.status(200).json({msg: "Ticket eliminado exitosamente"})
}

export {
    registrarTicket,
    listarTickets,
    detalleTicket,
    actualizarTicket,
    eliminarTicket
}