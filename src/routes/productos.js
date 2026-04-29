const express = require('express');
const router = express.Router();

// Base de datos simulada
let productos = [
    { id: 1, nombre: 'Laptop', precio: 999.99, stock: 10 },
    { id: 2, nombre: 'Mouse', precio: 29.99, stock: 50 },
    { id: 3, nombre: 'Teclado', precio: 79.99, stock: 30 }
];

// GET - Obtener todos los productos
router.get('/', (req, res) => {
    res.json(productos);
});

// GET - Obtener un producto por ID
router.get('/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
});

// POST - Crear un nuevo producto
router.post('/', (req, res) => {
    const { nombre, precio, stock } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }

    const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        nombre,
        precio,
        stock: stock || 0
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// PUT - Actualizar un producto
router.put('/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (req.body.nombre) producto.nombre = req.body.nombre;
    if (req.body.precio) producto.precio = req.body.precio;
    if (req.body.stock !== undefined) producto.stock = req.body.stock;

    res.json(producto);
});

// DELETE - Eliminar un producto
router.delete('/:id', (req, res) => {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productoEliminado = productos.splice(index, 1);
    res.json({ mensaje: 'Producto eliminado', producto: productoEliminado[0] });
});

module.exports = router;
