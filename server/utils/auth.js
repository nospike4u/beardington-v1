const crypto = require('crypto');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'));
        });
    });
};

const verifyPassword = (password, storedHash) => {
    return new Promise((resolve, reject) => {
        const [salt, hash] = storedHash.split(":");
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key.toString('hex') === hash);
        });
    });
};

module.exports = { hashPassword, verifyPassword };