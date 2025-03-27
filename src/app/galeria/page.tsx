'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";

import Template from "@/components/template/Template";
import {useImageServices} from "@/resources/image/image.services";
import ImageCardProps from "@/components/imageCard/interface/imageCardProps";
import RenderImage from "@/app/galeria/_components/renderImage";
import Button from "@/components/button/Button";
import InputText from "@/components/input/InputText";
import useNotification from "@/components/notification/notification";

function GaleriaPage(){
    const [images, setImages] = useState<ImageCardProps[]>([]);
    const [query, setQuery] = useState<string>("");
    const [extension, setExtension] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const useServices = useImageServices();
    const notification = useNotification();

    useEffect(() => {
        searchImages()
    }, []);

    async function searchImages() {
        try {
            setLoading(true);
            const result = await useServices.Search(query, extension);
            const imagesConverted: ImageCardProps[] = result.map((item) => ({
                url: item.url,
                name: item.name,
                size: item.size,
                dataUpload: item.uploadDate,
                extension: item.extension,
            }));
            setImages(imagesConverted);
            if(!result.length){
                notification.notify('Nenhum resultado', 'warning')
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <div className={`flex flex-col sm:flex-row ${loading && "animate-pulse"} space-x-4 space-y-4 sm:space-y-0 max-md:w-full max-md:px-2`}>
                    <InputText
                        placeholder="Digite o nome ou tag"
                        onChange={(e) => setQuery(e.target.value)} />
                    <select
                        onChange={(e) => setExtension(e.target.value)}
                        className="border px-4 py-2 rounded-lg  cursor-pointer text-gray-900 z-auto">
                        <option value="">Todos os formatos</option>
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                        <option value="gif">GIF</option>
                        <option value="bmp">BMP</option>
                        <option value="tiff">TIFF</option>
                        <option value="webp">WEBP</option>
                    </select>

                    <Button color="bg-blue-500 hover:bg-blue-300" textColor="white" onClick={searchImages} label="Buscar" />
                    <Link href="/formulario">
                        <Button color="bg-yellow-500 hover:bg-yellow-300" textColor="white" label="Cadastre" />
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 max-md:px-2 max-md:gap-4">
                {images.map((image, index) => (
                        <RenderImage
                            key={index}
                            url={image.url}
                            name={image.name}
                            size={image.size}
                            uploadDate={image.dataUpload}
                            extension={image.extension}
                        />
                    ))
                }
            </section>

        </Template>
    )
}

export default React.memo(GaleriaPage);
