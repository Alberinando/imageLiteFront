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
            className={`${style} border px-5 py-2 rounded-lg text-gray-900`} />
    )
}

export default React.memo(InputText);
