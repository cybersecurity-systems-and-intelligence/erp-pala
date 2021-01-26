import { image64 } from '../images/logo'
import { ctable } from './createTable'

const images = `data:image/png;base64,${image64}`

export const createDd = data => {
	const {
		folio,
		fecha,
		obra,
		usuario,
		creador,
		email,
		contacto,
		vigencia,
		sostenimiento,
		condiciones,
		moneda,
		total,
		totaliva,
	} = data

	const arr = data.materiales

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
						text: 'Cotizacion No:  ',
						style: 'titles',
					},
					{
						text: folio,
					},
					{
						text: '\n',
					},
					{
						text: 'fecha:  ',
						style: 'titles',
					},
					{
						text: fecha,
					},
					{
						text: '\n',
					},
					{
						text: 'Obra:  ',
						style: 'titles',
					},
					{
						text: obra,
					},
					{
						text: '\n',
					},
					{
						text: 'Empresa que elaboro la propuesta:  ',
						style: 'titles',
					},
					{
						text: usuario,
					},
					{
						text: '\n',
					},
					{
						text: 'Elaboro:  ',
						style: 'titles',
					},
					{
						text: creador,
					},
					{
						text: '\n',
					},
					{
						text: 'correo:  ',
						style: 'titles',
					},
					{
						text: email,
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
						text: 'Fecha de vigencia de la propuesta:  ',
						style: 'titles',
					},
					{
						text: vigencia,
					},
					{
						text: '\n',
					},
					{
						text: 'Días de sostenimiento de oferta:  ',
						style: 'titles',
					},
					{
						text: sostenimiento,
					},
					{
						text: '\n',
					},
					{
						text: 'Condiciones comerciales:  ',
						style: 'titles',
					},
					{
						text: condiciones,
					},
					{
						text: '\n',
					},
					{
						text: 'Moneda:  ',
						style: 'titles',
					},
					{
						text: moneda,
					},
					{
						text: '\n',
					},
				],
			},
			{
				text: '\n\n',
			},
			[ctable(data.materiales, arr)],
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
						text: `Total Con IVA:  $${totaliva}`,
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
