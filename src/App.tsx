// import { useEffect, useRef, useState } from "react";

import { useEffect, useRef, useState } from "react";
import { Comands } from "./components/comands";
import { Header } from "./components/header";
import { RulesTooltip } from "./components/rulesTooltip";
import { Table } from "./components/table";
import { useGetSize } from "./hooks/useGetSize";
import { getNextGen } from "./helpers/getNextGen";
import { cellTemplates } from "./helpers/templates";

const startCells: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

function App() {
  const [fpm, setFpm] = useState(60);
  const [squareSize, setSquareSize] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [cells, setCells] = useState<[number, number][]>(startCells);
  const memory = useRef<[number, number][][]>([startCells]);

  const {
    ref: containerRef,
    size: { height, width },
  } = useGetSize<HTMLDivElement>();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCells((prevCells) => {
        const nextCell = getNextGen(prevCells);
        memory.current.push(nextCell);
        return nextCell;
      });
    }, 60000 / fpm);

    return () => clearInterval(interval);
  }, [isRunning, fpm]);

  const onDelete = () => {
    memory.current = [];
    setCells([]);
    setIsRunning(false);
  };

  const onNext = () => {
    setIsRunning(false);
    setCells(getNextGen(memory.current[memory.current.length - 1]));
  };

  const onFebore = () => {
    setIsRunning(false);
    if (memory.current.length <= 1) return;
    setCells(memory.current[memory.current.length - 2]);
    memory.current.pop();
  };

  const onRandom = () => {
    setIsRunning(false);
    const randomIndex = Math.floor(Math.random() * cellTemplates.length);
    const randomCells = cellTemplates[randomIndex];
    memory.current = [randomCells];
    setCells(randomCells);
  };

  return (
    <div className="h-dvh min-h-dvh flex flex-col font-sans">
      <Header
        generation={memory.current.length}
        aliveCells={cells.length}
        fpm={fpm}
        isRunning={isRunning}
      />

      <main ref={containerRef} className="w-full bg-surface flex-1 relative">
        <Table
          width={width}
          height={height}
          size={squareSize}
          setSize={setSquareSize}
          cells={cells}
          setCells={setCells}
          isRunning={isRunning}
        />
        <RulesTooltip />
        <Comands
          isRunning={isRunning}
          fps={fpm}
          onChangeFps={setFpm}
          onDelete={onDelete}
          onRandom={onRandom}
          onStart={() => setIsRunning((prev) => !prev)}
          onNext={onNext}
          onBefore={onFebore}
        />
      </main>
    </div>
  );
}

export default App;
