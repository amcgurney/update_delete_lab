const express = require('express');
const router = express.Router();
const products = require('../models/product_model.js')
router.get('/', (req, res) => {
    const allProducts = products.find();
    /*
    1. the first param of render() is the .ejs file
    that we want to inject data into.
    2. the second param is the data that we want
    to inject into the .ejs file (it must be an object)
    */
    /*
    there will be a variable available inside
    the show.ejs file called product,
    and its value the foundItem
   */
    const context = { products: allProducts };
    res.render('index.ejs', context);
});
router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    products.create(req.body, (error, createdProduct) => {
        if(error) console.log(error);
        console.log(createdProduct);
        res.redirect("/products");
    })
})
router.get("/new", function(req, res) {
    res.render("new.ejs")
})
// show route
// this route will catch GET requests to /products/index/ and respond with a single product
router.get('/:productId', (req, res) => {
    products.findById(req.params.productId, (error, foundProduct) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
        }
        /*
        1. the first param of render() is the .ejs file
        that we want to inject data into.
        2. the second param is the data that we want
        to inject into the .ejs file (it must be an object)
        */
        /*
        there will be a variable available inside
        the show.ejs file called product,
        and its value the foundItem
       */
        res.render('show.ejs', {product: foundProduct});
    });
});
router.delete('/:productId', (req, res) => {
    products.findByIdAndDelete(req.params.productId, (error, deleteProduct) => {
        if(error) {
            console.log(error);
            res.send(error);
        }
        console.log(deleteProduct);
        res.redirect('/products')
    })
})
router.get('/:productId/edit', (req, res) => {
    products.findById(req.params.productId, (error, updatedProduct) => {
        if(error) console.log(error);
        console.log(updatedProduct);
        res.render('edit.ejs', { product: updatedProduct})
    })
})
router.put('/:productId', (req, res) => {
    console.log(`The request is ${req}`)
    // console.log(`The request's body is ${req.body}`)
    products.findByIdAndUpdate(req.params.productId, req.body,(error, updatedProduct) => {
        if (error) return console.log(error);
        console.log(updatedProduct);
        return res.redirect(`/products`);
    });
});
module.exports = router;