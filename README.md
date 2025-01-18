# Sistema de Gestión de Transferencias de Vehículos

Este proyecto implementa un **CRUD** completo para la gestión de transferencias de vehículos en un **CMS vehicular**, cumpliendo con los requisitos de **roles**, **permisos** y **unidades organizativas**, de modo que cada usuario pueda acceder exclusivamente a los proyectos y unidades organizativas a los que pertenece. Se ha usado **NestJS** con una **arquitectura hexagonal** para mantener el **código limpio**, aplicar **principios SOLID** y aislar la lógica de negocio de la infraestructura.

---

## Requisitos Principales

1. **Tecnologías**  
   - **Nest.js** (TypeScript)  
   - **PostgreSQL** con **TypeORM** (o Prisma)  
   - **JWT** para autenticación  
   - **Render** (plan Hobby) para despliegue  

2. **Entidades**  
   - **Users (usuarios)**: Muchos a muchos con projects y organizational_units.  
   - **Roles**: Muchos a muchos con permissions y users.  
   - **Permissions**: Definen acciones como `view_transfers`, `create_transfers`, etc.  
   - **Projects**: Uno a muchos con organizational_units.  
   - **OrganizationalUnits**: Muchos a muchos con usuarios.  
   - **Vehicles**: Identificados por su placa, servicio, fecha creación, etc.  
   - **Transfers**: Cada transferencia pertenece a un vehículo, un cliente, un transmitente y está ligada a un proyecto y unidad organizativa.

3. **Seguridad y Validaciones**  
   - **JWT** para la autenticación de usuarios  
   - **Roles y Permisos** que controlan las acciones en el módulo de transferencias  
   - **Filtrado** por proyecto y unidad organizativa para asegurar que el usuario solo vea/edite lo que le corresponde

4. **CRUD de Transferencias**  
   - **GET /transfers**: Retorna solo las transferencias que corresponden a la combinación de proyectos y unidades organizativas del usuario autenticado  
   - **POST /transfers**: Crea una transferencia validando el acceso del usuario al `projectId` y `organizationalUnitId`  
   - **PUT /transfers/:id**: Actualiza una transferencia, chequeando que el usuario mantenga los permisos y acceso a esas entidades  
   - **DELETE /transfers/:id**: Permite eliminar una transferencia solo si el usuario pertenece a la misma unidad organizativa y posee permisos

---

## Arquitectura Hexagonal y Principios SOLID

Se adoptó un diseño con arquitectura **hexagonal** para desacoplar la lógica de negocio (dominio y aplicación) de los detalles de infraestructura (ORM, controladores, etc.). Esto se refleja en:

- **Entidades de Dominio**: Definen la estructura y reglas principales de las transferencias, proyectos, usuarios, etc.  
- **Aplicación (Casos de Uso)**: Contiene los servicios que orquestan la lógica (crear, actualizar, eliminar). Se usan **DTOs** para la validación de datos de entrada.  
- **Puertos (Interfaces)**: Declaraciones de métodos que la infraestructura debe implementar (por ejemplo, repositorios).  
- **Adaptadores (Infraestructura)**: Implementaciones concretas (p. ej., repositorios TypeORM y controladores HTTP).

Con esto, se facilita la aplicación de **principios SOLID** (como Inversión de Dependencias, Responsabilidad Única) al inyectar interfaces en lugar de depender directamente de la base de datos u otros detalles de implementación.

---

## Estructura General

├── src  
│   ├── modules  
│   │   ├── users  
│   │   ├── roles  
│   │   ├── permissions  
│   │   ├── projects  
│   │   ├── organizational_units  
│   │   └── transfers  
│   ├── main.ts  
│   └── app.module.ts  
├── package.json  
├── tsconfig.json  
├── .env  
└── README.md  

- **modules/roles**, **modules/permissions**, etc.: Cada una con su propia entidad, repositorio, servicio y controlador.  
- **modules/transfers**: Contiene todo lo referente a la gestión de **Transfer**: DTOs, entidad, repositorio, servicio y controlador, junto con validaciones para proyectos, unidades organizativas y usuarios.

---

## Despliegue y Ejecución

1. **Clonar el Repositorio**  
git clone https://github.com/tu-usuario/tu-repo.git  
cd tu-repo  

2. **Instalar Dependencias**  
pnpm install  

3. **Configurar Variables de Entorno**  
Crear un archivo `.env` con parámetros como:  
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=password  
DB_NAME=vehicular_cms  
JWT_SECRET=una_clave_secreta  
PORT=3000  

4. **Arrancar la Aplicación**  
npm run start:dev  

La app estará disponible en `http://localhost:3000`.

5. **Despliegue en Render**  
- Crear un servicio en Render (plan Hobby).  
- Configurar las **variables de entorno** en el panel de Render.  
- Conectar el repositorio de GitHub.  
- Al hacer push, Render construirá e iniciará la aplicación.

---

## Uso de la API

### Endpoints Principales

- **Auth**  
- `POST /auth/login`: Autentica al usuario.  
- `GET /auth/profile`: Muestra el perfil del usuario con roles y permisos (requiere JWT).

- **Transfers**  
- `GET /transfers`: Lista transferencias filtradas por proyecto y unidad organizativa del usuario.  
- `POST /transfers`: Crea una nueva transferencia validando `projectId` y `organizationalUnitId`.  
- `PUT /transfers/:id`: Actualiza una transferencia existente (requiere tener acceso a ese proyecto/unidad).  
- `DELETE /transfers/:id`: Elimina solo si el usuario tiene permisos y pertenece a esa unidad organizativa.

### Seguridad y Roles

- Se puede asignar a cada usuario **Roles** que contienen **Permisos** (por ejemplo, `view_transfers`, `edit_transfers`), y se valida antes de cada operación.  
- Cada **Unidad Organizativa** y **Proyecto** se asocian al usuario, restringiendo el **alcance** de sus acciones.

---

## Buenas Prácticas y Funcionalidades Opcionales

- **Variables de entorno** para credenciales y claves secretas.  
- **Helmet** para añadir cabeceras de seguridad HTTP.  
- **Cookies seguras** con `httpOnly` y `secure` para producción.  
- **Redis** como caché.  
- **Cron Jobs** o **Background Workers** para tareas programadas (opcional).

---

## Conclusión

Este proyecto **cumple** con los requisitos de un **CRUD de Transferencias** con **roles**, **permisos** y **unidades organizativas**, implementando **buenas prácticas** de NestJS, **arquitectura hexagonal** y **principios SOLID**. Se prioriza el **desacoplamiento**, la **escalabilidad** y la **seguridad** a través de módulos separados, DTOs para validación, inyección de dependencias y uso de JWT para la autenticación. Además, se facilita la extensibilidad para futuras mejoras, como la integración de un caché Redis, la programación de tareas y la configuración de otras medidas de seguridad en producción.
