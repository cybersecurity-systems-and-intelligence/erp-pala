import { useState } from 'react';
import { Grid, TextField, Typography , createMuiTheme} from '@material-ui/core/'
import { ThemeProvider } from '@material-ui/styles';

import { formatCardFolioObra } from '../../../libs/formatters'

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
});


const BuscadorObra = ({ obrasdisponibles, guardarRows, guardarErrorConsulta }) => {
        
    const [ folio, guardarFolio ] = useState()

    const consulta_ = (folio_) => {
        
        const consulta = obrasdisponibles.filter(row => row.folio_obra.toLowerCase().startsWith(folio_))
                
        if(consulta.length === 0){
            guardarErrorConsulta(true)
            return
        }
        guardarErrorConsulta(false)
        const obrasCard = formatCardFolioObra(consulta)
        guardarRows(obrasCard)
            
    }
    
    const handleChangeFolio = e => {
        
        const folio = e.target.value.toLowerCase()
        if(folio.trim() === ""){     
            guardarErrorConsulta(false)                   
            const obrasCard = formatCardFolioObra(obrasdisponibles)   
            guardarRows(obrasCard)                       
        }else{
            consulta_(folio)                        
        }
        guardarFolio(folio)
        
    }

	return (
        <ThemeProvider theme={theme}>                  
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Typography component="h1" variant="h6" color="inherit" >Buscar por folio:</Typography>                  
                
                <TextField                                    
                    id="folio"
                    name="folio"
                    label="folio"
                    value={folio}
                    onChange={handleChangeFolio}       
                    color='secondary'                                                    
                />
            </Grid>
        </ThemeProvider>
	)
}

export default BuscadorObra
