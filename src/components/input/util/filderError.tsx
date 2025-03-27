import React from "react";
import {ErrorProps} from "@/components/input/Intafaces/errorProps";

const FilderError: React.FC<ErrorProps> = ({ error }) => {
    if (error) {
        return <span className="text-red-600 text-sm">{error.toString()}</span>;
    }
    return null;
}

export default FilderError;
