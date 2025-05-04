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
import AuthenticatedPage from "@/components/Authenticated/AuthenticatedPage";

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
        <AuthenticatedPage>
            <Template loading={loading}>
                {/* Search Section */}
                <section className="w-full max-w-4xl mx-auto my-8">
                    <div
                        className={
                            `flex flex-col sm:flex-row items-center bg-white shadow-md rounded-2xl p-6 space-y-4 sm:space-y-0 sm:space-x-4 ` +
                            (loading ? 'animate-pulse' : '')
                        }
                    >
                        <InputText
                            placeholder="Buscar por nome ou tag"
                            onChange={(e) => setQuery(e.target.value)}
                            style="flex-grow"
                        />
                        <select
                            onChange={(e) => setExtension(e.target.value)}
                            className="w-48 border-gray-300 border-2 rounded-lg px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition cursor-pointer"
                        >
                            <option value="">Todos os formatos</option>
                            <option value="png">PNG</option>
                            <option value="jpeg">JPEG</option>
                            <option value="gif">GIF</option>
                            <option value="bmp">BMP</option>
                            <option value="tiff">TIFF</option>
                            <option value="webp">WEBP</option>
                        </select>

                        <Button
                            onClick={searchImages}
                            label="Buscar"
                            color="bg-indigo-600 hover:bg-indigo-700"
                            textColor="white"
                        />
                        <Link href="/formulario">
                            <Button
                                label="Cadastrar"
                                color="bg-green-500 hover:bg-green-600"
                                textColor="white"
                            />
                        </Link>
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {images.map((image, idx) => (
                            <RenderImage
                                key={idx}
                                url={image.url}
                                name={image.name}
                                size={image.size}
                                uploadDate={image.dataUpload}
                                extension={image.extension}
                            />
                        ))}
                    </div>
                </section>
            </Template>
        </AuthenticatedPage>
    )
}

export default React.memo(GaleriaPage);
