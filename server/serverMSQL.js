import express from "express";
import mysql from 'mysql';
import cors from "cors";

const app = express();
const port = process.env.PORT || 3306 || 3000;

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: 'https://databases-auth.000webhost.com/index.php?route=/database/structure&db=id21031402_fotolog',
  user: 'id21031402_postgres',
  password: 'Ricardo.2019',
  database: 'id21031402_fotolog',
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
    pool.query('SELECT * FROM comentarios WHERE id_foto = ?', [idFoto], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error al obtener los comentarios.' });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error al obtener los comentarios.' });
  }
});

// Ruta para agregar un nuevo comentario
app.post('/api/comentarios', async (req, res) => {
  const { idFoto, comentario, nombre } = req.body;
  try {
    pool.query('INSERT INTO comentarios (id_foto, comentario, nombre) VALUES (?, ?, ?)', [idFoto, comentario, nombre], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error al agregar el comentario.' });
      } else {
        res.status(201).json({ message: 'Comentario agregado correctamente.' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error al agregar el comentario.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
