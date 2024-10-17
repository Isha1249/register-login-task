const fs = require('fs');
const crypto = require('crypto');
const generateSecretKey = () => crypto.randomBytes(32).toString('hex');
const jwtsecretkey = generateSecretKey();
const refreshTokenSecretKey = generateSecretKey();
fs.writeFileSync('.env', `JWT_SECRET=${jwtsecretkey}\nREFRESH_TOKEN_SECRET=${refreshTokenSecretKey}\n`, { flag: 'a' });
 
console.log(`Secret key has been saved to .env: JWT_SECRET=${jwtsecretkey},REFRESH_TOKEN_SECRET=${refreshTokenSecretKey}`)