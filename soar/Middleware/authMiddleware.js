const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied: no token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET; 
        if (!secret) {
            return res.status(500).json({ message: 'JWT_SECRET not defined in environment variables' });
        }

        
        const tokenValue = token.split(' ')[1];
        if (!tokenValue) {
            return res.status(400).json({ message: 'Malformed token. Token should be prefixed with Bearer' });
        }

        const verified = jwt.verify(tokenValue, secret); 

        
        req.user = verified;
        console.log('Verified user:', req.user); 

        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) return res.status(401).json({ message: 'Access denied: no token provided' });

//     try {
//         const secret = process.env.JWT_SECRET;  // Access secret from .env
//         if (!secret) {
//             return res.status(500).json({ message: 'JWT_SECRET not defined in environment variables' });
//         }
//         const verified = jwt.verify(token.split(' ')[1], secret); // Split and verify token
//         req.user = verified;
//         next();
//     } catch (e) {
//         res.status(401).json({ message: 'Invalid Token' });
//     }
// }
