import { image64 } from '../asets/img/logo'
import { ctable } from './createTable'
import { formatArray } from './formatters'

const images = `data:image/png;base64,${image64}`

export const createDd = (data, tipo) => {
	console.log(data);
	const {
		folio_cotizacion,
		fecha_creacion,
		nombre_obra,
		nombre_prov,
		nombre_contacto_prov,
		correo_prov,
		contacto,
		dias_sostenimiento_propuesta,
		condiciones_comerciales,
		total,
		total_IVA,
	} = data[0]
	

	const arr = formatArray(data[0].materiales_cotizacion)

	const dd = {
		content: [
			{
				image: images,
				width: 100,
			},
			{
				text: '\n\n',
			},
			{
				text: [					
					{
						text: tipo,
					},
					{
						text: '\n',
					},
					{
						text: '\n',
					},
					{
						text: 'Cotizacion No:  ',
						style: 'titles',
					},
					{
						text: folio_cotizacion,
					},
					{
						text: '\n',
					},
					{
						text: 'fecha de cotizacion:  ',
						style: 'titles',
					},
					{
						text: fecha_creacion,
					},
					{
						text: '\n',
					},
					{
						text: 'Obra:  ',
						style: 'titles',
					},
					{
						text: nombre_obra,
					},
					{
						text: '\n',
					},
					{
						text: 'Empresa que elaboro la propuesta:  ',
						style: 'titles',
					},
					{
						text: nombre_prov,
					},
					{
						text: '\n',
					},
					{
						text: 'Elaboro:  ',
						style: 'titles',
					},
					{
						text: nombre_contacto_prov,
					},
					{
						text: '\n',
					},
					{
						text: 'correo:  ',
						style: 'titles',
					},
					{
						text: correo_prov,
					},
					{
						text: '\n',
					},
					{
						text: 'Numero de contacto:  ',
						style: 'titles',
					},
					{
						text: contacto,
					},
					{
						text: '\n',
					},
					{
						text: 'Días de sostenimiento de oferta:  ',
						style: 'titles',
					},
					{
						text: dias_sostenimiento_propuesta,
					},
					{
						text: '\n',
					},
					{
						text: 'Condiciones comerciales:  ',
						style: 'titles',
					},
					{
						text: condiciones_comerciales,
					},
					{
						text: '\n',
					},
					{
						text: 'Moneda:  ',
						style: 'titles',
					},
					{
						text: 'MXN',
					},
					{
						text: '\n',
					},
				],
			},
			{
				text: '\n\n',
			},
			[ctable(data[0].materiales_cotizacion, arr)],
			{
				text: '\n',
			},
			{
				stack: [
					{
						text: `Subtotal:  $${total}`,
						style: 'stackedRight',
					},
					{
						text: `Total Con IVA:  $${total_IVA}`,
						style: 'stackedRight',
					},
				],
			},
			{
				text: '\n\n',
			},
			{
				text: [
					{
						text: 'NOTA:  ',
						style: 'note',
					},
					{
						text:
							'Los precios seran expresados en moneda nacional, los precios deberan de ser antes de IVA ya que el sistema en el total agregara el IVA a todas las partidas. Importante confirmar precios y vigencia de los mismos ya que en estos mismos estaran basadas las ordenes de compra en caso de ser seleccionada su propuesta. Las entregas seran realizadas conforme a la instruccion de cada obra en donde viene informado el lugar de entrega.',
					},
				],
			},
		],

		// content: [ctable(data.materiales, arr)],
		styles: {
			titles: {
				bold: true,
			},
			stackedRight: {
				alignment: 'right',
			},
			note: {
				bold: true,
				fontSize: 16,
			},
		},
	}

	return dd
}
