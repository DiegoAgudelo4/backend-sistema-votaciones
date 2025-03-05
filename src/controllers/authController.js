const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Simulación de usuario con contraseña cifrada
const user = {
  email: 'admin@example.com',
  password: bcrypt.hashSync('Clave_super_segura', 10),
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el email coincide con el usuario simulado
  if (email !== user.email) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Comparar la contraseña ingresada con la almacenada cifrada
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Generar el token JWT si la autenticación es correcta
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

module.exports = { login };
