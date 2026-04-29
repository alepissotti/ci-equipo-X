# API REST con Node.js y Express

Una API REST completa desarrollada con Node.js y Express, con dos módulos (Productos y Usuarios) para demostrar las operaciones CRUD.

## 📋 Requisitos

- Node.js v14+ 
- npm o yarn

## 🚀 Instalación y uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y ajusta los valores si es necesario:
```bash
cp .env.example .env
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

### 4. Ejecutar en producción
```bash
npm start
```

La API estará disponible en `http://localhost:3000`

## 📌 Endpoints disponibles

### Salud del servidor
```
GET /health
```

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

**Ejemplo POST:**
```json
{
  "nombre": "Monitor",
  "precio": 299.99,
  "stock": 15
}
```

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/:id` | Obtener un usuario por ID |
| POST | `/api/usuarios` | Crear un nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualizar un usuario |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario |

**Ejemplo POST:**
```json
{
  "nombre": "Pedro",
  "email": "pedro@example.com",
  "rol": "usuario"
}
```

## 📁 Estructura del proyecto

```
.
├── src/
│   ├── index.js           # Archivo principal
│   └── routes/
│       ├── productos.js   # Rutas de productos
│       └── usuarios.js    # Rutas de usuarios
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔧 Dependencias principales

- **express**: Framework web rápido y minimalista
- **cors**: Middleware para habilitar CORS
- **dotenv**: Cargar variables de entorno desde .env
- **nodemon**: Auto-reinicio en desarrollo

## 📝 Notas

- Los datos se almacenan en memoria, se pierden al reiniciar el servidor
- Para persistencia, integra una base de datos como MongoDB o PostgreSQL
- Este proyecto es ideal para aprendizaje y desarrollo

## 🎯 Próximos pasos

1. Conectar una base de datos (MongoDB, PostgreSQL, MySQL)
2. Agregar validación de datos
3. Implementar autenticación y autorización
4. Agregar pruebas unitarias
5. Documentación con Swagger

¡Happy coding! 🎉
