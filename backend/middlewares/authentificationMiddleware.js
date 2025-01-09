const jwt = require('jsonwebtoken');

const authentificationMiddleware = (req, res, next) => { 
    let token = req.header('Authorization'); // Récupère le token dans l'en-tête
    console.log('Token reçu:', token); // Affiche le token reçu pour vérification

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Retire "Bearer " du token
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim(); // Supprime "Bearer " et les espaces
    }

    try {
        const decoded = jwt.verify(token, 'secret_key'); // Vérifie et décode le token
        console.log('Token décodé:', decoded);
        req.user = decoded; // Ajoute les données du token à req.user
        next(); // Passe au middleware suivant
    } catch (error) {
        console.log('Erreur lors de la vérification du token:', error);
        return res.status(401).json({ error: 'Invalid token after decoded' });
    }
};

module.exports = authentificationMiddleware;
