import React from "react";
import ButtonProps from "@/components/button/iterfaces/ButtonProps";

const Button:React.FC<ButtonProps> = ({color, onClick, label, textColor, type}:ButtonProps) => {
    return (
        <>
            <button
                onClick={onClick}
                type={type}
                className={`cursor-pointer ${color} text-${textColor} px-4 py-2 rounded-lg`}>
                {label}
            </button>
        </>
    )
}

export default React.memo(Button);
