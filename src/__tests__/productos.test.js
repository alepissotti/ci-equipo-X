const request = require('supertest');
const app = require('../index');

describe('Productos Endpoints', () => {

    describe('GET /api/productos', () => {
        test('should return all products', async () => {
            const response = await request(app)
                .get('/api/productos')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        test('should return products with correct structure', async () => {
            const response = await request(app)
                .get('/api/productos');

            response.body.forEach(producto => {
                expect(producto).toHaveProperty('id');
                expect(producto).toHaveProperty('nombre');
                expect(producto).toHaveProperty('precio');
                expect(producto).toHaveProperty('stock');
            });
        });
    });

    describe('GET /api/productos/:id', () => {
        test('should return a single product by id', async () => {
            const response = await request(app)
                .get('/api/productos/1')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('nombre');
            expect(response.body).toHaveProperty('precio');
        });

        test('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .get('/api/productos/9999')
                .expect(404);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Producto no encontrado');
        });
    });

    describe('POST /api/productos', () => {
        test('should create a new product', async () => {
            const newProduct = {
                nombre: 'Monitor',
                precio: 299.99,
                stock: 15
            };

            const response = await request(app)
                .post('/api/productos')
                .send(newProduct)
                .expect(201)
                .expect('Content-Type', /json/);

            expect(response.body).toHaveProperty('id');
            expect(response.body.nombre).toBe(newProduct.nombre);
            expect(response.body.precio).toBe(newProduct.precio);
            expect(response.body.stock).toBe(newProduct.stock);
        });

        test('should create product with default stock of 0', async () => {
            const newProduct = {
                nombre: 'Webcam',
                precio: 49.99
            };

            const response = await request(app)
                .post('/api/productos')
                .send(newProduct)
                .expect(201);

            expect(response.body.stock).toBe(0);
        });

        test('should return 400 if nombre is missing', async () => {
            const invalidProduct = {
                precio: 99.99,
                stock: 5
            };

            const response = await request(app)
                .post('/api/productos')
                .send(invalidProduct)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Nombre y precio son requeridos');
        });

        test('should return 400 if precio is missing', async () => {
            const invalidProduct = {
                nombre: 'Producto',
                stock: 5
            };

            const response = await request(app)
                .post('/api/productos')
                .send(invalidProduct)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Nombre y precio son requeridos');
        });
    });

    describe('PUT /api/productos/:id', () => {
        test('should update an existing product', async () => {
            const updateData = {
                nombre: 'Laptop Actualizada',
                precio: 1099.99,
                stock: 5
            };

            const response = await request(app)
                .put('/api/productos/1')
                .send(updateData)
                .expect(200);

            expect(response.body.nombre).toBe(updateData.nombre);
            expect(response.body.precio).toBe(updateData.precio);
            expect(response.body.stock).toBe(updateData.stock);
        });

        test('should update only nombre field', async () => {
            const updateData = {
                nombre: 'Nuevo Nombre'
            };

            const response = await request(app)
                .put('/api/productos/2')
                .send(updateData)
                .expect(200);

            expect(response.body.nombre).toBe('Nuevo Nombre');
            expect(response.body).toHaveProperty('precio');
            expect(response.body).toHaveProperty('stock');
        });

        test('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .put('/api/productos/9999')
                .send({ nombre: 'Producto' })
                .expect(404);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Producto no encontrado');
        });
    });

    describe('DELETE /api/productos/:id', () => {
        test('should delete a product', async () => {
            const response = await request(app)
                .delete('/api/productos/3')
                .expect(200);

            expect(response.body).toHaveProperty('mensaje');
            expect(response.body.mensaje).toBe('Producto eliminado');
            expect(response.body).toHaveProperty('producto');
            expect(response.body.producto.id).toBe(3);
        });

        test('should return 404 when deleting non-existent product', async () => {
            const response = await request(app)
                .delete('/api/productos/9999')
                .expect(404);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Producto no encontrado');
        });

        test('should not find deleted product in subsequent GET', async () => {
            // Primero eliminar
            await request(app)
                .delete('/api/productos/2');

            // Luego intentar obtener
            const response = await request(app)
                .get('/api/productos/2')
                .expect(404);

            expect(response.body.error).toBe('Producto no encontrado');
        });
    });
});
