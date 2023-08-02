import express from "express";
import pg from 'pg';
import cors from "cors";

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'qolqcchuhwnnbt',
  host: 'ec2-35-169-9-79.compute-1.amazonaws.com',
  database: 'd53a2dsoeh850o',
  password: '471efcdfccd14d6c653fff9c7b6fd3df01d553aea31b659799bdcdb8d9bd22ab',
  port: 5432,
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send("Holi");
});

// Ruta para obtener los comentarios de una foto específica
app.get('/api/comentarios/:idFoto', async (req, res) => {
  const { idFoto } = req.params;
  try {
    const comentarios = await pool.query('SELECT * FROM comentarios WHERE id_foto = $1', [idFoto]);
    res.json(comentarios.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error al obtener los comentarios.' });
  }
});

// Ruta para agregar un nuevo comentario
app.post('/api/comentarios', async (req, res) => {
  const { idFoto, comentario, nombre } = req.body;
  try {
    await pool.query('INSERT INTO comentarios (id_foto, comentario, nombre) VALUES ($1, $2,$3)', [idFoto, comentario, nombre]);
    res.status(201).json({ message: 'Comentario agregado correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error al agregar el comentario.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
