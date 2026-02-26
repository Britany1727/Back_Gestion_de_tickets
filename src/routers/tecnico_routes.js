import {Router} from 'express'
import { 
    registrarTecnico, 
    listarTecnicos, 
    detalleTecnico, 
    actualizarTecnico, 
    eliminarTecnico 
} from '../controllers/tecnico_controller.js'
import verificarAutenticacion from '../middlewares/auth.js'

const router = Router()

router.post('/tecnicos', verificarAutenticacion, registrarTecnico)
router.get('/tecnicos', verificarAutenticacion, listarTecnicos)
router.get('/tecnico/:id', verificarAutenticacion, detalleTecnico)
router.put('/tecnico/:id', verificarAutenticacion, actualizarTecnico)
router.delete('/tecnico/:id', verificarAutenticacion, eliminarTecnico)

export default router