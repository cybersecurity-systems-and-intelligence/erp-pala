const _ = require('lodash')

function buildTableBody(data, obj) {
	var body = []

	const columns = getColum(obj)

	body.push(columns)

	data.forEach(function (row) {
		var dataRow = []

		columns.forEach(function (column) {
			dataRow.push(row[column].toString())
		})

		body.push(dataRow)
	})

	return body
}

function ctable(data, obj) {
	return {
		table: {
			headerRows: 1,
			body: buildTableBody(data, obj),
		},
	}
}

const getColum = obj => {
	const objKeys = _.keysIn(obj[0])
	return objKeys
}

export { ctable }
