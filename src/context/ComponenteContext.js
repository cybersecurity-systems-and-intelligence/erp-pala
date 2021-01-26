import {createContext, useState } from 'react';

// Crear el CONTEXT
export const ComponenteContext = createContext()

// Provider es donde se encuentran las funciones y state
const ComponenteProvider = (props) => {

    //const componente_ls = JSON.parse(localStorage.getItem('componente'))

    const resultado = JSON.parse(localStorage.getItem('componente'))
    let nivel_acceso = 0
    let numero_ventana = 0
    let numero_componente = 0

    if(resultado){
        nivel_acceso = resultado.nivel_acceso
        numero_ventana = resultado.numero_ventana
        numero_componente = resultado.numero_componente
    }

    const [ componentecontx, guardarComponenteContx ] = useState({
        nivel_acceso: nivel_acceso,
        numero_ventana: numero_ventana,
        numero_componente: numero_componente
    })

    return (
        <ComponenteContext.Provider
            value={{
                componentecontx,
                guardarComponenteContx
            }}
        >
            {props.children}
        </ComponenteContext.Provider>
    );
}
 
export default ComponenteProvider;