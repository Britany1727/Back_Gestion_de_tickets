import {Router} from 'express'
import { 
    registrarTicket, 
    listarTickets, 
    detalleTicket, 
    actualizarTicket, 
    eliminarTicket 
} from '../controllers/ticket_controller.js'
import verificarAutenticacion from '../middlewares/auth.js'

const router = Router()


router.post('/tickets', verificarAutenticacion, registrarTicket)
router.get('/tickets', verificarAutenticacion, listarTickets)
router.get('/ticket/:id', verificarAutenticacion, detalleTicket)
router.put('/ticket/:id', verificarAutenticacion, actualizarTicket)
router.delete('/ticket/:id', verificarAutenticacion, eliminarTicket)

export default router