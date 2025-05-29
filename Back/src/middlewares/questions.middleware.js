const { body, validationResult } = require('express-validator');

const validateQuestion = [
  body('question')
    .trim()
    .notEmpty().withMessage('La pregunta es obligatoria')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ¿?¡!.,:;()\s]+$/).withMessage('La pregunta solo puede contener letras'),

  body('response')
    .notEmpty().withMessage('La respuesta es obligatoria')
    .toBoolean()
    .isBoolean().withMessage('La respuesta debe ser un valor booleano (true o false)'),

  body('level_id')
    .notEmpty().withMessage('El nivel es obligatorio')
    .isInt().withMessage('El nivel debe ser un número entero'),

body('categories')
  .isArray({ min: 1 }).withMessage('Debes proporcionar al menos una categoría')
  .custom((arr) => arr.every(Number.isInteger)).withMessage('Las categorías deben ser números enteros'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateQuestion
};
