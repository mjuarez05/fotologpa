import express from "express";
import pg from 'pg';
import cors from "cors";

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: '10.1.4.49',
  database: 'fotolog',
  password: 'Ricardo.2019',
  port: 5432,
});

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

app.get('/', async (req, res) => {
  res.send("Holi");
});

// Ruta para obtener los comentarios de una foto específica
app.get('/api/comentarios/:idFoto', async (req, res) => {
  const { idFoto } = req.params;
  try {
    const client = await pool.connect();
    const comentarios = await client.query('SELECT * FROM comentarios WHERE id_foto = $1', [idFoto]);
    client.release();
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
    const client = await pool.connect();
    await client.query('INSERT INTO comentarios (id_foto, comentario, nombre) VALUES ($1, $2,$3)', [idFoto, comentario, nombre]);
    client.release();
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
