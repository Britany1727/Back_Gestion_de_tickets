import {Router} from 'express'
import { 
    registrarCliente, 
    listarClientes, 
    detalleCliente, 
    actualizarCliente, 
    eliminarCliente 
} from '../controllers/cliente_controllers.js'
import verificarAutenticacion from '../middlewares/auth.js'

const router = Router()

router.post('/cliente', verificarAutenticacion, registrarCliente)
router.get('/clientes', verificarAutenticacion, listarClientes)
router.get('/cliente/:id', verificarAutenticacion, detalleCliente)
router.put('/cliente/:id', verificarAutenticacion, actualizarCliente)
router.delete('/cliente/:id', verificarAutenticacion, eliminarCliente)

export default router