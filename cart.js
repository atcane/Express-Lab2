// const { request } = require('express');
const express = require('express');
const cart = express.Router();

const pool = require('./connection');

// // Hard-coded array
// const cartList = [
//     {id: 1, product: "juice", price: 3, quantity: 2},
//     {id: 2, product: "chips", price: 3, quantity: 1},
//     {id: 3, product: "ice cream", price: 4, quantity: 1},
//     {id: 4, product: "apples", price: 2, quantity: 3}
// ];

// GET /cart-items
cart.get("/", (req, res) => {
    pool.query('SELECT * FROM shopping_cart').then((result) => {
        res.json(result.rows)
    });

   let maxPrice = parseFloat(req.query.maxPrice) 
    if (maxPrice) {
        pool.query('SELECT * FROM shopping_cart WHERE price <= $1', [maxPrice]).then((result) => {
                res.json(result.rows);
        });
    }
    
    if (req.query.prefix) {
        pool.query('SELECT * FROM shopping_cart WHERE product LIKE $1', [req.query.prefix + "%"]).then((result) => {
        res.json(result.rows)
        });
    }

    if (req.query.pageSize) {
        pool.query('SELECT * FROM shopping_cart LIMIT $1', [req.query.pageSize]).then((result) => {
        res.json(result.rows)
        });
    }
        else{
            pool.query('SELECT * FROM shopping_cart').then((result) => {
                res.json(result.rows);
                });
        }
});

// GET /cart-items/:id
cart.get("/:id", (req, res) => {
   let id = parseInt(req.params.id);
    pool.query('SELECT * FROM shopping_cart WHERE id = $1', [id]).then((result) => {
        res.json(result.rows)
    });

    // if (!id) res.status(404).send('ID Not Found')
});

// POST /cart-items
cart.post("/", (req, res) => {
    console.log("Hi there")
    const product = req.body.product
    const price = parseFloat(req.body.price)
    const quantity = parseInt(req.body.quantity)

    pool.query("INSERT INTO shopping_cart (product, price, quantity) VAlUES ($1, $2, $3) RETURNING *", [product, price, quantity]).then(() => {
        // res.json(req.body)
        res.status(201);
        res.json(results.rows);
                })
        });

// PUT /cart-items/:id
cart.put("/:id", (req, res) => {
    const id = req.params.id;
    const product = req.body.product
    const price = parseFloat(req.body.price)
    const quantity = parseInt(req.body.quantity)

    pool.query('UPDATE shopping_cart SET product = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *', [product, price, quantity, id]).then((results) => {
        res.json(result.rows)
    });

});

// DELETE /cart-items/:id
cart.delete("/:id", (req, res) => {
    // let id = parseInt(req.params.id);
    pool.query('DELETE FROM shopping_cart WHERE id = $1', [req.params.id]).then(() => {
        res.sendStatus(204)
        });
    });

module.exports = cart;