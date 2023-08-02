import * as React from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  Box,
  TextField,
  Container,
  Card,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";

export const HomePage = () => {
  const [fotoActual, setFotoActual] = React.useState(1);
  const [comentario, setComentario] = React.useState("");
  const [comentarios, setComentarios] = React.useState([]);
  const [nombre, setNombre] = React.useState("");

  const cantidadFotos = 200;
  
  const obtenerRutaFoto = (numeroFoto) => {
    const numeroFormateado = (numeroFoto + 12).toString().padStart(4, "0");
    return `/src/assets/100SANPH/SANY${numeroFormateado}.JPG`;
  };
  

  const mostrarFotoAnterior = () => {
    if (fotoActual > 1) {
      setFotoActual(fotoActual - 1);
    }
  };

  const mostrarFotoSiguiente = () => {
    if (fotoActual < cantidadFotos) {
      setFotoActual(fotoActual + 1);
    }
  };

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const enviarComentario = async () => {
    if (!comentario.trim()) {
      alert("Debes ingresar un comentario");
      return;
    }
    if (!nombre.trim()) {
      alert("Debes colocar un nombre");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/comentarios", {
        idFoto: fotoActual,
        comentario,
        nombre,
      });
      console.log("Comentario enviado correctamente");
      setComentario("");
    } catch (error) {
      console.error("Ocurrió un error al enviar el comentario:", error);
    }
  };

  const reciboComentarios = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/comentarios/${fotoActual}`
      );
      setComentarios(res.data);
    } catch (error) {
      console.error("Ocurrió un error al recibir los comentarios:", error);
    }
  };

  React.useEffect(() => {
    reciboComentarios();
    console.log(comentarios);
  }, [fotoActual]);



  return (
    <Grid
      container
      style={{
        backgroundColor: "crimson",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <Grid
        item
        xs={12}
        style={{ border: "10px solid black", backgroundColor: "gold" }}
      >
        <Box
          fontStyle='oblique'
          fontWeight='bold'
          color='black'
          textAlign='center'
        >
          <Typography variant='h2'>#P4ginA5 Am4R1LlaS**)|(</Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        {/* Sidebar izquierda */}
        <Paper
          elevation={3}
          style={{
            height: "100%",
            backgroundColor: "darkred",
            padding: "10px",
            marginTop: "5px",
          }}
        >
          <Typography variant='h5' textAlign='center'>
            Foto anterior
          </Typography>
          {fotoActual > 1 && (
            <>
              <img
                src={obtenerRutaFoto(fotoActual - 1)}
                alt='Foto anterior'
                width='100%'
              />
              {fotoActual > 2 && (
                <img
                  src={obtenerRutaFoto(fotoActual - 2)}
                  alt='Foto anterior'
                  width='100%'
                />
              )}
              {fotoActual > 3 && (
                <img
                  src={obtenerRutaFoto(fotoActual - 3)}
                  alt='Foto anterior'
                  width='100%'
                />
              )}
              {fotoActual > 4 && (
                <img
                  src={obtenerRutaFoto(fotoActual - 4)}
                  alt='Foto anterior'
                  width='100%'
                />
              )}
            </>
          )}
        </Paper>
      </Grid>

      <Grid item xs={8}>
        {/* Área principal */}
        <Container style={{ marginTop: "5px" }}>
          <Paper
            elevation={3}
            style={{
              height: "100%",
              backgroundColor: "darkred",
              padding: "50px",
            }}
          >
            <img
              src={obtenerRutaFoto(fotoActual)}
              alt='Foto actual'
              width='100%'
            />
            <Grid
              display='flex'
              justifyContent='space-around'
              alignItems='center'
            >
              <Button
                variant='text'
                style={{ color: "gold", fontWeight: "bold" }}
                onClick={mostrarFotoAnterior}
              >
                <ArrowBackIcon />
                Anterior
              </Button>
              <Button variant='text' onClick={() => setFotoActual(1)}>
                Volver al principio
              </Button>
              <Button
                variant='text'
                style={{ color: "gold", fontWeight: "bold" }}
                onClick={mostrarFotoSiguiente}
              >
                Siguiente <ArrowForwardIcon />
              </Button>
            </Grid>
            <Typography variant='h4' style={{ color: "gold", margin: "10px" }}>
              Deja tu comentario
            </Typography>
            <TextField
              label='Nombre'
              variant='standard'
              value={nombre}
              onChange={handleNombre}
              required
            />
            <TextField
              label='Comentario'
              variant='filled'
              style={{ borderRadius: "5px" }}
              value={comentario}
              onChange={handleComentarioChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <Button
              variant='text'
              style={{
                color: "whitesmoke",
                backgroundColor: "purple",
                marginTop: "5px",
              }}
              onClick={enviarComentario}
            >
              Enviar Comentario
            </Button>
            {/* Mostrar los comentarios para la foto actual */}
            <Typography variant='h6' style={{ marginTop: "20px" }}>
              Comentarios:
            </Typography>
            {comentarios.map((comentario) => (
              <Card
                key={comentario.id}
                variant='elevation'
                style={{ margin: "2px", backgroundColor: "gold" }}
              >
                <Typography variant='body1' style={{ color: "black" }}>
                  {comentario.id_foto === fotoActual
                    ? `${comentario.nombre}: ${comentario.comentario}`
                    : null}
                </Typography>
              </Card>
            ))}
          </Paper>
        </Container>
      </Grid>
      <Grid item xs={2}>
        {/* Sidebar derecha */}
        <Paper
          elevation={3}
          style={{
            height: "100%",
            backgroundColor: "darkred",
            padding: "10px",
            marginTop: "5px",
          }}
        >
          <Typography variant='h5' textAlign='center'>
            Foto siguiente
          </Typography>
          {fotoActual < cantidadFotos && (
            <>
              <img
                src={obtenerRutaFoto(fotoActual + 1)}
                alt='Foto siguiente'
                width='100%'
              />
              <img
                src={obtenerRutaFoto(fotoActual + 2)}
                alt='Foto siguiente'
                width='100%'
              />
              <img
                src={obtenerRutaFoto(fotoActual + 3)}
                alt='Foto siguiente'
                width='100%'
              />
              <img
                src={obtenerRutaFoto(fotoActual + 4)}
                alt='Foto siguiente'
                width='100%'
              />
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
