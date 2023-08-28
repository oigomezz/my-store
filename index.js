const express = require('express');
const app = express();
const port = 5000;

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 1000
  },
  {
    id: 2,
    name: 'Product 2',
    price: 2000
  }
]

app.get('/', (req, res) => {
  res.send('Hola mundo desde mi server en express')
})

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/products/:id', (req, res) => {
  const {id} = req.params
  const result = products.filter(item => item.id == id)
  console.log(id, result)
  res.json(result);

})

app.listen(port,()=>{
  console.log('Puerto: '+ port)
})
