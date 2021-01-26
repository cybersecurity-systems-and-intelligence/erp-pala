const axios = require('axios')

export const llamada = async (ruta, tipo) => {
    switch(tipo){
        case 'get':
            return await axios.get(ruta)
        case 'post':
            return await axios.post(ruta)
        default:
            throw new Error('Error desconocido')
    }    
}
