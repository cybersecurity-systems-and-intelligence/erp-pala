import axios from 'axios'
import { mTokenGeneral } from '../config/config'

const baseUrl = 'https://apicotizacion.herokuapp.com'

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
        
        if(refreshToken && error.response.status === 401 && !originalRequest._retry){
            
            originalRequest._retry = true
            return axios.post(`${baseUrl}/api/autorizacion/refreshToken`, { refreshToken: refreshToken })
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
        return axios.post(`${baseUrl}/api/autorizacion`, {objeto: body})
    },
    refreshToken: (body) => {
        return axios.post(`${baseUrl}/api/autorizacion/refreshToken`, body)
    },
    logout: (body) => {
        return axios.delete(`${baseUrl}/api/autorizacion/logout`, { data: body })
    },
    obrasVigentes: () => {
        return axios.get(`${baseUrl}/api/obras/vigentes`)
    },
    obrasCotizadasProv: (correo) => {
        return axios.get(`${baseUrl}/api/cotizaciones/cotizadas/${correo}`)
    },
    perfilProv: (correo) => {
        return axios.get(`${baseUrl}/api/proveedores/datos_personales/${correo}`)
    },
    crearObraAdmin: (body) => {
        return axios.post(`${baseUrl}/api/obras`,{objeto:body})
    },
    cargarObrasAdmin: () => {
        return axios.get(`${baseUrl}/api/obras`)
    },
    cargarCotizacionesAdmin: (folio_obra) => {
        return axios.get(`${baseUrl}/api/cotizaciones/${folio_obra}`)
    },
    crearCotizacionProv: (body) => {
        return axios.post(`${baseUrl}/api/cotizaciones`,{objeto:body})
    },
    crearProv: (body) => {
        return axios.post(`${baseUrl}/api/proveedores`, {objeto:body})
    }
}

export default api