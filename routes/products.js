var express = require('express');
var router = express.Router();
//const Product = require('../models/product');
let productModel = require('../models/product');



      /* GET users listing. */

    router.post("/", async function (req, res, next) {
        const product = new productModel({
        id: req.body.id, //Extra el Id pasado por el body
        description: req.body.description,
        name: req.body.name,
        price: req.body.price,
        images: req.body.images
        });
        const result = await product.save(); // Lo guarda en Mongo
        res.json('Registro Agregado exitosamente');
    });


    //Listado de todos los productos
    router.get("/", async function (req, res, next) {
      const resultado = await productModel.find();
      res.json(resultado);
    });


    router.delete("/:id", async function (req, res, next) {
      try {
        // Buscar un producto por ID y regresa el primer resultado
        const product = await Product.findById(req.params.id);
        // Si se encontró lo elimina
        if (product != null) {
          await product.deleteOne();
          res.json("Eliminando producto");
        } else {
          res.json({ error: "No se encontró el producto con Id " + req.params.id });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    

    router.put("/", async function (req, res, next) {
      const filter = {id: req.query.id}; //Condición de Query
      const update = {name: req.query.name}; //Campos a modificar
      const resultado = await productModel.findOneAndUpdate(filter,
      update, {
      new:true,
      upsert: true
      });
      res.json("Se actualiza el producto");
    });


    


      
      router.get('/', function(req, res, next) {
        res.send('Lista todos los productos');
      });

      router.post("/", function (req, res, next) {
        let data = [
        {"status": "200", "mensaje":"Ok"},
        {
        "id": req.body.id,
        "name": req.body.name,
        "description": req.body.description,
        "price":req.body.price,
        "images":""
        }]
        res.json(data);
        });

        router.put("/:id", function (req, res, next) {
          res.json("Modificando producto " + req.params.id);
          });
          
        router.delete("/:id", function (req, res, next) {
          res.json("Eliminando producto " + req.params.id);
          });

    


/*
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});


// Ruta para obtener un producto por su ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para actualizar un producto existente por su ID
router.put('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar un producto existente por su ID
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener un producto por su ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

*/

module.exports = router;
