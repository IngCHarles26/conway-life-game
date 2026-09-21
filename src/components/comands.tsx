interface Props {
  fps: number;
  onChangeFps: (fps: number) => void;
  onBefore: () => void;
  onNext: () => void;
  onDelete: () => void;
  onRandom: () => void;
  onStart: () => void;
  isRunning: boolean;
}

export const Comands = ({
  fps,
  onChangeFps,
  onBefore,
  onNext,
  onDelete,
  onRandom,
  onStart,
  isRunning,
}: Props) => {
  return (
    <div className="absolute bottom-space-lg left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="bg-surface-container-lowest/90 backdrop-blur-2xl px-space-md py-space-xs rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-space-sm border border-white/5">
        <button
          onClick={onBefore}
          className="p-space-xs rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          title="Retroceder 1 Generación">
          <span className="material-symbols-outlined text-[18px]">replay</span>
        </button>

        <button
          onClick={onStart}
          className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95">
          <span className="material-symbols-outlined text-[22px]">
            {isRunning ? "pause" : "play_arrow"}
          </span>
        </button>

        <button
          onClick={onNext}
          className="p-space-xs rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
          title="Avanzar 1 Paso">
          <span className="material-symbols-outlined text-[18px]">skip_next</span>
        </button>

        <div className="w-px h-5 bg-surface-variant/60 mx-1" />

        <div className="flex items-center gap-space-xs px-1">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
            speed
          </span>
          <input
            className="w-20 h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
            max={120}
            min={60}
            type="range"
            value={fps}
            onChange={(e) => onChangeFps(+e.target.value)}
          />
          <span className="text-label-caption text-primary w-8 text-right">{fps}FPM</span>
        </div>

        <div className="w-px h-5 bg-surface-variant/60 mx-1" />

        <button
          onClick={onRandom}
          className="px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-secondary">casino</span>
          <span className="text-label-caption">Aleatorio</span>
        </button>
        <button
          onClick={onDelete}
          className="p-space-xs rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-all"
          title="Limpiar Todo">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};
