import { useState } from 'react';
import {Switch, Grid, TextField, withStyles, FormControlLabel, Typography, createMuiTheme } from '@material-ui/core/'
import { ThemeProvider } from '@material-ui/styles';

import { formatCardFolioCoti } from '../../../libs/formatters'

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#b3d233',
      },
    },
  });
const SwitchPurple = withStyles({
	switchBase: {
		color: '#cddc39',
		'&$checked': {
			color: '#cddc39',
		},
		'&$checked + $track': {
			backgroundColor: '#99aa00',
		},
	},
	checked: {},
	track: {},
})(Switch)

const BuscadorObra = ({ obrascotizadas, guardarRows, guardarErrorConsulta }) => {
    const [ folio, guardarFolio ] = useState()
    const [ tipobusqueda, guardarTipoBusqueda ] = useState('Buscar por Folio Obra')
    
    const consulta_ = (folio_, band) => {
        
        let consulta = []
        if(band === 'Buscar por Folio Obra'){                               
            consulta = obrascotizadas.filter(row => row.folio_obra.startsWith(folio_))
        }else{                        
            consulta = obrascotizadas.filter(row => row.folio_cotizacion.startsWith(folio_))            
        }
        
        if(consulta.length === 0){
            guardarErrorConsulta(true)
            return
        }
        guardarErrorConsulta(false)
        const obrasCard = formatCardFolioCoti(consulta)
        
        guardarRows(obrasCard)
            
    }
	const handleChange = e => {
        
        const band = e.target.checked === false ? 'Buscar por Folio Obra' : 'Buscar por Folio Cotizacion'
        guardarTipoBusqueda(band)
        if (folio !== undefined)
            consulta_(folio, band)
    }
    
    const handleChangeFolio = e => {
        
        const folio_ = e.target.value
        if(folio_.trim() === ""){     
            guardarErrorConsulta(false)
            
            const obrasCard = formatCardFolioCoti(obrascotizadas)
            guardarRows(obrasCard)
            
           
        }else{
            consulta_(folio_, tipobusqueda)                        
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
                             
                <FormControlLabel
                    control={<SwitchPurple onChange={handleChange}></SwitchPurple>}
                    label={tipobusqueda}
                ></FormControlLabel>

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
