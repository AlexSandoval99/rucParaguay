const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Usa el puerto proporcionado por el entorno o 3000 para local

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de usar path.join para evitar problemas de ruta

// Ruta para la página de búsqueda
app.get('/', (req, res) => {
  res.render('inicio', { data: null, ruc: null }); // Asegúrate de que el archivo se llame "inicio.ejs"
});

// Ruta para buscar contribuyentes
app.get('/contribuyentes', async (req, res) => {
  const ruc = req.query.document_number;

  if (!ruc) {
    return res.status(400).send('Número de documento no proporcionado');
  }
  try {
    const response = await axios.get(`https://turuc.com.py/api/contribuyente/${ruc}`);
    console.log(ruc);
    res.render('inicio', {
      data: response.data.data,
      ruc: ruc
    });
  } catch (error) {
    console.error('Error al obtener los contribuyentes:', error.message);
    res.render('inicio', {
      data: null,
      ruc: ruc
    });
  }
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
