// backend/controllers/authController.js
const db = require('../db');

const login = (req, res) => {
  const { usuario, contraseña } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error en el servidor' });

    if (results.length === 0) {
      return res.json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Comparación directa, podrías usar bcrypt si encriptas las contraseñas
    if (user.contraseña === contraseña) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: 'Contraseña incorrecta' });
    }
  });
};

module.exports = { login };
