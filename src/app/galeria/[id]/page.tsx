'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { useImageServices } from "@/resources/image/image.services";
import useNotification from "@/components/notification/notification";
import formSheme, {formUpdateValidationSchema} from "@/app/formulario/_util/formSheme";
import IFormularioProps from "@/app/formulario/_interface/FormularioProps";
import AuthenticatedPage from "@/components/Authenticated/AuthenticatedPage";
import Template from "@/components/template/Template";
import InputText from "@/components/input/InputText";
import FilderError from "@/components/input/util/filderError";
import Button from "@/components/button/Button";
import { useParams } from "next/navigation";

function FormularioEditPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>();

    const services = useImageServices();
    const notification = useNotification();
    const params = useParams();
    const rawId = params?.id;
    const id = typeof rawId === "string"
        ? rawId
        : Array.isArray(rawId)
            ? rawId[0]
            : "";

    const formik = useFormik({
        initialValues: formSheme,
        onSubmit: handleSubmit,
        validationSchema: formUpdateValidationSchema,
    });

    function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            formik.setFieldValue("file", file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    }

    useEffect(() => {
        if (id) {
            services
                .findById(id)
                .then((data) => {
                    formik.setValues({
                        name: data.name,
                        tags: data.tags,
                        file: ""
                    });
                    setImagePreview(`data:image/png;base64,${data.fileBase64}`);
                })
                .catch((error) => {
                    console.error("Erro ao buscar imagem para edição:", error);
                    notification.notify("Erro ao carregar a imagem para edição", "error");
                });
        }
    }, [id]);


    async function handleSubmit(date: IFormularioProps) {
        setLoading(true);
        const formData = new FormData();
        try {
            if (date.file) {
                formData.append("file", date.file);
            }
            if (date.name) {
                formData.append("name", date.name);
            }
            if (date.tags) {
                formData.append("tags", date.tags);
            }
            await services.update(id, formData);
            setLoading(false);
            notification.notify("Atualização realizada com sucesso", "success");
        } catch (e) {
            console.error(e);
            setLoading(false);
            notification.notify("Erro ao atualizar a imagem", "error");
        }
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="max-w-xl mx-auto my-1 p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg">
                    <h5 className="text-3xl font-extrabold text-center text-blue-600 mb-8 select-none">
                        Editar Imagem
                    </h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder="Digite o nome da imagem"
                                style="w-full mt-2 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition"
                            />
                            <FilderError error={formik.errors.name} />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                Tags <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="tags"
                                value={formik.values.tags}
                                onChange={formik.handleChange}
                                placeholder="Separe por vírgulas"
                                style="w-full mt-2 border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition"
                            />
                            <FilderError error={formik.errors.tags} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Imagem <span className="text-red-500">*</span>
                            </label>
                            <FilderError error={formik.errors.file} />
                            <div className="mt-4 flex justify-center">
                                <div className="relative w-full h-64 bg-white border-2 border-dashed border-blue-200 rounded-2xl shadow-inner overflow-hidden">
                                    {!imagePreview && (
                                        <div className="flex flex-col items-center justify-center h-full text-blue-300">
                                            <svg
                                                className="h-12 w-12 mb-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 7h18M3 12h18M3 17h18"
                                                />
                                            </svg>
                                            <span className="text-sm text-blue-400">
                        Clique para carregar imagem
                      </span>
                                        </div>
                                    )}
                                    {!!imagePreview && (
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 space-x-4">
                            <Link href="/galeria">
                                <Button
                                    color="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200"
                                    label="Cancelar"
                                    textColor="white"
                                    type="button"
                                />
                            </Link>
                            <Button
                                color="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200"
                                label="Salvar"
                                textColor="white"
                                type="submit"
                            />
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    );
}

export default React.memo(FormularioEditPage);
