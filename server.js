
const iniciarServidor = async () => {
  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
  }
};

iniciarServidor();