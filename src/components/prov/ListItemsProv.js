import { useContext } from 'react'
import { ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core/';
import { ListAlt, Person, Add } from '@material-ui/icons';
import {ComponenteContext} from '../../context/ComponenteContext'
import {guardarLS} from '../../libs/guardarLS'

const ListItemsProv = ( { /*guardarPaginaActual,*/ datosgenerales, guardarDatosGenerales, obrasdisponibles, guardarRowsObrasDisponibles, obrascotizadas, guardarRowsObrasCotizadas, /*setPage,*/ guardarTipoBusqueda, /*guardarErrorConsulta*/} ) => {

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
  const { nivel_acceso, numero_ventana } = componentecontx
  
  const handleClickPerfil = () => {   
    
    guardarLS( nivel_acceso, 1, numero_ventana)
    //guardarPaginaActual(0)
    //setPage(1)
    guardarDatosGenerales({
      ...datosgenerales,
      paginaactual: 0,
      page: 1,
      errorconsulta: false,
      //tipobusqueda: 'Buscar por Folio Obra'
    })
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 1
    })
    guardarTipoBusqueda('Buscar por Folio Obra')
    //guardarErrorConsulta(false)
  }
  
  const handleClickObrasDisp = () => {   
     
    const obras = obrasdisponibles.map(obra => (
      {
        folioObra: obra.folio_obra,
        nombreObra: obra.nombre_obra                    
      }
    ))
    
    guardarLS( nivel_acceso, 0, numero_ventana)
    // guardarPaginaActual(0)
    // setPage(1)
    guardarDatosGenerales({
      ...datosgenerales,
      paginaactual: 0,
      page: 1,
      //tipobusqueda: 'Buscar por Folio Obra',
      errorconsulta: false
    })
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 0
    })
    guardarTipoBusqueda('Buscar por Folio Obra')
    guardarRowsObrasDisponibles(obras)    
    //guardarErrorConsulta(false)
  }

  const handleClickObrasCoti = () => {
    const obras = obrascotizadas.map(obra => (
      {
        folioObra: obra.folio_obra,
        folioCotizacion: obra.folio_cotizacion,
        nombreObra: obra.nombre_obra                    
      }
    ))
      
    guardarLS( nivel_acceso, 2, numero_ventana)
    // guardarPaginaActual(0)
    // setPage(1)
    guardarDatosGenerales({
      ...datosgenerales,
      paginaactual: 0,
      page: 1,
      //tipobusqueda: 'Buscar por Folio Obra',
      errorconsulta: false
    })
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 2
    })
    guardarTipoBusqueda('Buscar por Folio Obra')
    guardarRowsObrasCotizadas(obras)  
    //guardarErrorConsulta(false)
  }

  return (
    <List>
    <div>
      <ListItem 
        button
        onClick={handleClickPerfil}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
      <ListItem
        button
        onClick={handleClickObrasDisp}
      >
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Obras Disponibles" />
      </ListItem>
      <ListItem
        button
        onClick={handleClickObrasCoti}
      >
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>
        <ListItemText primary="Obras Cotizadas" />
      </ListItem>      
    </div>
    </List>
  )
}

export default ListItemsProv
