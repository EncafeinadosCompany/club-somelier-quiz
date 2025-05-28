const { body, validationResult } = require('express-validator');

const validateCategory = [
    body('name')
        .notEmpty().withMessage('El nombre de la categoría es obligatoria'),
    // .matches(/^[a-zA-Záéíóúñ ]+$/).withMessage('Los caracteres no son validos'),

    body('description')
        .notEmpty().withMessage('La descripción de la categoría es obligatoria')
        .matches(/^[a-zA-Záéíóúñ ]+$/).withMessage('Los carácteres no son válidos'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateCategory
};
