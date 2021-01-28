import { useContext } from 'react'
import { ListItem, List, ListItemIcon, ListItemText, } from '@material-ui/core/';
import { Person, ListAlt, Add } from '@material-ui/icons';
import {ComponenteContext} from '../../context/ComponenteContext'
import {guardarLS} from '../../libs/guardarLS'
import { formatCardFolioObra } from '../../libs/formatters'

const ListItemsAdmin = ( { datosgenerales, guardarDatosGenerales, guardarRowsObrasTotales, guardarRowsObrasCotizadas, obrastotales, guardarTipoBusqueda} ) => {

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
  const { nivel_acceso, numero_ventana } = componentecontx

  const handleListItemClick = () => {
    guardarLS(nivel_acceso, 1, numero_ventana)
    guardarDatosGenerales({
      ...datosgenerales,
      paginaactual: 0,
      errorconsulta: false
    })
    
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 1
    })
    guardarTipoBusqueda('Buscar por Folio Obra')
  }
  
  const handleListItemClick2 = () => {    
    guardarLS(nivel_acceso, 0, numero_ventana)
    guardarDatosGenerales({
      ...datosgenerales,
      paginaactual: 0,
      errorconsulta: false
    })
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 0
    })
    guardarTipoBusqueda('Buscar por Folio Obra')
  }

  const handleListItemClick3 = () => {

    const obras = formatCardFolioObra(obrastotales)
    guardarRowsObrasTotales(obras)
    guardarLS(nivel_acceso, 2, numero_ventana)
    guardarDatosGenerales({
      ...datosgenerales,
      paginaactual: 0,
      page: 1,
      errorconsulta: false
    })
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 2
    })
    guardarTipoBusqueda('Buscar por Folio Obra')
    guardarRowsObrasCotizadas([])
  }

  return (
    <List>
    <div>
      <ListItem 
        button
        onClick={handleListItemClick}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
      <ListItem
        button
        onClick={handleListItemClick2}
      >
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Crear Obra" />
      </ListItem>
      <ListItem
        button
        onClick={handleListItemClick3}
      >
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>
        <ListItemText primary="Obras Creadas" />
      </ListItem>    
    </div>
    </List>
  )
}

export default ListItemsAdmin
/*
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
*/