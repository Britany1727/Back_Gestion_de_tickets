import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const verificarAutenticacion = async (req, res, next) => {

    // Revisar si hay token en los headers
    if(!req.headers.authorization) 
        return res.status(401).json({msg: "Lo sentimos, no has proporcionado un token"})

    const {authorization} = req.headers

    try {
        // Limpiar y verificar el token
        const {id} = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)

        //Buscar al usuario en BDD y agregarlo a la petición 
        req.usuario = await Usuario.findById(id).lean().select("-password")
        
        //Siguiente
        next()

    } catch (error) {
        return res.status(404).json({msg: "Formato del token no válido"})
    }
}

export default verificarAutenticacion