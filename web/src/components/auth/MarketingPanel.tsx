import BoardPreview from "./BoardPreview.tsx";

const MarketingPanel = () => {
    return (
        <div
            className="hidden lg:flex w-[44%] shrink-0 bg-base-200 border-r border-base-300 p-10 flex-col justify-between relative overflow-hidden"
        >
            {/* gradiente de fundo */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_50%_at_80%_10%,oklch(var(--p)/0.15),transparent_70%)]"></div>
            {/* logo */}
            <div className="relative">
                <span className="text-xl font-bald tracking-tight">stak</span>
            </div>

            {/* headline + features */}
            <div className="relative">
                <h1 className="text-4xl font-semibold leading-tight mb-3">
                    Get things <span className="text-primary">done.</span> <br />
                    One card at a time.
                </h1>
                <p className="text-base-content/60 text-sm max-w-xs">
                    Stak is a calm, fast kanban for the things you keep meaning to do.
                    Drag a card. Check it off. Move on with your day
                </p>

                <ul className="mt-5 flex flex-col gap-2.5">
                    {[
                        "Unlimited boards & cards",
                        "Drag-and-drop, keyboard-first",
                        "Free forever for personal use"
                    ].map((feat) => (
                       <li key={feat} className="flex items-center gap-2.5 text-sm">
                           <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                               <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                           </span>
                           {feat}
                       </li>
                    ))}
                </ul>
            </div>

            {/* mini board */}
            <div className="relative">
                <BoardPreview />
            </div>
        </div>
    )
};

export default MarketingPanel;