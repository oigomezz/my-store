const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hola mundo desde mi server en express')
})

app.get('/products', (req, res) => {
  const products = []
  for (let i = 0; i<100;i++) {
    products.push({
      id: i,
      nombre: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url()
    })
  }
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
