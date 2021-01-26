import { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { guardarLS } from '../libs/guardarLS'
import { makeStyles, Avatar, CssBaseline, Drawer, AppBar, Toolbar, List } from '@material-ui/core';
import { Typography, Divider, IconButton, Badge } from '@material-ui/core/';
import { Menu, ChevronLeft, ExitToApp } from '@material-ui/icons';
import imagenes from '../asets/img/imagenes';

import ListItemsAdmin from './admin/ListItemsAdmin';
import PerfilAdmin from './admin/PerfilAdmin'
import CrearObraAdmin from './admin/CrearObraAdmin'
//import ObrasCreadasAdmin from './admin/ObrasCreadasAdmin'
import ObrasCotizadasAdmin from './admin/ObrasCotizadasAdmin'
import DetalleObraAdmin from './admin/DetalleObraAdmin'

import ListItemsProv from './prov/ListItemsProv'
import PerfilProv from './prov/PerfilProv'
// import ObrasDisponiblesProv from './prov/ObrasDisponiblesProv'
// import ObrasCotizadasProv from './prov/ObrasCotizadasProv'
import CotizarObraProv from './prov/CotizarObraProv'
import DetalleObraCotizadaProv from './prov/DetalleObraCotizadaProv'

import Obras from './Obras'

import {ComponenteContext} from '../context/ComponenteContext'

//import {correoJwt} from '../funciones/decodificarJwt'

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
      //width: theme.spacing({drawerWidth}),
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
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  
  const resultado = JSON.parse(localStorage.getItem('jwt'))
  const decoded = jwt_decode(resultado)
  

  const classes = useStyles()

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

  const { nivel_acceso, numero_componente } = componentecontx  

  //const componente_ls = JSON.parse(localStorage.getItem('componente'))  
  
  // const [ componente, guardarComponente ] = useState({
  //   nivel_acceso: componente_ls.nivel_acceso,
  //   numero_componente: componente_ls.numero_componente
  // })

  // const { nivel_acceso, numero_componente } = componente

  const [open, setOpen] = useState(true);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  const [ obrasdisponibles, guardarObrasDisponibles ] = useState([])
  const [ obrascotizadas, guardarObrasCotizadas ] = useState([])
  const [ obrastotales, guardarObrasTotales ] = useState([])
  const [ rowsobrasdisponibles, guardarRowsObrasDisponibles ] = useState([])
  const [ rowsobrascotizadas, guardarRowsObrasCotizadas ] = useState([])
  const [ rowsobrastotales, guardarRowsObrasTotales ] = useState([])
  const [ actualizarcards, guardarActualizarCards ] = useState(0)
  const [ paginaactual, guardarPaginaActual ] = useState(0)
  const [ page, setPage ] = useState(1);    
  const [ cantidadcards, guardarCantidadCards ] = useState(12)
  const [ paginafinal, guardarPaginaFinal ] = useState(cantidadcards)
  const [ tipobusqueda, guardarTipoBusqueda ] = useState('Buscar por Folio Obra')
  const [ perfil, guardarPerfil ] = useState({})
  const [ errorconsulta, guardarErrorConsulta ] = useState(false)

  useEffect(() => {
    
    const consultarAPI = async () => {
      if( nivel_acceso === 0){        
        const respObrasTotales = await axios.get('https://apicotizacion.herokuapp.com/api/obras')
        const obrasTotales = respObrasTotales.data.Obras.map(obra => (
          {
            folioObra: obra.folio_obra,
            nombreObra: obra.nombre_obra                    
          }
        ))
        guardarObrasTotales(respObrasTotales.data.Obras)
        guardarRowsObrasTotales(obrasTotales)
      }else if (nivel_acceso === 1){
        const respObrasDisp = await axios.get('https://apicotizacion.herokuapp.com/api/obras/vigentes')
        const respObrasCoti = await axios.get(`https://apicotizacion.herokuapp.com/api/cotizaciones/cotizadas/${decoded.correo}`)
        const respPerfil = await axios.get(`https://apicotizacion.herokuapp.com/api/proveedores/datos_personales/${decoded.correo}`)
        const obrasDisp = respObrasDisp.data.Obras.map(obra => (
          {
            folioObra: obra.folio_obra,
            nombreObra: obra.nombre_obra                    
          }
        ))
        const obrasCoti = respObrasCoti.data.Obras.map(obra => (
          {
            folioObra: obra.folio_obra,
            folioCotizacion: obra.folio_cotizacion,
            nombreObra: obra.nombre_obra,                   
          }
        ))
        guardarObrasDisponibles(respObrasDisp.data.Obras)
        guardarObrasCotizadas(respObrasCoti.data.Obras)
        guardarRowsObrasDisponibles(obrasDisp)
        guardarRowsObrasCotizadas(obrasCoti)
        guardarPerfil(respPerfil.data.datos_personales)
      }
    }
    consultarAPI()
    //eslint-disable-next-line
  }, [actualizarcards])
  //const [ numerocomponentedashboardadmin, guardarNumeroComponenteDashboardAdmin ] = useState(0)
  //const [ numerocomponentedashboardprov, guardarNumeroComponenteDashboardProv ] = useState(0)  
  const [ obra, guardarObra ] = useState({})

  const paginaAdmin = () => {
    if (nivel_acceso === 0 && numero_componente === 0){
      return <CrearObraAdmin
        //guardarComponente={guardarComponente}
        //componente={componente}
        guardarActualizarCards={guardarActualizarCards}
      />
    }else if (nivel_acceso === 0 && numero_componente === 1){
      return <PerfilAdmin
        correo={decoded.correo}
      />
    }else if (nivel_acceso === 0 && numero_componente === 2){
      return <Obras        
        titulo={<h5>OBRAS CREADAS<hr className={classes.hr}/></h5>}
        siguientecomponente={3}
        guardarObra={guardarObra}
        rows={rowsobrastotales}  
        guardarRows={guardarRowsObrasTotales}      
        obrastotal={obrastotales}     
        totalpaginas={Math.ceil(rowsobrastotales.length/cantidadcards)} 
        paginaactual={paginaactual}  
        guardarPaginaActual={guardarPaginaActual}
        paginafinal={paginafinal}
        guardarPaginaFinal={guardarPaginaFinal}
        page={page}
        setPage={setPage}
        cantidadcards={cantidadcards}
        bandObrasCotizadas={false}
        tipobusqueda={tipobusqueda}
        guardarTipoBusqueda={guardarTipoBusqueda}
        seleccionpor={'obra'}
        errorconsulta={errorconsulta}
        guardarErrorConsulta={guardarErrorConsulta}
      />
    }else if (nivel_acceso === 0 && numero_componente === 3){
      return <ObrasCotizadasAdmin
        obra={obra}
        guardarObra={guardarObra}
        rowsobrascotizadas={rowsobrascotizadas}      
        guardarRowsObrasCotizadas={guardarRowsObrasCotizadas}        
        obrascotizadas={obrascotizadas}
        guardarObrasCotizadas={guardarObrasCotizadas}        
        paginaactual={paginaactual}  
        guardarPaginaActual={guardarPaginaActual}
        paginafinal={paginafinal}
        guardarPaginaFinal={guardarPaginaFinal}
        page={page}
        setPage={setPage}
        cantidadcards={cantidadcards}
        bandObrasCotizadas={true}
        tipobusqueda={tipobusqueda}
        guardarTipoBusqueda={guardarTipoBusqueda}
        errorconsulta={errorconsulta}
        guardarErrorConsulta={guardarErrorConsulta}
      />
    }else if (nivel_acceso === 0 && numero_componente === 4){
      return <DetalleObraAdmin
        obra={obra}
      />
      //return `La Obra es: ${obra.folio_obra} \nLa cotizacion es: ${obra.folio_cotizacion}`
    }else{
      return 'error 400'
    }
    /*
    switch (numerocomponentedashboardadmin){
      case 0:
        return <CrearObraAdmin
          guardarNumeroComponenteDashboardAdmin={guardarNumeroComponenteDashboardAdmin}
        />
      case 1:
        return <PerfilAdmin/>
      case 2:
        return <ObrasCreadasAdmin/>
      default:
        return 'error 400'
    }
    */
  }

  const paginaUsuario = () => {
    if(nivel_acceso === 1 && numero_componente === 0){
      return <Obras
        // guardarComponente={guardarComponente}
        // componente={componente}
        titulo={<h5>OBRAS DISPONIBLES<hr className={classes.hr}/></h5>}
        siguientecomponente={3}
        guardarObra={guardarObra}
        rows={rowsobrasdisponibles}  
        guardarRows={guardarRowsObrasDisponibles}            
        obrastotal={obrasdisponibles}
        totalpaginas={Math.ceil(rowsobrasdisponibles.length/cantidadcards)}   
        paginaactual={paginaactual}  
        guardarPaginaActual={guardarPaginaActual}
        paginafinal={paginafinal}
        guardarPaginaFinal={guardarPaginaFinal}
        page={page}
        setPage={setPage}
        cantidadcards={cantidadcards}
        bandObrasCotizadas={false}
        tipobusqueda={tipobusqueda}
        guardarTipoBusqueda={guardarTipoBusqueda}
        seleccionpor={'obra'}
        errorconsulta={errorconsulta}
        guardarErrorConsulta={guardarErrorConsulta}
      />
    }else if(nivel_acceso === 1 && numero_componente === 1){
      return <PerfilProv
        perfil={perfil}
      />
    }else if(nivel_acceso === 1 && numero_componente === 2){
      //return <ObrasCotizadasProv/>      
      return <Obras
        // guardarComponente={guardarComponente}
        // componente={componente}
        titulo={<h5>OBRAS COTIZADAS<hr className={classes.hr}/></h5>}
        siguientecomponente={4}
        guardarObra={guardarObra}
        rows={rowsobrascotizadas}      
        guardarRows={guardarRowsObrasCotizadas}        
        obrastotal={obrascotizadas}
        totalpaginas={Math.ceil(rowsobrascotizadas.length/cantidadcards)} 
        paginaactual={paginaactual}  
        guardarPaginaActual={guardarPaginaActual}
        paginafinal={paginafinal}
        guardarPaginaFinal={guardarPaginaFinal}
        page={page}
        setPage={setPage}
        cantidadcards={cantidadcards}
        bandObrasCotizadas={true}
        tipobusqueda={tipobusqueda}
        guardarTipoBusqueda={guardarTipoBusqueda}
        seleccionpor={'obra'}
        errorconsulta={errorconsulta}
        guardarErrorConsulta={guardarErrorConsulta}
      />
    }else if(nivel_acceso === 1 && numero_componente === 3){
      return <CotizarObraProv
        // guardarComponente={guardarComponente}
        // componente={componente}
        obra={obra}
        guardarActualizarCards={guardarActualizarCards}
      />
    }else if(nivel_acceso === 1 && numero_componente === 4){
      return <DetalleObraCotizadaProv
        obra={obra}
      />
    }
    else{
      return 'error 400'
    }
    /*
    switch (numerocomponentedashboardprov) {
      case 0:
        return <ObrasDisponiblesProv
          guardarNumeroComponenteDashboardProv={guardarNumeroComponenteDashboardProv}         
          guardarObra={guardarObra}
        />
      case 1:
        return <PerfilProv/>
      case 2:
        return <ObrasCotizadasProv/>
      case 3:
        return <CotizarObraProv
          guardarNumeroComponenteDashboardProv={guardarNumeroComponenteDashboardProv}          
          obra={obra}
        />
      default:
        return 'error 400'
    }
    */
  }

  const salirlogin = () => {
    //guardarLS("", "", "")
    localStorage.removeItem('jwt')
    localStorage.removeItem('componente')
    guardarComponenteContx({
      nivel_acceso: null,
      numero_ventana: 0,
      numero_componente: null
    })
    /*const objeto = {
      nivel_acceso: 0,
      numero_componente: 0,
      numero_ventana: 0
    }
    localStorage.setItem('componente', JSON.stringify(objeto))

    guardarComponenteContx({
      nivel_acceso: 0,
      numero_ventana: 0,
      numero_componente: 0
    })
    */

    //guardarNumeroComponente(0)    
  }

  return (
    <div className={classes.root}  align="center">
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
            <img style={{width: 160, right:'30%', marginRight:'5px'}} src={imagenes.imgjpg} />
          </div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        {
          nivel_acceso === 0
          ?
          <ListItemsAdmin
            guardarPaginaActual={guardarPaginaActual}
            setPage={setPage}
            guardarRowsObrasTotales={guardarRowsObrasTotales}
            guardarRowsObrasCotizadas={guardarRowsObrasCotizadas}     
            obrastotales={obrastotales}            
            guardarTipoBusqueda={guardarTipoBusqueda}            
            guardarErrorConsulta={guardarErrorConsulta}
          />
          :
          <ListItemsProv
            guardarPaginaActual={guardarPaginaActual}
            setPage={setPage}
            obrasdisponibles={obrasdisponibles}
            guardarRowsObrasDisponibles={guardarRowsObrasDisponibles}                  
            obrascotizadas={obrascotizadas}
            guardarRowsObrasCotizadas={guardarRowsObrasCotizadas}            
            guardarTipoBusqueda={guardarTipoBusqueda}
            guardarErrorConsulta={guardarErrorConsulta}
          />
        }
      </Drawer>
      
      <main className={classes.content}>
        
        <div className={classes.appBarSpacer} />   
        
      <img style={{width: 170, marginTop:"20px"}} src={imagenes.imgjpg} />
         
            {
              nivel_acceso === 0 ? paginaAdmin() : paginaUsuario()
            }
      </main>
    </div>
  );
}