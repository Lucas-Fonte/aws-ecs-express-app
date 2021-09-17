'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

const app = express();

app.get('/health', (req, res) => {
  res.json({
    health: true,
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
