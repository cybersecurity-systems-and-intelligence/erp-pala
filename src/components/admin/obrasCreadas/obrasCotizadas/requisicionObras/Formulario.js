import React, { useState } from 'react';
import { FormControl, InputLabel, Select, makeStyles, MenuItem, FormHelperText  } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const Formulario = () => {

    const classes = useStyles()

    const impuestos = [
        { id: 1, tipo: 'I.V.A', porcentaje: '16' },
        { id: 2, tipo: 'I.V.A. ( ZONA FRONTERIZA )', porcentaje: '8' },
        { id: 3, tipo: 'RETENCION I.V.A.', porcentaje: '4' },
        { id: 4, tipo: 'RETENCION I.V.A. POR SERV., PROF., 2/3 PARTES', porcentaje: '10.66' },
        { id: 5, tipo: 'RETENCION ISR X SERV., PROFESIONALES', porcentaje: '10' },
        { id: 6, tipo: 'RETENCION ISR X ARRENDAMIENTO', porcentaje: '10' },
        { id: 7, tipo: 'I.V.A. X ARRENDAMIENTO 2/3 PARTES', porcentaje: '10.66' },
    ]

    const [ impuesto, guardarImpuestos ] = useState({
        id: '',
        tipo: '',
        porcentaje: ''
    })

    const { id } = impuesto

    const handleChange = e => { 
        
        const Respimpuesto = impuestos.filter(impuesto => impuesto.id === e.target.value)

        guardarImpuestos(Respimpuesto[0])
    }

    return (        
        <FormControl className={classes.formControl}>
            <InputLabel id="impuestos">Impuesto</InputLabel>
                <Select
                    labelId="impuestos"
                    id="impuestos"
                    name='impuestos'
                    value={id}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        impuestos.map(impuesto => (
                            <MenuItem value={impuesto.id}>{ impuesto.tipo }: { impuesto.porcentaje }%</MenuItem>
                        ))
                    }
                </Select>
            <FormHelperText>Selecciona el impuesto que sera aplicado a la hora de generar la orden de compra</FormHelperText>
        </FormControl>
    );
}


export default Formulario;