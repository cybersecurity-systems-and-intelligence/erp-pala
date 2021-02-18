import axios from 'axios'
import { mTokenGeneral } from '../config/config'

const baseUrl = 'https://apicotizacion.herokuapp.com/api'

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {

        const accessToken = JSON.parse(localStorage.getItem('accessToken'))
        if(accessToken){
            config.headers['Autorizado'] = accessToken
            //config.headers['AutorizadoG'] = "holamundo"
        }
        config.headers['AutorizadoG'] = mTokenGeneral
        return config
    }, (error) => {
        Promise.reject(error)
    }
)

//response interceptor to refresh token on receiving on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response
    },
    function(error){
        const originalRequest = error.config
        let refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

        if(error.response.status === 401){
            return Promise.reject(error)
        }else if(refreshToken && !originalRequest._retry){

            originalRequest._retry = true
            return axios.post(`${baseUrl}/autorizacion/refreshToken`, { refreshToken: refreshToken })
                        .then((res) => {                           
                            if (res.status === 200) {                             
                                localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken))                                
                                return axios(originalRequest)
                            }
                        })
        }
        return Promise.reject(error)
    }
)

//Functions to make api calls
const api = {
    login: (body) => {
        return axios.post(`${baseUrl}/autorizacion`, {objeto: body})
    },
    refreshToken: (body) => {
        return axios.post(`${baseUrl}/autorizacion/refreshToken`, body)
    },
    logout: (body) => {
        return axios.delete(`${baseUrl}/autorizacion/logout`, { data: body })
    },
    obrasVigentes: () => {
        return axios.get(`${baseUrl}/obras/vigentes`)
    },
    obrasCotizadasProv: (correo) => {
        return axios.get(`${baseUrl}/cotizaciones/cotizadas/${correo}`)
    },
    perfilProv: (correo) => {
        return axios.get(`${baseUrl}/proveedores/datos_personales/${correo}`)
    },
    crearObraAdmin: (body) => {
        return axios.post(`${baseUrl}/obras`,{objeto:body})
    },
    cargarObrasAdmin: () => {
        return axios.get(`${baseUrl}/obras`)
    },
    cargarCotizacionesAdmin: (folio_obra) => {
        return axios.get(`${baseUrl}/cotizaciones/${folio_obra}`)
    },
    crearCotizacionProv: (body) => {
        return axios.post(`${baseUrl}/cotizaciones`,{objeto:body})
    },
    crearProv: (body) => {
        return axios.post(`${baseUrl}/proveedores`, {objeto:body})
    },
    enviarCorreo: (body) => {
        return axios.post(`${baseUrl}/correos/sendEmail`, { objeto: body })
    },
    crearRequisicion: (body) => {
        return axios.post(`${baseUrl}/ordenCompra`, { objeto: body })
    }
}

export default api