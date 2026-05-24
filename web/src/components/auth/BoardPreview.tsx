const PREVIEW_COLUMNS = [
    { title: "Today",  dot: "bg-primary", cards: ["Finish wireframes", "Gym — leg day", "Groceries"] },
    { title: "Doing",  dot: "bg-info",    cards: ["Read ch. 3", "Tax docs"] },
    { title: "Done",   dot: "bg-success", cards: ["Book dentist", "Send invoice"] },
];

const BoardPreview = () => {
    return (
        <div className="rotate-[-1deg] bg-base-100 border border-base-300 rouded-xl p-3 shadow-md flex gap-2">
            {PREVIEW_COLUMNS.map((col) => (
                <div key={col.title} className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                        <span className="text-[11px] font-semibold">{col.title}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {col.cards.map((c) => (
                            <div
                                key={c}
                                className="bg-base-200 border border-base-300 rounded-md px-2 py-1 text-[11px] truncate"
                            >
                                {c}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BoardPreview;