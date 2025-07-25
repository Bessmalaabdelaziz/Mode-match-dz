const express = require('express');
const app = express();
const path = require('path');

// Sert tous les fichiers dans le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Lance le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur Node.js fonctionne sur http://localhost:${PORT}`);
});
