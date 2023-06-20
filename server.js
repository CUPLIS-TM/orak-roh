const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/location', (req, res) => {
  const locationData = req.body;
  console.log('Laporan lokasi diterima:', locationData);
  
  // Lakukan operasi atau simpan data ke database
  
  res.json({ message: 'Laporan lokasi diterima' });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
