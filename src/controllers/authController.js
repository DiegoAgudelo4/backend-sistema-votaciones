const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Simulación de usuario con contraseña cifrada
const user = [
  {
    email: 'admin@example.com',
    password: bcrypt.hashSync('Clave_super_segura', 10),
    role: "ADMIN",
  },
  {
    email: 'client@example.com',
    password: bcrypt.hashSync('s', 10),
    role: "USER",
  },
];

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Credenciales recibidas: " + email, password);

    // Verificar si se enviaron email y password
    if (!email || !password) {
      res.status(400).json({ message: 'Debe enviar Usuario y Contraseña' });
      return;
    }

    // Buscar al usuario por email
    const foundUser = user.find(u => u.email === email);

    if (!foundUser) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    // Comparar la contraseña ingresada con la almacenada cifrada
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    // Generar el token JWT si la autenticación es correcta
    const token = jwt.sign({ email: foundUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: foundUser.role });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error en la petición' });
  }
};


module.exports = { login };
