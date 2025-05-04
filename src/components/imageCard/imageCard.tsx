'use client'
import React from "react";
import imageCardProps from "@/components/imageCard/interface/imageCardProps";
import formatBytes from "@/util/formatBytes";

const imageCard= ({url, name, size, dataUpload, extension}: imageCardProps) => {

    function download(){
        window.open(url, '_blank');
    }

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <img
                onClick={download}
                alt="Imagem salva"
                src={url}
                className="h-56 w-full object-cover cursor-pointer transition-transform hover:scale-105"
            />
            <div className="p-5 space-y-1">
                <h5 className="text-lg font-semibold text-gray-800">{name}</h5>
                <p className="text-sm text-gray-500 uppercase">{extension}</p>
                <p className="text-sm text-gray-600">{formatBytes(size)}</p>
                <p className="text-xs text-gray-400">{dataUpload}</p>
            </div>
        </div>
    )
}

export default imageCard;
