// Reglas
// Una celula muerta nace con 3 vecinas vivas
// una celula viva se mantiene si tiene 2 o 3 vecinas vivas

const neighbors = [
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, 1],
];

const _key = (x: number, y: number) => `${x},${y}`;

export const getNextGen = (cells: [number, number][]): [number, number][] => {
  const mem = new Set(cells.map(([x, y]) => _key(x, y)));
  const alives: Record<string, number> = {};
  const deaths: Record<string, number> = {};

  for (const [x, y] of cells) {
    for (const [dx, dy] of neighbors) {
      const nx = x + dx;
      const ny = y + dy;
      const key = _key(nx, ny);
      const k = _key(x, y);

      if (mem.has(key)) {
        alives[k] = (alives[k] || 0) + 1;
      } else {
        deaths[key] = (deaths[key] || 0) + 1;
      }
    }
  }

  const ans = [];
  for (const key in alives) {
    if (alives[key] < 2 || 3 < alives[key]) continue;
    const cell = key.split(",").map(Number) as [number, number];
    ans.push(cell);
  }
  for (const key in deaths) {
    if (deaths[key] !== 3) continue;
    const cell = key.split(",").map(Number) as [number, number];
    ans.push(cell);
  }

  return ans;
};
