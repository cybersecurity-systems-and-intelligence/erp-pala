const Joi = require('joi')

//se crea el schema de las validaciones la cual tiene varias restricciones
const schema = Joi.object({    
    numerico: Joi.string()
        .pattern(new RegExp('^[0-9]{0,300}$')),
})

module.exports = {
    schema
}