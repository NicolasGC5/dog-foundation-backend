# 🐾 Dog Foundation - Backend

Este es el backend de una aplicación full stack desarrollada para una fundación de perritos. La API gestiona usuarios, perritos, productos, donaciones, suscripciones a newsletter y panel de administración.

---

## 🛠️ Tecnologías usadas

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **Cloudinary** (para subir imágenes)
- **Stripe** (para procesar donaciones)
- **JWT** y **bcrypt** (para autenticación)

---

## 📦 Funcionalidades principales

- 📋 CRUD completo de perritos
- 🧍 Registro, login y gestión de usuarios
- 📷 Subida de imágenes de perritos
- 🛍️ Creación y asignación de productos a cada perrito
- 💳 Donaciones con Stripe
- 📬 Newsletter por suscripción
- 🔐 Roles de usuario: usuario común y administrador
- ⛔ Ban de usuarios desde dashboard admin
- 📊 Dashboard con métricas de perritos y usuarios

---

## 🚀 Cómo correr el proyecto

1. Cloná el repositorio
git clone https://github.com/NicolasGC5/dog-foundation-backend.git
cd dog-foundation-backend

2. Instalá las dependencias
npm install

3. Configura tus variables de entorno .env
(usa el archivo .env.example como guia)

4. Ejecuta el servidor 
npm run dev
