// Start your server out with a hard-coded array of cart items, each including id, product, price, and quantity.
const express = require('express');
const app = express()

const cart = require('./cart.js');
// const cors = require("cors");

app.use(express.json());
const port = 3000;
// app.use(cors());

app.use('/cart-items', cart);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
