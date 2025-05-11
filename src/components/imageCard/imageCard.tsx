'use client'
import React from "react";
import imageCardProps from "@/components/imageCard/interface/imageCardProps";
import formatBytes from "@/util/formatBytes";
import Button from "@/components/button/Button";
import Link from "next/link";

const imageCard= ({id, url, name, size, dataUpload, extension, onDelete}: imageCardProps) => {

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
                <div className="flex justify-end space-x-2">
                    <Link href={`/galeria/${id}`}>
                        <Button
                            type="button"
                            label="Editar"
                            color="bg-yellow-500 hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-100"
                        />
                    </Link>
                    <Button
                        type="button"
                        label="Excluir"
                        color="bg-red-500 hover:bg-red-300 focus:ring-4 focus:ring-red-100"
                        onClick={() => onDelete?.()}
                    />
                </div>
            </div>
        </div>
    )
}

export default imageCard;
