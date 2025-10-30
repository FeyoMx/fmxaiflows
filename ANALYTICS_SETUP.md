# Configuración de Google Analytics 4

## 🎯 Paso 1: Crear una Cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Empezar a medir"**
4. Completa los datos de tu cuenta:
   - Nombre de la cuenta: `FMX AI Flows`
   - Configuración de uso compartido de datos (recomendado dejar todo activado)

## 📊 Paso 2: Crear una Propiedad

1. Nombre de la propiedad: `FMX AI Flows Website`
2. Zona horaria: `(GMT-06:00) Ciudad de México`
3. Moneda: `Peso mexicano (MXN)`
4. Haz clic en **"Siguiente"**

## 🏢 Paso 3: Información del Negocio

1. Categoría: `Tecnología > Software y servicios`
2. Tamaño: `Pequeña (1-10 empleados)`
3. Objetivos: Selecciona:
   - ✅ Generar clientes potenciales
   - ✅ Obtener información sobre los clientes
   - ✅ Medir la interacción del usuario

## 🌐 Paso 4: Configurar Flujo de Datos (Web)

1. Selecciona **"Web"**
2. URL del sitio web: `https://fmxaiflows.online`
3. Nombre del flujo: `FMX AI Flows Website`
4. Haz clic en **"Crear flujo"**

## 🔑 Paso 5: Obtener tu ID de Medición

Después de crear el flujo, verás tu **ID de medición**:
- Formato: `G-XXXXXXXXXX`
- Ejemplo: `G-1A2B3C4D5E`

## ⚙️ Paso 6: Configurar en tu Sitio Web

1. Abre el archivo `index.html`
2. Busca estas dos líneas (aproximadamente línea 74-79):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

y

```javascript
gtag('config', 'G-XXXXXXXXXX', {
```

3. Reemplaza `G-XXXXXXXXXX` con tu ID real en **AMBOS lugares**

Ejemplo:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1A2B3C4D5E"></script>
```

```javascript
gtag('config', 'G-1A2B3C4D5E', {
```

## ✅ Paso 7: Verificar que Funciona

1. Guarda los cambios en `index.html`
2. Haz commit y push:
```bash
git add index.html
git commit -m "feat: Configurar Google Analytics con ID real"
git push origin main
```

3. Espera a que se despliegue (GitHub Pages tarda 1-5 minutos)
4. Visita tu sitio: `https://fmxaiflows.online`
5. En Google Analytics, ve a **Informes > Tiempo real**
6. Deberías ver tu visita en tiempo real

## 📈 Eventos que se Están Rastreando

Tu sitio ahora rastrea automáticamente:

### Eventos de Conversión
- ✅ **contact_whatsapp**: Clicks en botones de WhatsApp
- ✅ **contact_email**: Clicks en botones de Email
- ✅ **cta_click**: Clicks en botones CTA (Comenzar, Ver Paquetes, etc.)

### Eventos de Engagement
- ✅ **pricing_click**: Clicks en tarjetas de precios
- ✅ **navigation_click**: Navegación por secciones
- ✅ **scroll_depth**: Profundidad de scroll (25%, 50%, 75%, 100%)

### Eventos Sociales
- ✅ **social_click**: Clicks en redes sociales (WhatsApp, Facebook, Email)

### Preferencias de Usuario
- ✅ **theme_change**: Cambios entre modo claro/oscuro

## 🎯 Configurar Conversiones en GA4

1. En Google Analytics, ve a **Configuración > Eventos**
2. Marca como conversión estos eventos importantes:
   - `contact_whatsapp`
   - `contact_email`
   - `cta_click`

## 📊 Informes Recomendados

### Vista en Tiempo Real
- **Informes > Tiempo real**: Ve quién está en tu sitio ahora

### Adquisición
- **Informes > Adquisición > Visión general**: De dónde vienen tus visitantes

### Engagement
- **Informes > Engagement > Eventos**: Qué acciones realizan los usuarios

### Conversiones
- **Informes > Monetización > Conversiones**: Cuántos contactos obtienes

## 🔒 Privacidad

El código ya incluye:
- ✅ `anonymize_ip: true` - Anonimiza IPs para cumplir con GDPR
- ✅ Sin cookies de terceros innecesarias
- ✅ Respeta Do Not Track del navegador

## 💡 Tips Adicionales

1. **Conecta Google Search Console**:
   - En GA4 > Admin > Enlaces de productos > Search Console
   - Te muestra qué búsquedas llevan a tu sitio

2. **Crea un Dashboard Personalizado**:
   - Crea vistas personalizadas para ver métricas clave

3. **Configura Alertas**:
   - Recibe notificaciones cuando hay picos de tráfico

4. **Revisa Semanalmente**:
   - Lunes: Revisa rendimiento de la semana anterior
   - Identifica qué paquetes son más vistos
   - Optimiza según datos reales

## ❓ Problemas Comunes

### No veo datos en Analytics
- Espera 24-48 horas para datos históricos
- Datos en tiempo real aparecen en ~5 minutos
- Verifica que el ID esté correcto en ambos lugares

### Los eventos no se registran
- Abre la consola del navegador (F12)
- Busca errores relacionados con `gtag`
- Verifica que no tengas bloqueadores de anuncios

### Datos duplicados
- Asegúrate de tener el código de Analytics solo UNA vez en el HTML

## 📞 Soporte

Si necesitas ayuda:
- [Centro de Ayuda de Google Analytics](https://support.google.com/analytics)
- [Comunidad de Google Analytics](https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/Google_Analytics)

---

✅ **¡Listo!** Ahora tienes Analytics completo funcionando
