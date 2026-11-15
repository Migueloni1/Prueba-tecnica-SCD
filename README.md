# Gestión de registros

Aplicación CRUD desarrollada como solución a la prueba técnica de SCD para el
perfil Frontend. Permite listar, consultar, crear, editar y eliminar registros
con fecha, texto, entero, decimal, booleano y clave primaria autoincremental.

## Requisitos

- Node.js 20.19 o superior.
- npm 10 o superior.

## Instalación y ejecución

1. Clona o descomprime el proyecto y abre una terminal en su carpeta raíz.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la API local (en una terminal):

   ```bash
   npm run api
   ```

   JSON Server expondrá los registros en `http://localhost:3000/registros`.

4. Inicia Angular (en otra terminal):

   ```bash
   npm start
   ```

5. Abre `http://localhost:4200` en el navegador.

También se pueden iniciar ambos procesos a la vez con:

```bash
npm run start:todo
```

## Comandos disponibles

- `npm start`: servidor de desarrollo Angular.
- `npm run api`: servidor JSON Server con `db.json`.
- `npm run start:todo`: Angular y JSON Server en paralelo.
- `npm run build`: compilación de producción.
- `npm test`: ejecución de pruebas unitarias.

## Decisiones técnicas

### Requisitos implementados

- Angular con componentes standalone y carga lazy de las pantallas.
- Uso de TypeScript sin `any`, nombres propios en español y un servicio HTTP
  centralizado, según las restricciones de la prueba.
- CRUD completo para listar, consultar, crear, editar y eliminar registros.
- Validaciones de campos, mensajes de error, confirmación antes de eliminar y
  estados de carga.

### Decisiones propias

- Se eligió JSON Server porque permite una API REST local reproducible,
  instalable con npm y fácil de levantar durante la revisión.
- `Registro` y `RegistroSinId` son interfaces separadas para que el identificador
  autoincremental no forme parte de los datos enviados al crear un registro.
- La API persiste las fechas como `dd-mm-yyyy`; el formulario convierte
  temporalmente ese valor al formato `yyyy-mm-dd` que exige `input[type=date]`.
- El importe se conserva como `number` y se muestra con dos decimales usando la
  configuración regional `es-CL`, sin asumir que el campo representa una moneda.
- Bootstrap se usa para la grilla y controles, con SCSS propio para la identidad
  visual. El menú responsive se controla desde Angular para no depender de
  JavaScript externo de Bootstrap.

## Uso de inteligencia artificial

Se utilizó GitHub Copilot SDK en VS Code como apoyo puntual, no como sustituto
del diseño ni de la validación. La declaración es verificable en el historial
de trabajo y en el código final.

### Consultas y uso concreto

- Se consultó la sintaxis de Angular 20 para componentes standalone, rutas con
  `loadComponent`, formularios reactivos y pipes.
- Se pidió revisar la configuración mínima de JSON Server y la integración del
  servicio HTTP con los componentes.
- Se solicitó una revisión de errores de integración y de los casos límite del
  formulario: descripción compuesta solo por espacios, fechas inválidas y
  valores decimales.
- Se pidió revisar el comportamiento responsive del menú a 390 px.

### Qué se aceptó, modificó o descartó

- Se aceptó la separación entre componentes, modelos y servicio porque reduce el
  acoplamiento y deja una única entrada para las peticiones HTTP.
- Se modificó la sugerencia de usar formato monetario: el enunciado pide un
  decimal, no una moneda, por lo que la aplicación conserva y muestra los
  decimales sin símbolo.
- Se descartó depender del JavaScript de Bootstrap para el menú. Se implementó
  `menuAbierto` en `App`, con apertura, cierre y atributos ARIA controlados por
  Angular.
- Se incorporó la validación `Validators.pattern(/\S/)` y el `trim()` al guardar
  para impedir descripciones vacías o compuestas solo por espacios.

### Validación humana

Cada cambio fue revisado manualmente en el código y se validó con:

- `npm run build`, compilación de producción exitosa.
- `npx tsc --noEmit -p tsconfig.app.json`, comprobación de tipos exitosa.
- Pruebas manuales del CRUD, navegación, validaciones y menú responsive.
- `npm test` compila las pruebas, pero la ejecución headless requiere Chrome
  instalado en el equipo de revisión.
