import { useContext } from 'react'
import { ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core/';
import { ListAlt, Person, Add } from '@material-ui/icons';
import {ComponenteContext} from '../../context/ComponenteContext'
import {guardarLS} from '../../libs/guardarLS'

const ListItemsProv = () => {

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
  const { nivel_acceso, numero_ventana } = componentecontx
  
  const handleClickPerfil = () => {   
    
    guardarLS( nivel_acceso, 1, numero_ventana)
    
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 1
    }) 
  }
  
  const handleClickObrasDisp = () => {   
     
    
    
    guardarLS( nivel_acceso, 0, numero_ventana)
    
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 0
    })
  }

  const handleClickObrasCoti = () => {
    
      
    guardarLS( nivel_acceso, 2, numero_ventana)
  
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 2
    })
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
