# Next Auth App

Aplicación web construida con Next.js, Prisma y NextAuth para la gestión de usuarios y motos. Incluye autenticación, panel de usuario y CRUD de motos.

## Tecnologías principales

- Next.js (App Router)
- React
- TypeScript
- Prisma (ORM)
- NextAuth.js (autenticación)
- PostgreSQL (puedes cambiar el motor en `prisma/schema.prisma`)
- Tailwind CSS

## Instalación y configuración

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repo>
   cd next-auth-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` basado en `.env.example` (si existe) o agrega las siguientes variables:
     ```env
     DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/proyecto
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=tu_mayor_secreto
     # Configura los proveedores de NextAuth si usas OAuth
     ```
4. Configura la base de datos:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

## Ejemplo de archivo .env

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/proyecto
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_mayor_secreto
# Configuración de proveedores OAuth (ejemplo para Google)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## Uso y comandos principales

- `dev`: Inicia el servidor en modo desarrollo
- `build`: Compila la aplicación para producción
- `start`: Inicia la app en modo producción
- `prisma studio`: Interfaz visual para la base de datos

## Estructura del proyecto

```
src/
  app/           # Rutas y páginas (Next.js App Router)
  auth/          # Lógica de autenticación y dominio de usuario
  motos/         # Lógica de dominio y casos de uso de motos
  components/    # Componentes reutilizables
  lib/           # Utilidades generales
  middleware.ts  # Middlewares de Next.js
prisma/          # Esquema y migraciones de base de datos
```

## Arquitectura hexagonal

- **Clean Architecture**: Separación en capas (dominio, aplicación, infraestructura, interfaces).
- **Dominio**: Entidades y repositorios (interfaces).
- **Aplicación**: Casos de uso y DTOs.
- **Infraestructura**: Implementaciones concretas (Prisma, NextAuth, hooks).
- **Presentación**: Páginas y componentes React.

## Configuración de base de datos (Prisma)

- El esquema está en `prisma/schema.prisma`.
- Usa `npx prisma migrate dev` para aplicar migraciones.
- Usa `npx prisma studio` para explorar la base de datos.

## Autenticación (NextAuth)

- Configurada en `src/auth/infrastructure/auth/nextauth.config.ts` y `src/app/api/auth/[...nextauth]/route.ts`.
- Soporta autenticación con email/contraseña y/o proveedores OAuth (configura en `.env`).
- Usa sesiones seguras y callbacks para personalizar el flujo.

## Despliegue

- Puedes desplegar fácilmente en Vercel, Railway, Render, etc.
- Configura las variables de entorno de producción.
- Consulta la [documentación de Next.js para despliegue](https://nextjs.org/docs/app/building-your-application/deploying).

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature/fix: `git checkout -b mi-feature`
3. Haz tus cambios y commitea: `git commit -m 'Agrega mi feature'`
4. Haz push a tu rama: `git push origin mi-feature`
5. Abre un Pull Request

---

> Personaliza este README según las necesidades de tu proyecto. Si tienes dudas, revisa la documentación oficial de cada tecnología.
