const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
})

const formatCurrency = x => {
	const currency = formatter.format(x)
	return currency
}

export const formatArray = arr => {
	const arrayFormated = arr.map(el => {
		el.Codigo = el.clave
		el.Descripcion = el.descripcion
		el.Unidad = el.unidad
		el.Cantidad = el.cantidad
		el['Costo Unitario'] = formatCurrency(el.costounitario)
		el.Subtotal = formatCurrency(el.subtotal)

		delete el.clave
		delete el.descripcion
		delete el.unidad
		delete el.cantidad
		delete el.costounitario
		delete el.sostenimiento
		delete el.condiciones
		delete el.subtotal

		return el
	})
	return arrayFormated
}

export const formatCardFolioObra = ( respObrasDisp ) => {
	const folioObra = respObrasDisp.map(obra => (
        {
        folioObra: obra.folio_obra,
        nombreObra: obra.nombre_obra
        }
    ))
	return folioObra
}

export const formatCardFolioCoti = (respObrasCoti) => {
	const folioCoti = respObrasCoti.map(obra => (
        {
        folioObra: obra.folio_obra,
        folioCotizacion: obra.folio_cotizacion,
        nombreObra: obra.nombre_obra,
        }
	))
	return folioCoti
}
