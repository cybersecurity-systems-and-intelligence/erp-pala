import { useState } from 'react';
import { Grid, TextField, Typography, createMuiTheme } from '@material-ui/core/'
import { ThemeProvider } from '@material-ui/styles';

import { formatCardFolioCoti } from '../../../../libs/formatters'

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
});


const BuscadorObra = ({ obrascotizadas, guardarRows, guardarErrorConsulta }) => {
        
    const [ folio, guardarFolio ] = useState()

    const consulta_ = (folio_) => {
        
        const consulta = obrascotizadas.filter(row => row.folio_cotizacion.toLowerCase().startsWith(folio_))
                
        if(consulta.length === 0){
            guardarErrorConsulta({bandError: true, msgError: 'No se ha encontrado'})
            return
        }
        guardarErrorConsulta({bandError: false, msgError: ''})
        const obrasCard = formatCardFolioCoti(consulta)
        
        guardarRows(obrasCard)
            
    }
    
    const handleChangeFolio = e => {
        
        const folio_ = e.target.value.toLowerCase()
        if(folio_.trim() === ""){     
            guardarErrorConsulta({bandError: false, msgError: ''})
            
            const obrasCard = formatCardFolioCoti(obrascotizadas)
            guardarRows(obrasCard)
                   
        }else{
            consulta_(folio_)                        
        }
        guardarFolio(folio_)
        
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
