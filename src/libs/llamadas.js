const axios = require('axios')

export const llamada = async (ruta, tipo, objeto={}) => {
    const jwt = JSON.parse(localStorage.getItem('jwt'))
    
    switch(tipo){
        case 'get':
            //return await axios.get(ruta)
            return await axios(
                {
                    method: 'get', //you can set what request you want to be
                    url: ruta,
                    headers: {
                      Autorizado: jwt,
                      AutorizadoG: 'holamundo'
                    }
                }
            )
        case 'post':
            //return await axios.post(ruta, {headers={'Autorizado': jwt}}, {objeto})
            return await axios(
                {
                    method: 'post', //you can set what request you want to be
                    url: ruta,
                    data: {objeto},
                    headers: {
                      Autorizado: jwt,
                      AutorizadoG: 'holamundo'
                    }
                }
            )
        default:
            throw new Error('Error desconocido')
    }    
}
