const jwt = require('jsonwebtoken');

const authentificationMiddleware = (req, res, next) => { 
    let token = req.header('Authorization'); // Récupère le token dans l'en-tête
    console.log('Token reçu:', token);

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Retire "Bearer " du token
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        console.log('Token décodé:', decoded);
        req.user = decoded; // Ajoute les données du token à req.user
        next(); // Passe au middleware suivant
    } catch (error) {
        console.log('Erreur lors de la vérification du token:', error);
        return res.status(401).json({ error: 'Invalid token after decoded' });
    }
};

const validateObjectId = (req, res, next) => {
    const { userId } = req.params;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    next();
  };


module.exports = validateObjectId
module.exports = authentificationMiddleware;
