# Conway Life Game

Interactive implementation of **Conway's Game of Life**, built with React, TypeScript, and Vite. The board is rendered on an HTML Canvas and supports creating, editing, moving, and evolving cell configurations.

## Features

- Classic Conway's Life rules: `B3/S23`.
- Play and pause the simulation.
- Move forward and backward through generations.
- Configurable simulation speed in generations per minute.
- Add and remove live cells with the mouse.
- Pan the board by dragging.
- Zoom with the mouse wheel.
- Built-in patterns such as spaceships, oscillators, still lifes, and glider guns.
- Generation and live-cell counters.
- Rules tooltip.
- Dark interface designed for the simulation board.

## Game Rules

Each cell interacts with its eight neighboring cells:

1. A live cell survives with 2 or 3 live neighbors.
2. A live cell dies from underpopulation with fewer than 2 live neighbors.
3. A live cell dies from overpopulation with more than 3 live neighbors.
4. A dead cell becomes alive with exactly 3 live neighbors.

The initial configuration is generation `0`.

## Requirements

- Node.js 18 or newer.
- pnpm, npm, or Bun.
- A modern browser with Canvas 2D support.

## Installation

```bash
git clone <repository-url>
cd life-game-conway
pnpm install
```

You can also use `npm install` or `bun install`.

## Development

```bash
pnpm dev
```

The application is usually available at `http://localhost:5173`.
Vite provides Hot Module Replacement during development.

## Available Scripts

| Command        | Description                                             |
| -------------- | ------------------------------------------------------- |
| `pnpm dev`     | Starts the Vite development server.                     |
| `pnpm build`   | Type-checks the project and creates a production build. |
| `pnpm lint`    | Runs ESLint.                                            |
| `pnpm preview` | Serves the production build locally.                    |

## Controls

| Action               | Control                             |
| -------------------- | ----------------------------------- |
| Add or remove a cell | Click on the board                  |
| Pan the board        | Hold the mouse button and drag      |
| Zoom in or out       | Use the mouse wheel over the board  |
| Play or pause        | Central play button                 |
| Previous generation  | Previous-generation button          |
| Next generation      | Next-generation button              |
| Change speed         | FPM slider                          |
| Clear the board      | Delete button                       |
| View the rules       | Help button in the top-right corner |

## Project Structure

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

### Main Components

- `App`: coordinates simulation state, speed, generations, and cells.
- `Table`: prepares the canvas and connects rendering and interaction hooks.
- `Comands`: provides playback, navigation, speed, and clear controls.
- `Header`: displays generation, live-cell count, and speed.
- `RulesTooltip`: displays the game rules.

### Logic and Hooks

- `getNextGen.ts`: calculates the next generation using `B3/S23`.
- `templates.ts`: stores patterns as `Cell[][]` coordinate arrays.
- `useDrawTable.ts`: draws the grid and live cells on the canvas.
- `useSetCells.ts`: converts mouse coordinates into grid-cell coordinates.
- `useSetOffset.ts`: handles board panning.
- `useSetZoom.ts`: changes the cell size with the mouse wheel.
- `useGetSize.ts`: measures the available board area.

## Pattern Templates

Patterns use coordinates relative to the board origin:

```ts
type Cell = [number, number];
type CellTemplate = Cell[];
```

To select a random pattern:

```ts
const index = Math.floor(Math.random() * cellTemplates.length);
const cells = cellTemplates[index].map(([x, y]) => [x, y] as Cell);
```

Copying the coordinates prevents the game state from sharing the template's inner arrays.

## State Architecture

The main state is managed in `App`:

- `cells`: live cells in the current generation.
- `isRunning`: whether the simulation is playing.
- `fpm`: simulation speed in generations per minute.
- `squareSize`: visual size of each cell.
- `memory`: generation history used for backward navigation.

The simulation interval is calculated as:

```ts
60000 / fpm;
```

For a frames-per-second control, the equivalent formula is `1000 / fps`.

## Production

```bash
pnpm build
pnpm preview
```

## Technologies

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- ESLint 10
- Canvas 2D
- Material Symbols

## License

This project does not currently include a license file. Add an appropriate license before distributing it publicly.

---

# Conway Life Game

Implementación interactiva del **Juego de la Vida de Conway**, construida con React, TypeScript y Vite. El tablero se renderiza sobre un elemento `canvas` y permite crear, editar, mover y evolucionar configuraciones de células.

## Características

- Simulación de la regla clásica `B3/S23`.
- Reproducción y pausa de la simulación.
- Avance y retroceso de generaciones.
- Control de velocidad en generaciones por minuto.
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
2. Una célula viva muere por soledad si tiene menos de 2 vecinas.
3. Una célula viva muere por sobrepoblación si tiene más de 3 vecinas.
4. Una célula muerta nace cuando tiene exactamente 3 vecinas vivas.

La configuración inicial se encuentra en la generación `0`.

## Requisitos

- Node.js 18 o superior.
- pnpm, npm o Bun.
- Navegador moderno con soporte para Canvas 2D.

## Instalación

```bash
git clone <url-del-repositorio>
cd life-game-conway
pnpm install
```

También puedes utilizar `npm install` o `bun install`.

## Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`.
Vite proporciona Hot Module Replacement durante el desarrollo.

## Scripts disponibles

| Comando        | Descripción                                                 |
| -------------- | ----------------------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo de Vite.                   |
| `pnpm build`   | Comprueba TypeScript y genera la compilación de producción. |
| `pnpm lint`    | Ejecuta ESLint.                                             |
| `pnpm preview` | Sirve localmente la compilación de producción.              |

## Controles

| Acción                    | Control                                         |
| ------------------------- | ----------------------------------------------- |
| Crear o quitar una célula | Clic sobre el tablero                           |
| Mover el tablero          | Mantener pulsado el botón del ratón y arrastrar |
| Acercar o alejar          | Rueda del ratón sobre el tablero                |
| Reproducir o pausar       | Botón central de reproducción                   |
| Retroceder                | Botón de generación anterior                    |
| Avanzar                   | Botón de siguiente generación                   |
| Cambiar velocidad         | Control deslizante de FPM                       |
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

```bash
pnpm build
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

Este proyecto no define actualmente un archivo de licencia. Añade una licencia adecuada antes de distribuirlo públicamente.
