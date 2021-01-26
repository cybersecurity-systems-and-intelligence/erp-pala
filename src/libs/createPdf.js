import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { createDd } from './docdefinition'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export const createPDF = () => {
	const dd = {
		folio: 12345,
		fecha: '21-03-2001',
		obra: 'aguas calientes',
		usuario: 'luis y constructores S.A. de C.V.',
		creador: 'Dorian Mendoza',
		email: 'luis.ramirez@csiciber.com',
		contacto: 8712633867,
		vigencia: '23-02-2012',
		sostenimiento: '3 dias',
		condiciones: 'lo que sea',
		moneda: 'MXN',
		total: '12,420.00',
		totaliva: ' 14,407.20',
		materiales: [
			{
				Codigo: 12873,
				Descripcion: 'cemento para pvc sanitario lata de 400',
				Unidad: 'pza',
				Observacion: 'todo bien',
				Cantidad: 3,
				'Costo Unitario': 890,
				subtotal: 2670,
			},
			{
				Codigo: 12893,
				Descripcion: 'tuveria de pvc para agua',
				Unidad: 'mts',
				Observacion: 'todo chido',
				Cantidad: 10,
				'Costo Unitario': 15,
				subtotal: 150,
			},
			{
				Codigo: 871278,
				Descripcion: 'silla de mesa para exteriores',
				Unidad: 'pza',
				Observacion: 'se vende por separado',
				Cantidad: 80,
				'Costo Unitario': 120,
				subtotal: 9600,
			},
		],
	}

	return pdfMake.createPdf(createDd(dd)).open()
}
