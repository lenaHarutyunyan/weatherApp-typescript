import type { ReactNode } from "react";

interface ButtonProps {
    type: "danger" | "primary" | "default";
    children: ReactNode;
    onClick: () => void
}

function Button({ type, children, onClick }: ButtonProps) {
    let color = "bg-gray-500";

    if (type === "danger") {
        color = "bg-red-500"
    };
    if (type === "primary") {
        color = "bg-green-500"
    };

    return (
        <button onClick={onClick} className={`${color} px-2 py-1 rounded text-white cursor-pointer active:scale-95`}>
            {children}
        </button>
    );
};

export default Button;
