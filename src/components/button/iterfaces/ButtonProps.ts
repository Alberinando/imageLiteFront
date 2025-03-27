import React from 'react';

export default interface ButtonProps {
    color?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    textColor?: string;
    type?: "submit" | "button" | "reset" | undefined;
}
