import {Button, Dialog, DialogActions, DialogTitle, makeStyles, createMuiTheme} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles({
  md:{
    background:'#f1f8e9',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 10px 0px',
  }
})
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b3d233',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
});

export default function Modal({ openmodal, setOpenModal, guardarBandDatosApi}) {
  
  const css = useStyles()

  const handleClose = () => {
    guardarBandDatosApi(false)
    setOpenModal(false);
    
  };

  const handleAcept = () => {
    guardarBandDatosApi(true);
    setOpenModal(false);
  };

  return (
    <div >
      <Dialog
      
        open={openmodal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" 
        className={css.md}>
          {`✋🏻 ¿Estas seguro que quieres continuar?`}
        </DialogTitle>

        <ThemeProvider theme={theme}>
        <DialogActions >
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAcept} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}