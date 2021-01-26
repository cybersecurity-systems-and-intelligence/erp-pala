import { Fragment } from 'react';
import { makeStyles, Typography, List, ListItem, ListItemText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
  
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

export default function Resumen({datos}) {
  const classes = useStyles();  
  const { nombreMoralFisica, rfc, direccionFiscal, direccionOficina } = datos
  const { calleReferencia1, calleReferencia2, cp, colonia, ciudad, estado } = datos  
  const { correo, nombreContacto, telefonoFijo, telefonoMovil} = datos
  const { numeroClave, cuenta, razonSocial } = datos

  return (
    <Fragment>
      <Typography align="center">
                    <h3 className={classes.rb1} >RESUMEN DE DATOS<hr className={classes.hr}/></h3> 
                    </Typography>
     
      <List disablePadding>
        <ListItem className={classes.listItem} key={nombreMoralFisica}>
          <ListItemText primary='Nombre de Empresa o Persona Fisica' secondary={nombreMoralFisica} />
        </ListItem>
        <ListItem className={classes.listItem} key={'rfc'}>
          <ListItemText primary='RFC' secondary={rfc} />
        </ListItem>
        <ListItem className={classes.listItem} key={'direccionFiscal'}>
          <ListItemText primary='Direccion Fiscal' secondary={direccionFiscal} />
        </ListItem>
        <ListItem className={classes.listItem} key={'direccionOficina'}>
          <ListItemText primary='Direccion Oficina' secondary={direccionOficina} />
        </ListItem>
        <ListItem className={classes.listItem} key={'calleReferencia1'}>
          <ListItemText primary='Calle Referencia 1' secondary={calleReferencia1} />
        </ListItem>
        <ListItem className={classes.listItem} key={'calleReferencia2'}>
          <ListItemText primary='Calle Referencia 2' secondary={calleReferencia2} />
        </ListItem>
        <ListItem className={classes.listItem} key={'cp'}>
          <ListItemText primary='Codigo Postal' secondary={cp} />
        </ListItem>
        <ListItem className={classes.listItem} key={'colonia'}>
          <ListItemText primary='Colonia' secondary={colonia} />
        </ListItem>
        <ListItem className={classes.listItem} key={'ciudad'}>
          <ListItemText primary='Ciudad' secondary={ciudad} />
        </ListItem>
        <ListItem className={classes.listItem} key={'estado'}>
          <ListItemText primary='Estado' secondary={estado} />
        </ListItem>
        <ListItem className={classes.listItem} key={'correo'}>
          <ListItemText primary='Correo Electronico' secondary={correo} />
        </ListItem>
        <ListItem className={classes.listItem} key={'nombreContacto'}>
          <ListItemText primary='Nombre de Contacto' secondary={nombreContacto} />
        </ListItem>
        <ListItem className={classes.listItem} key={'telefonoFijo'}>
          <ListItemText primary='Telefono Fijo' secondary={telefonoFijo} />
        </ListItem>
        <ListItem className={classes.listItem} key={'telefonoMovil'}>
          <ListItemText primary='Telefono Movil' secondary={telefonoMovil} />
        </ListItem>
        <ListItem className={classes.listItem} key={'numeroClave'}>
          <ListItemText primary='Numero de Clave' secondary={numeroClave} />
        </ListItem>
        <ListItem className={classes.listItem} key={'cuenta'}>
          <ListItemText primary='Cuenta' secondary={cuenta} />
        </ListItem>
        <ListItem className={classes.listItem} key={'razonSocial'}>
          <ListItemText primary='Razon Social' secondary={razonSocial} />
        </ListItem>
      </List>      
    </Fragment>
  );
}