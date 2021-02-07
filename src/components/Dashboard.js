import { useState, useContext, useEffect } from 'react';

import { makeStyles, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import { Menu, ChevronLeft, ExitToApp } from '@material-ui/icons';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode'

import ListItemsAdmin from './admin/ListItemsAdmin';
import PerfilAdmin from './admin/perfil/PerfilAdmin'
import CrearObraAdmin from './admin/registroObras/CrearObraAdmin'
import ObrasCreadas from './admin/obrasCreadas/ObrasCreadas'
import ObrasCotizadasAdmin from './admin/obrasCreadas/obrasCotizadas/ObrasCotizadasAdmin'
import DetalleObraAdmin from './admin/obrasCreadas/obrasCotizadas/requisicionObras/DetalleObraAdmin'


import ListItemsProv from './prov/ListItemsProv'
import PerfilProv from './prov/perfil/PerfilProv'
import CotizarObraProv from './prov/obrasDisponibles/cotizacionObra/CotizarObraProv'
import ObrasDisponiblesProv from './prov/obrasDisponibles/ObrasDisponiblesProv'
import ObrasCotizadas from './prov/obrasCotizadas/ObrasCotizadas'

import imagenes from '../asets/img/imagenes';

import { ComponenteContext } from '../context/ComponenteContext'

import { cargarDatosProv, cargarDatosAdmin } from '../libs/cargarDatosDash'
import config from '../config/config'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#f1f8e9',    
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    background: '#fff',
    color: '#373737'
  },
  hr:{
    background: 'linear-gradient(#d4e157, #afb42b)',
    alignItems: 'center',
    textAlign: 'center',
    width: '50%',
    borderColor:'#d4e157',
    boxShadow:'2px 2px 5px #999',
    height:'8px',
    borderRadius: '5px',
    marginTop:'1px'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 28px',
    ...theme.mixins.toolbar,
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#cddc39',
    color: 'black'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    
  },
  menuButtonHidden: {
    display: 'none',
    
  },
  title: {
    flexGrow: 1,
    margin: 'auto 0'
    
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 3,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Dashboard() {
  
  const classes = useStyles()

  const resultadoJwt = JSON.parse(localStorage.getItem('jwt'))
  const decoded = jwt_decode(resultadoJwt)    

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
  const { nivel_acceso, numero_componente } = componentecontx  

  const cantidadcards = parseInt(config.CANTIDADCARDS)  
  
  const [ open, setOpen ] = useState(false);
  const [ obrasdisponibles, guardarObrasDisponibles ] = useState([])
  const [ obrascotizadas, guardarObrasCotizadas ] = useState([])
  const [ obrastotales, guardarObrasTotales ] = useState([])
  const [ rowsobrascotizadas, guardarRowsObrasCotizadas ] = useState([])
  const [ rowsobrastotales, guardarRowsObrasTotales ] = useState([])
  const [ actualizarcards, guardarActualizarCards ] = useState(0)
  const [ tipobusqueda, guardarTipoBusqueda ] = useState('Buscar por Folio Obra')
  const [ perfil, guardarPerfil ] = useState({})
  const [ datosgenerales, guardarDatosGenerales ] = useState({
    paginaactual: 0,
    page: 1,
    paginafinal: cantidadcards,
    errorconsulta: false
  })
  const [ obra, guardarObra ] = useState({})
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    
    const consultarAPI = async () => {
      if( nivel_acceso === 0){        
        
        const { respObrasTotales, obrasTotales } = await cargarDatosAdmin()

        guardarObrasTotales(respObrasTotales)
        guardarRowsObrasTotales(obrasTotales)
      }else if (nivel_acceso === 1){

        const {respObrasDisp, respObrasCoti, respPerfil} = await cargarDatosProv(decoded.correo)

        guardarObrasDisponibles(respObrasDisp)
        guardarObrasCotizadas(respObrasCoti)    
        guardarPerfil(respPerfil)
      }
    }
    consultarAPI()
    //eslint-disable-next-line
  }, [actualizarcards])

  

  const paginaAdmin = () => {
    if (nivel_acceso === 0 && numero_componente === 0){
      return <CrearObraAdmin
        guardarActualizarCards={guardarActualizarCards}
      />
    }else if (nivel_acceso === 0 && numero_componente === 1){
      return <PerfilAdmin
        correo={decoded.correo}
      />
    }else if (nivel_acceso === 0 && numero_componente === 2){
      return <ObrasCreadas        
        titulo={<h5>OBRAS CREADAS<hr className={classes.hr}/></h5>}
        siguientecomponente={3}
        guardarObra={guardarObra}
        rows={rowsobrastotales}  
        guardarRows={guardarRowsObrasTotales}      
        obrastotal={obrastotales}     
        totalpaginas={Math.ceil(rowsobrastotales.length/cantidadcards)} 
        datosgenerales={datosgenerales}
        guardarDatosGenerales={guardarDatosGenerales}
        cantidadcards={cantidadcards}
        bandObrasCotizadas={false}
        tipobusqueda={tipobusqueda}
        guardarTipoBusqueda={guardarTipoBusqueda}
        seleccionpor={'obra'}
      />
    }else if (nivel_acceso === 0 && numero_componente === 3){
      return <ObrasCotizadasAdmin
        obra={obra}
        guardarObra={guardarObra}
        rowsobrascotizadas={rowsobrascotizadas}      
        guardarRowsObrasCotizadas={guardarRowsObrasCotizadas}        
        obrascotizadas={obrascotizadas}
        guardarObrasCotizadas={guardarObrasCotizadas}  
        datosgenerales={datosgenerales}
        guardarDatosGenerales={guardarDatosGenerales}
        cantidadcards={cantidadcards}
        bandObrasCotizadas={true}
        tipobusqueda={tipobusqueda}
        guardarTipoBusqueda={guardarTipoBusqueda}
      />
    }else if (nivel_acceso === 0 && numero_componente === 4){
      return <DetalleObraAdmin
        obra={obra}
      />
    }else{
      return 'error 400'
    }
  }

  const paginaProv = () => {
    if(nivel_acceso === 1 && numero_componente === 0){
      return <ObrasDisponiblesProv
        guardarObra={guardarObra}
        obrasdisponibles={obrasdisponibles}
      />
    }else if(nivel_acceso === 1 && numero_componente === 1){
      return <PerfilProv
        perfil={perfil}
      />
    }else if(nivel_acceso === 1 && numero_componente === 2){   
      return <ObrasCotizadas              
        obrascotizadas={obrascotizadas}
      />
    }else if(nivel_acceso === 1 && numero_componente === 3){
      return <CotizarObraProv
        obra={obra}
        guardarActualizarCards={guardarActualizarCards}
      />
    }
    else{
      return 'error 400'
    }
  }

  const salirlogin = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('componente')
    guardarComponenteContx({
      nivel_acceso: null,
      numero_ventana: 0,
      numero_componente: null
    })
  }

  return (
    <div className={classes.root} align="center">
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <Menu />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" align="center" noWrap className={classes.title}>
            {
              nivel_acceso === 0 ? 'ADMINISTRACIÓN' : 'PROVEEDOR'
            }
          </Typography>
          <IconButton color="inherit">
            <Badge olor="secondary">
              <ExitToApp onClick={salirlogin} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <div>
            <img alt='PALA' style={{width: 160, right:'30%', marginRight:'5px'}} src={imagenes.imgjpg} />
          </div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        {
          nivel_acceso === 0
          ?
          <ListItemsAdmin   
            datosgenerales={datosgenerales}        
            guardarDatosGenerales={guardarDatosGenerales}
            guardarRowsObrasTotales={guardarRowsObrasTotales}
            guardarRowsObrasCotizadas={guardarRowsObrasCotizadas}     
            obrastotales={obrastotales}            
            guardarTipoBusqueda={guardarTipoBusqueda}      
          />
          :
          <ListItemsProv/>
        }
      </Drawer>
      
      <main className={classes.content}>
        
        <div className={classes.appBarSpacer} />   
        
        <img alt='PALA' style={{width: 170, marginTop:"20px"}} src={imagenes.imgjpg} />
         
            {
              nivel_acceso === 0 ? paginaAdmin() : paginaProv()
            }
      </main>
    </div>
  );
}