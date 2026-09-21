# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
# Conway Life Game

Implementación interactiva del **Juego de la Vida de Conway**, construida con React, TypeScript y Vite. El tablero se renderiza sobre un elemento `canvas` y permite crear, editar, mover y evolucionar configuraciones de células.

## Características

- Simulación de la regla clásica `B3/S23`.
- Reproducción y pausa de la simulación.
- Avance y retroceso de generaciones.
- Control de velocidad mediante FPS.
- Selección y eliminación de células con el ratón.
- Desplazamiento del tablero mediante arrastre.
- Zoom con la rueda del ratón.
- Plantillas de patrones conocidos, como planeadores, osciladores, estructuras estables y cañones.
- Contador de generaciones y células vivas.
- Tooltip con las reglas del Juego de la Vida.
- Interfaz oscura adaptada al tablero de simulación.

## Regla del juego

Cada célula interactúa con sus ocho vecinas:

1. Una célula viva sobrevive si tiene 2 o 3 vecinas vivas.
2. Una célula muere por soledad si tiene menos de 2 vecinas.
3. Una célula muere por sobrepoblación si tiene más de 3 vecinas.
4. Una célula muerta nace cuando tiene exactamente 3 vecinas vivas.

La configuración inicial se encuentra en la generación `0`.

## Requisitos

- Node.js 18 o superior.
- pnpm, npm o Bun.
- Navegador moderno con soporte para Canvas 2D.

## Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <url-del-repositorio>
cd life-game-conway
````

Instala las dependencias con pnpm:

```bash
pnpm install
```

También puedes utilizar npm o Bun:

```bash
npm install
```

```bash
bun install
```

## Desarrollo

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

Vite mostrará la URL local, normalmente:

```text
http://localhost:5173
```

El proyecto utiliza Hot Module Replacement para reflejar los cambios sin reiniciar manualmente el servidor.

## Scripts disponibles

| Comando        | Descripción                                               |
| -------------- | --------------------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo de Vite.                 |
| `pnpm build`   | Ejecuta TypeScript y genera la compilación de producción. |
| `pnpm lint`    | Ejecuta ESLint sobre el proyecto.                         |
| `pnpm preview` | Sirve localmente la compilación de producción.            |

## Controles

| Acción                    | Control                                         |
| ------------------------- | ----------------------------------------------- |
| Crear o quitar una célula | Clic sobre una celda del tablero                |
| Mover el tablero          | Mantener pulsado el botón del ratón y arrastrar |
| Acercar o alejar          | Rueda del ratón sobre el tablero                |
| Reproducir o pausar       | Botón central de reproducción                   |
| Retroceder                | Botón de generación anterior                    |
| Avanzar                   | Botón de siguiente generación                   |
| Cambiar velocidad         | Control deslizante de FPS                       |
| Limpiar tablero           | Botón de eliminar                               |
| Consultar reglas          | Botón de ayuda en la esquina superior derecha   |

## Estructura del proyecto

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── comands.tsx
│   ├── header.tsx
│   ├── rulesTooltip.tsx
│   └── table.tsx
├── helpers/
│   ├── getNextGen.ts
│   └── templates.ts
└── hooks/
    ├── useDrawTable.ts
    ├── useGetSize.ts
    ├── useSetCells.ts
    ├── useSetOffset.ts
    └── useSetZoom.ts
```

### Componentes principales

- `App`: coordina el estado de la simulación, la velocidad, las generaciones y las células.
- `Table`: prepara el canvas y conecta los hooks de interacción y renderizado.
- `Comands`: contiene los controles de reproducción, navegación, velocidad y limpieza.
- `Header`: muestra la generación, el número de células vivas y la velocidad.
- `RulesTooltip`: muestra las reglas del juego.

### Lógica y hooks

- `getNextGen.ts`: calcula la siguiente generación aplicando `B3/S23`.
- `templates.ts`: contiene las configuraciones de patrones en formato `Cell[][]`.
- `useDrawTable.ts`: dibuja la cuadrícula y las células en el canvas.
- `useSetCells.ts`: convierte la posición del clic en coordenadas de la cuadrícula.
- `useSetOffset.ts`: gestiona el desplazamiento mediante arrastre.
- `useSetZoom.ts`: ajusta el tamaño de las células con la rueda del ratón.
- `useGetSize.ts`: obtiene el tamaño disponible para el tablero.

## Plantillas de patrones

Las plantillas utilizan coordenadas relativas al origen del tablero:

```ts
type Cell = [number, number];
type CellTemplate = Cell[];
```

Para seleccionar una plantilla al azar:

```ts
const index = Math.floor(Math.random() * cellTemplates.length);
const cells = cellTemplates[index].map(([x, y]) => [x, y] as Cell);
```

La copia evita compartir las coordenadas internas de la plantilla con el estado de React.

## Arquitectura del estado

El estado principal se mantiene en `App`:

- `cells`: células vivas de la generación actual.
- `isRunning`: indica si la simulación está reproduciéndose.
- `fpm`: velocidad configurada para el intervalo.
- `squareSize`: tamaño visual de cada célula.
- `memory`: historial de generaciones utilizado para navegar hacia atrás.

La simulación utiliza un intervalo cuyo periodo se calcula como:

```ts
60000 / fpm;
```

Esto corresponde a una velocidad expresada en generaciones por minuto. Si se utiliza una unidad de FPS, el cálculo equivalente sería `1000 / fps`.

## Producción

Genera la aplicación:

```bash
pnpm build
```

Previsualiza el resultado:

```bash
pnpm preview
```

## Tecnologías

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- ESLint 10
- Canvas 2D
- Material Symbols

## Licencia

Este proyecto no define actualmente un archivo de licencia. Añade una licencia antes de distribuirlo públicamente.
