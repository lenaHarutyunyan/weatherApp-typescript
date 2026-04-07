import { useState, type ReactNode } from "react";

const SIZES = {
    small: "text-sm",
    middle: "text-xl",
    large: "text-3xl"
} as const;

interface CollapsiblePanelProps{
    title?: string;
    size?: Size;
    defaultOpen? : boolean;
    children?: ReactNode
};

type Size = keyof typeof SIZES;

function CollapsiblePanel({ title, size = "small", defaultOpen = false, children }: CollapsiblePanelProps) {
    const [opened, setOpened] = useState(defaultOpen);

    return (
        <div className={`flex flex-col bg-transparent p-1 gap-3 border ${SIZES[size]}`}>
            <div className="cursor-pointer flex justify-between select-none" onClick={() => setOpened(!opened)}>
                {title && <h2>{title}</h2>}
                {<button className={`transition duration-300 cursor-pointer ${opened ? "transform rotate-90" : "rotate-0"}`}>→</button>}
            </div>
            {opened && <div>{children}</div>}
        </div>
    );
}

export default CollapsiblePanel;
