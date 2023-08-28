const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hola mundo desde mi server en express')
})

app.listen(port,()=>{
  console.log('Puerto: '+ port)
})
