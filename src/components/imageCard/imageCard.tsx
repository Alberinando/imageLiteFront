'use client'
import React from "react";
import imageCardProps from "@/components/imageCard/interface/imageCardProps";
import formatBytes from "@/util/formatBytes";

const imageCard= ({url, name, size, dataUpload, extension}: imageCardProps) => {

    function download(){
        window.open(url, '_blank');
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 hover:shadow-lg hover:-translate-y-2">
            <img onClick={download} alt="Images salvas" src={url} className="h-56 w-full cursor-pointer object-cover rounded-t-md" />
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold md-2 text-gray-600">{name}</h5>
                <p className="text-gray-600">{extension}</p>
                <p className="text-gray-600">{formatBytes(size)}</p>
                <p className="text-gray-600">{dataUpload}</p>
            </div>
        </div>
    )
}

export default imageCard;
