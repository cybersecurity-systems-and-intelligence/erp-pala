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
		el.Codigo = el.folioItem
		el.Descripcion = el.producto
		el.Unidad = el.unidad
		el.Observacion = el.anotaciones
		el.Cantidad = el.requeridos
		el['Costo Unitario'] = formatCurrency(el.costounitario)
		el.Subtotal = formatCurrency(el.subtotal)

		delete el.folioItem
		delete el.categoria
		delete el.subcategoria
		delete el.producto
		delete el.unidad
		delete el.requeridos
		delete el.costounitario
		delete el.anotaciones
		delete el.sostenimiento
		delete el.condiciones
		delete el.subtotal

		return el
	})
	return arrayFormated
}
