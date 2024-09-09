# API Restful de Flower Shop

Esta es una API Restful para una tienda de flores, construida siguiendo una arquitectura hexagonal y los principios de DDD (Domain-Driven Design).

## Estructura del Proyecto

```
FlowerShop-API-restful
│
└── src
    │
    ├── config
    │   ├── dbConnection.ts
    │   ├── env.config.ts
    │   ├── inversify.config.ts
    │   └── dependencyInjection.ts
    │
    ├── errors
    │   ├── CustomError.ts
    │   ├── errorHandler.ts
    │   └── validateRequest.ts
    │
    ├── catalog
    │   ├── domain
    │   │   ├── Product.ts
    │   │   └── ProductRepository.ts
    │   │
    │   ├── application
    │   │   ├── CreateProductCommand.ts
    │   │   └── ProductService.ts
    │   │
    │   ├── infrastructure
    │   │   ├── PostgresProductRepository.ts
    │   │   ├── ProductController.ts
    │   │   ├── productRoutes.ts
    │   │   └── validators
    │   │       └── productValidators.ts
    │
    ├── order
    │   ├── domain
    │   │   ├── Order.ts
    │   │   └── OrderRepository.ts
    │   │
    │   ├── application
    │   │   ├── CreateOrderCommand.ts
    │   │   └── OrderService.ts
    │   │
    │   ├── infrastructure
    │   │   ├── PostgresOrderRepository.ts
    │   │   ├── OrderController.ts
    │   │   ├── orderRoutes.ts
    │   │   └── validators
    │   │       └── orderValidators.ts
    │
    └── index.ts
```

## Requisitos

- **Docker** y **Docker Compose**: Para una ejecución más sencilla con contenedores.
- **Node.js** y **PostgreSQL**: Opcional, si prefieres no usar Docker.

## Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/NoeOnDev/FlowerShop-API-restful.git
   ```

2. Entra al directorio del repositorio:

   ```bash
   cd FlowerShop-API-restful
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```properties
    PORT=3000
    DB_NAME=flowerShop
    DB_USER=user
    DB_PASS=password
    DB_HOST=db  # Si usas Docker, mantener "db"; si no, usar "localhost"
    DB_PORT=5432
    ```

4. (Opcional) Personaliza las variables de entorno en el archivo `.env` según tus necesidades.

## Construcción y Ejecución

### Usando Docker

1. Construye y levanta los contenedores:

   ```bash
   docker compose up -d --build
   ```

2. Verifica que la API esté corriendo:

   ```bash
   docker logs -f my_node_app
   ```

3. Accede a la API en `http://localhost:3000`.

### Sin Docker

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Compila el proyecto:

   ```bash
   npm run build
   ```

3. Inicia la aplicación:

   ```bash
   npm start
   ```

4. La API estará disponible en `http://localhost:3000`.

5. (Opcional) Usa `curl` para verificar el funcionamiento de los endpoints:

   ```bash
   curl http://localhost:3000/products
   ```

## Endpoints

### Productos

- `GET /products`: Obtiene todos los productos.
- `POST /products`: Crea un nuevo producto.
- `GET /products/:id`: Obtiene un producto por ID.
- `PUT /products/:id`: Actualiza un producto por ID.
- `DELETE /products/:id`: Elimina un producto por ID.

### Órdenes

- `GET /orders`: Obtiene todas las órdenes.
- `POST /orders`: Crea una nueva orden.
- `GET /orders/:id`: Obtiene una orden por ID.
- `PUT /orders/:id`: Actualiza una orden por ID.
- `DELETE /orders/:id`: Elimina una orden por ID.

## Manejo de Errores

La API cuenta con un manejador de errores centralizado. Los errores personalizados están definidos en `src/errors/CustomError.ts`. Además, el middleware de manejo de errores se encuentra en `src/errors/errorHandler.ts` y se utiliza para capturar errores en los controladores.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un **issue** o un **pull request** para discutir cualquier mejora o cambio.
