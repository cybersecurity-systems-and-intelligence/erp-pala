const jwt_decode = require('jwt-decode')

const correoJwt = () => {
    const resultado = JSON.parse(localStorage.getItem('jwt'))
    const decoded = jwt_decode(resultado);
    return decoded.correo
}
module.exports = {
    correoJwt
}