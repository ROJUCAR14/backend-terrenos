const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
  obtenerPropiedades,
  obtenerPropiedadPorId,
  agregarPropiedad,
  actualizarPropiedad,
  eliminarPropiedad
} = require('../controllers/propiedadesController');

router.get('/', obtenerPropiedades);
router.get('/:id', obtenerPropiedadPorId);
router.put('/:id', actualizarPropiedad);
router.delete('/:id', eliminarPropiedad);

// Subida de múltiples imágenes
router.post('/', upload.array('imagenes'), agregarPropiedad);
router.put('/:id', upload.array('imagenes'), actualizarPropiedad);
module.exports = router;
