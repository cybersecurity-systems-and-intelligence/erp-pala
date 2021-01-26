const guardarLS = (nivelAcceso, numeroComponente, numeroVentana) => {
    const objeto = {
      nivel_acceso: nivelAcceso,
      numero_componente: numeroComponente,
      numero_ventana: numeroVentana
    }
    localStorage.setItem('componente', JSON.stringify(objeto)) 
}

module.exports = {
    guardarLS
}