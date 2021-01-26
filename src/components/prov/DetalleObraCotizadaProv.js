import {Fragment} from 'react';

const DetalleObraCotizadaProv = ({obra}) => {
    const {folio_obra, folio_cotizacion, correo_prov} = obra
    return (
        <Fragment>
            <h1>Folio Obra: {folio_obra}</h1>
            <h1>Folio Cotizacion: {folio_cotizacion}</h1>
            <h1>Correo proveedor: {correo_prov}</h1>
        </Fragment>
    );
}

export default DetalleObraCotizadaProv;