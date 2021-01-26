import { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles,} from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    overflow: '2',
    
  },
  paper: {
    marginTop: '50px',
    maxWidth: 650,
    margin: `${theme.spacing(1)}px auto`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    background: 'white',
    borderRadius: '10px 10px 10px 10px',
  },


  rb1:{
    alignItems: 'center',
    textAlign: 'center'
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
    marginTop:'1px',
    alignItems: 'center',
    textAlign: 'center'
   },

}));

export default function DatosPersonales({perfil}) {
  const classes = useStyles();

  const { correo_prov, nombre_contacto_prov, telefono_fijo_prov, telefono_movil_prov } = perfil  

  

  return (
    <div className={classes.paper}>
    <Fragment>
    <Typography>
      <h3 className={classes.rb1} >DATOS PERSONALES <hr className={classes.hr}/></h3> 
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled = {true}
            id="correo_prov"
            name="correo_prov"
            label="Correo"
            value={''+correo_prov}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled = {true}
            id="nombre_contacto_prov"
            name="nombre_contacto_prov"
            label="Nombre contacto"
            value={''+nombre_contacto_prov}
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12}  sm={6}>
          <TextField
            disabled = {true}
            id="telefono_fijo_prov"
            name="telefono_fijo_prov"
            label="Telefono fijo"
            value={''+telefono_fijo_prov}
            fullWidth
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled = {true}
            id="telefono_movil_prov"
            name="telefono_movil_prov"
            label="Telefono celular"
            value={''+telefono_movil_prov}
            fullWidth           
          />
        </Grid>
        
      </Grid>
      

    </Fragment>
    </div>
  );
}
