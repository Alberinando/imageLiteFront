import React from "react";
import InputTextProps from "@/components/input/Intafaces/InputProps";

const InputText:React.FC<InputTextProps> = ({style, onChange, placeholder,id, value, type = "text", autoComplete}: InputTextProps) => {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            autoComplete={autoComplete}
            className={`${style} w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none px-5 py-3 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200`}
        />
    )
}

export default React.memo(InputText);
