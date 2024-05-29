const expressjwt = require('express-jwt');

function authjwt() {
    const secret = process.env.secret;
    console.log(secret);
    if (!secret) {
        throw new Error('The secret environment variable is not set.');
    }

    return expressjwt({
        secret,
        algorithms: ['HS256']
    });
}

module.exports = authjwt;