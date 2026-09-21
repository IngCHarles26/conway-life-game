import { useState } from "react";

export const RulesTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group absolute top-space-lg right-space-xl z-30">
      <button
        type="button"
        aria-controls="game-rules"
        aria-expanded={isOpen}
        aria-label="Mostrar reglas del juego"
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-surface-container-lowest/90 text-on-surface-variant shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-surface-container-high hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <span className="material-symbols-outlined text-[20px]">help</span>
      </button>

      <section
        id="game-rules"
        aria-label="Reglas del juego de la vida"
        className={`${isOpen ? "flex" : "hidden"} absolute right-0 top-11 w-[min(18rem,calc(100vw-2rem))] flex-col gap-space-sm rounded-xl border border-white/10 bg-surface-container-lowest/95 p-space-md text-on-surface shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl group-hover:flex group-focus-within:flex`}>
        <div className="flex items-center justify-between gap-space-sm">
          <h2 className="text-headline-sm text-on-surface">Reglas de Conway</h2>
          <span className="material-symbols-outlined text-[18px] text-primary">science</span>
        </div>

        <ol className="flex flex-col gap-space-sm text-body-sm text-on-surface-variant">
          <li className="flex gap-space-sm">
            <span className="font-display text-label-code text-primary">01</span>
            <span>Una célula viva sobrevive con 2 o 3 vecinas.</span>
          </li>
          <li className="flex gap-space-sm">
            <span className="font-display text-label-code text-primary">02</span>
            <span>Una célula muerta nace con exactamente 3 vecinas.</span>
          </li>
          <li className="flex gap-space-sm">
            <span className="font-display text-label-code text-primary">03</span>
            <span>Una célula muere por soledad o sobrepoblación.</span>
          </li>
        </ol>
      </section>
    </div>
  );
};
