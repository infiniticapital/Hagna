# Guía de Despliegue en Firebase Hosting

## Requisitos Previos

1. Instalar Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Iniciar sesión en Firebase:
```bash
firebase login
```

## Configuración

1. **Configurar el proyecto de Firebase**

   Edita el archivo `.firebaserc` y reemplaza `your-firebase-project-id` con tu ID de proyecto de Firebase:
   ```json
   {
     "projects": {
       "default": "tu-proyecto-firebase"
     }
   }
   ```

2. **Configurar variables de entorno**

   Asegúrate de que el archivo `.env` tenga todas las claves configuradas:
   ```
   VITE_SUPABASE_ANON_KEY=tu_clave_supabase
   VITE_SUPABASE_URL=tu_url_supabase
   VITE_RECAPTCHA_SITE_KEY=tu_clave_recaptcha (opcional)
   VITE_GA_MEASUREMENT_ID=tu_id_google_analytics (opcional)
   ```

## Despliegue

1. **Construir el proyecto**
   ```bash
   npm run build
   ```

2. **Desplegar a Firebase**
   ```bash
   firebase deploy
   ```

   O si prefieres solo hosting:
   ```bash
   firebase deploy --only hosting
   ```

## Comandos Útiles

- Ver el proyecto en producción:
  ```bash
  firebase open hosting:site
  ```

- Ver logs:
  ```bash
  firebase functions:log
  ```

- Inicializar un nuevo proyecto:
  ```bash
  firebase init hosting
  ```

## Notas Importantes

- El directorio `dist` contiene los archivos de producción
- Firebase Hosting sirve archivos estáticos desde la carpeta `dist`
- Las rutas se redirigen a `index.html` para el enrutamiento de React Router
- Las imágenes y assets tienen cache de 1 año para mejor rendimiento

## Configuración de reCAPTCHA (Opcional)

Para habilitar la protección contra spam en el formulario:

1. Ve a https://www.google.com/recaptcha/admin
2. Registra tu sitio con reCAPTCHA v3
3. Agrega la clave del sitio a `.env` en `VITE_RECAPTCHA_SITE_KEY`

Sin reCAPTCHA, el formulario seguirá funcionando pero sin protección contra bots.
