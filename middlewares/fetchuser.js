const jwt = require('jsonwebtoken');

const JWT_SECRET = "tukka";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = fetchUser;
