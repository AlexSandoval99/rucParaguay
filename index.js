const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Usa el puerto proporcionado por el entorno o 3000 para local

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Asegúrate de que tus vistas estén en el directorio correcto

// Ruta para la página de búsqueda
app.get('/', (req, res) => {
  res.render('inicio', { data: null, ruc:null }); // Renderiza la vista con datos nulos por defecto
});

// Ruta para buscar contribuyentes
app.get('/contribuyentes', async (req, res) => {
  const ruc = req.query.document_number; // Obtén el número de documento del parámetro de consulta

  if (!ruc) {
    return res.status(400).send('Número de documento no proporcionado');
  }
  try {
    const response = await axios.get(`https://turuc.com.py/api/contribuyente/${ruc}`);
    console.log(ruc);
    res.render('inicio', {
      data: response.data.data, // Asegúrate de que `response.data.data` es la estructura correcta
      ruc: ruc
    });
  } catch (error) {
    console.error('Error al obtener los contribuyentes:', error.message);
    res.render('inicio', {
        data: null, // Asegúrate de que `response.data.data` es la estructura correcta
        ruc: ruc
      });
  }
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
