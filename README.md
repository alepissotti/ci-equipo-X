# API REST con Node.js y Express - CI/CD con GitHub Actions

Proyecto de una API REST desarrollada con Node.js y Express, implementando automatización continua mediante GitHub Actions para testing automático.

## 👥 Integrantes

- **Alejandro Pissotti** 

## 💻 Lenguaje Elegido

- **Node.js** con **Express.js**
- **Testing**: Jest y Supertest
- **Automatización**: GitHub Actions (YAML)

### Características técnicas:
- ✅ Framework web rápido y minimalista (Express)
- ✅ Testing automatizado (Jest + Supertest)
- ✅ Middleware CORS habilitado
- ✅ Variables de entorno con dotenv
- ✅ Auto-recarga en desarrollo (nodemon)

## 🔄 Explicación del Workflow

El workflow de GitHub Actions está configurado en `.github/workflows/test.yml` con los siguientes pasos:

### Triggers
- **Push** a las ramas `main`
- **Pull Request** hacia `main`

### Etapas del Pipeline

```
1. Checkout del código
   ↓
2. Setup Node.js (v20)
   ↓
3. Cache de dependencias npm
   ↓
4. Instalación de dependencias (npm install)
   ↓
5. Ejecución de tests (npm test)
```

### Matriz de Compatibilidad
El workflow prueba la aplicación en  versiones de Node.js:
- Node.js 20.x (Actual).


## 📸 Estado del Build

Los tests se ejecutan automáticamente en cada push y pull request.

**Resultado actual:**
```
Test Suites: 2 passed, 2 total
Tests:       16 passed, 16 total
Time:        ~2.8s
```

### Tests incluidos:
- ✅ Health Check (2 tests)
- ✅ GET Productos (2 tests)
- ✅ GET Producto por ID (2 tests)
- ✅ POST Crear Producto (4 tests)
- ✅ PUT Actualizar Producto (3 tests)
- ✅ DELETE Eliminar Producto (3 tests)

**Total: 16 tests pasando** ✅

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos previos
- Node.js v20+ instalado
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/alepissotti/ci-equipo-X.git
cd ci-equipo-X
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

El archivo `.env` contiene:
```
PORT=3000
NODE_ENV=development
```

### 4. Ejecutar la aplicación

**Modo desarrollo** (con auto-recarga):
```bash
npm run dev
```

**Modo producción**:
```bash
npm start
```

La API estará disponible en: `http://localhost:3000`

### 5. Ejecutar tests

**Tests una única vez**:
```bash
npm test
```

**Tests en modo observación** (re-ejecuta al guardar cambios):
```bash
npm run test:watch
```

## 📋 Endpoints Disponibles

### Health Check
```
GET /api/health
Response: { "status": "API en línea" }
```

### Productos (CRUD)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

### Ejemplo de uso con curl

```bash
# Obtener todos los productos
curl http://localhost:3000/api/productos

# Obtener producto por ID
curl http://localhost:3000/api/productos/1

# Crear nuevo producto
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Monitor",
    "precio": 299.99,
    "stock": 15
  }'

# Actualizar un producto
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 349.99,
    "stock": 10
  }'

# Eliminar un producto
curl -X DELETE http://localhost:3000/api/productos/1
```

## 📁 Estructura del Proyecto

```
ci-equipo-X/
├── .github/
│   └── workflows/
│       └── test.yml              # Workflow de GitHub Actions
├── src/
│   ├── index.js                  # Servidor principal
│   ├── routes/
│   │   └── productos.js          # Endpoints CRUD de productos
│   └── __tests__/
│       ├── setup.js              # Setup de tests
│       ├── health.test.js        # Tests de health check
│       └── productos.test.js     # Tests de CRUD de productos
├── package.json                  # Dependencias y scripts
├── jest.config.js                # Configuración de Jest
├── .env.example                  # Variables de entorno (ejemplo)
├── .gitignore                    # Archivos a ignorar en git
└── README.md                     # Este archivo
```

## 🔧 Dependencias

### Production
- **express** (^4.18.2) - Framework web
- **cors** (^2.8.5) - Middleware CORS
- **dotenv** (^16.0.3) - Variables de entorno

### Development
- **jest** (^29.5.0) - Framework de testing
- **supertest** (^6.3.3) - Testing de HTTP
- **nodemon** (^3.0.1) - Auto-recarga

## 📊 Workflow Visual

```
Push/PR
   ↓
GitHub Actions Trigger
   ↓
Setup Node.js (version 20.x)
   ↓
npm install
   ↓
npm test
   ↓
✅ Success / ❌ Failure

