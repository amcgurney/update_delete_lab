const express = require('express');
const app = express();
const productsController = require('./controllers/product_controller.js')
const methodOverride = require('method-override');
// const allProducts = products.find();

const PORT = 4000;
// Set app
app.set('view engine', 'ejs');
// App.use for adding
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use('/products', productsController)
app.use((req, res, next) => {
    console.log("I'm running for another new route")
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
// Routes
app.get("/", function(req, res) {
    res.send("This is working! :)")
})
app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});
app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});