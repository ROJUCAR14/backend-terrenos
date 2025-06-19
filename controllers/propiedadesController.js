const db = require('../db');

const obtenerPropiedades = (req, res) => {
  db.query('SELECT * FROM propiedades', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(p => ({ ...p, imagenes: JSON.parse(p.imagenes) })));
  });
};

const obtenerPropiedadPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM propiedades WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'No encontrado' });
    const propiedad = results[0];
    propiedad.imagenes = JSON.parse(propiedad.imagenes);
    res.json(propiedad);
  });
};

const agregarPropiedad = (req, res) => {
  const {
    titulo, tipo, operacion, precioSoles, precioUSD,
    departamento, distrito, direccion, area,
    descripcion, estado
  } = req.body;

  if (!titulo || !tipo || !operacion || !precioSoles || !precioUSD || !departamento ||
      !distrito || !direccion || !area || !descripcion || !estado || !req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Todos los campos y al menos una imagen son obligatorios' });
  }

  const imagenes = req.files.map(file => `/uploads/${file.filename}`);

  const nuevaPropiedad = {
    titulo, tipo, operacion, precioSoles, precioUSD,
    departamento, distrito, direccion, area,
    descripcion, estado,
    imagenes: JSON.stringify(imagenes)
  };

  const query = 'INSERT INTO propiedades SET ?';

  db.query(query, nuevaPropiedad, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...nuevaPropiedad });
  });
};

// Eliminar propiedad
const eliminarPropiedad = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM propiedades WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Propiedad eliminada correctamente' });
  });
};

// Actualizar propiedad
const actualizarPropiedad = (req, res) => {
  const { id } = req.params;
  const {
    titulo, tipo, operacion, precioSoles, precioUSD,
    departamento, distrito, direccion, area,
    descripcion, estado
  } = req.body;

  const query = `UPDATE propiedades SET ? WHERE id = ?`;
  const nuevaData = {
    titulo, tipo, operacion, precioSoles, precioUSD,
    departamento, distrito, direccion, area,
    descripcion, estado
  };

  db.query(query, [nuevaData, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Propiedad actualizada correctamente' });
  });
};

module.exports = {
  obtenerPropiedades,
  obtenerPropiedadPorId,
  agregarPropiedad,
  eliminarPropiedad,
  actualizarPropiedad
};


