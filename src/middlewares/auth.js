const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

module.exports = ({ logger: { errorLogObj }, config: { secretKey, expiryTime } }) => {
    const encryptPwd = (passwordStr) => {
        return bcrypt.genSalt()
            .then((salt) => {
                return bcrypt.hash(passwordStr, salt)
            })
            .then((hash) => {
                return hash;
            })
            .catch((err) => {
                throw errorLogObj(path.resolve(__dirname, __filename), err);
            })
    }
    const authenticateUser = (hashPwd, pwd) => {
        return bcrypt.compare(pwd, hashPwd)
            .catch((err) => {
                throw errorLogObj(path.resolve(__dirname, __filename), err);
            })
    }
    const generateToken = (userName, pwd) => {
        let token = null;
        try {
            const payload = {
                userName: userName,
                password: pwd
            }
            token = jwt.sign(payload, secretKey, { expiresIn: expiryTime });
        } catch (err) {
            throw errorLogObj(path.resolve(__dirname, __filename), err);
        }
        return token;
    }
    const verifyToken = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secretKey, (err, data) => {
                if (err) {
                    res.status(401).json({ message: "Unauthenticated request detected" })
                }
                else if (data && (data.userName && typeof data.userName == 'string') && (data.password && typeof data.password == 'string')) {
                    next();
                }
                else {
                    res.status(401).json({ message: "Unauthenticated request detected" })
                }
            })
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
    return { encryptPwd, authenticateUser, generateToken, verifyToken }
}