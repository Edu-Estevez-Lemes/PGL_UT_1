const jwt = require('jsonwebtoken');
const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = async function (req, res, next) {
    const h = req.headers['authorization'] || '';
    
    // 1. Manejar el Token Bearer (JWT)
    if (h.startsWith('Bearer ')) {
        const token = h.slice(7);
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await db.clientes.findByPk(payload.sub);
            if (!user) return res.status(401).send('Invalid token');
            
            req.user = user;
            req.jwt = payload;
            return next(); // Autenticación Bearer exitosa
        } catch (e) {
            return res.status(401).send('Invalid/expired token');
        }
    } 
    
    // 2. Manejar la Autenticación Básica (Basic Auth)
    else if (h.startsWith('Basic ')) {
        const encoded = h.slice(6);
        // Decodificar Base64 a "email:password"
        const decoded = Buffer.from(encoded, 'base64').toString('utf8');
        const [email, password] = decoded.split(':');
        
        if (!email || !password) {
            console.error("Basic Auth: Invalid format or missing credentials.");
            return res.status(401).send('Invalid Basic Auth format');
        }

        try {
            const user = await db.clientes.findOne({ where: { email } });
            
            // Comprobar si el usuario existe y si la contraseña es correcta usando bcrypt
            if (!user || !(await bcrypt.compare(password, user.password_hash))) {
                console.warn(`Basic Auth failed for user: ${email}. Invalid credentials.`);
                // Devolver el mismo error para no dar pistas
                return res.status(401).send('Invalid credentials'); 
            }

            // Si es válido, adjuntamos el usuario y continuamos
            req.user = user;
            return next(); // Autenticación Basic exitosa
        } catch (e) {
            // Captura errores de la base de datos o de bcrypt
            console.error("Basic Auth Critical Error:", e); 
            return res.status(401).send('Authentication error');
        }
    } 
    
    // Si no hay cabecera de autenticación válida
    else {
        return res.status(401).send('Token or Basic Auth required');
    }
};