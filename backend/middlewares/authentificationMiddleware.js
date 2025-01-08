const jwt = require('jsonwebtoken');

const authentificationMiddleware = (req, res, next ) => { // Request, response and next pour passer au middleware suivant
    // Recupération du token
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error : 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded // On stock le user si la requete est correcte
        next(); // Si c'est validé, on passe à la requete suivante
    } catch(error) {
        req.status(401).json({ error: 'Invalid token' })
    }
}