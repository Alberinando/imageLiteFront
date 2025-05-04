import React from "react";
import ButtonProps from "@/components/button/iterfaces/ButtonProps";

const Button: React.FC<ButtonProps> = ({ color = "bg-indigo-600 hover:bg-indigo-700", onClick, label, textColor = "white", type = "button" }) => {
    const textColorClass = {
        white: "text-white",
        black: "text-black",
        gray: "text-gray-800",
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
        yellow: "text-yellow-500",
    }[textColor] || "text-white";

    return (
        <button
            onClick={onClick}
            type={type}
            className={`px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${color} ${textColorClass} cursor-pointer`}
        >
            {label}
        </button>
    );
};

export default React.memo(Button);
