const config = {};

config.TOKEN_HEADER_KEY = 'x-hiking-token';
config.JWT_SECRET = 'NEKA_SUPER_TAJNA_STVAR';
// config.MONGOOSE_CONNECT_URL = 'mongodb://localhost/hiking_db1';
config.MONGOOSE_CONNECT_URL = 'mongodb+srv://abcabcabc:abcabcabc@cluster0.rm5jl.mongodb.net/hiking_db1?retryWrites=true&w=majority';
config.BACKEND_PORT = '3001';

module.exports = config; // Node.js default export tj. jeadn po fajlu