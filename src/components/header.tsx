interface Props {
  generation: number;
  aliveCells: number;
  fpm: number;
  isRunning: boolean;
}

export const Header = ({ generation, aliveCells, fpm, isRunning }: Props) => {
  return (
    <header className="w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className={`h-15 w-full px-space-xl flex items-center justify-between`}>
        <div className="flex items-center gap-space-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#4edea3]" />
          <span className="text-body-lg font-semibold tracking-tight text-on-surface up">
            Conway Life Game
          </span>
          <span className="font-sans text-label-caption px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
            CarlosCo_Dev
          </span>
        </div>

        <div className="z-20 pointer-events-none">
          <div className="pointer-events-auto bg-surface-container-lowest/80 backdrop-blur-xl px-space-md py-space-xs rounded-full shadow-lg flex items-center gap-space-md border border-white/5">
            <div className="flex items-center gap-space-xs">
              <span className="text-label-caption text-on-surface-variant uppercase tracking-wider">
                Gen
              </span>
              <span className="text-body-md text-on-surface">{generation}</span>
            </div>
            <span className="size-1 rounded-full bg-surface-variant" />
            <div className="flex items-center gap-space-xs">
              <span className="text-label-caption text-on-surface-variant uppercase tracking-wider">
                Vivas
              </span>
              <span className="text-body-md text-primary">{aliveCells}</span>
            </div>
            <span className="size-1 rounded-full bg-surface-variant" />
            <div className="flex items-center gap-1">
              <span
                className={`size-1.5 rounded-full ${isRunning ? "bg-primary animate-pulse" : "bg-surface-variant"}`}
              />
              <span className="text-label-code text-secondary">{fpm} FPM</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
