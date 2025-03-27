'use client'
import React, {useState} from "react";
import Link from "next/link";
import {useFormik} from 'formik'

import Template from "@/components/template/Template";
import InputText from "@/components/input/InputText";
import Button from "@/components/button/Button";
import formSheme, {formValidationSheme} from "@/app/formulario/_util/formSheme";
import Image from "next/image";
import IFormularioProps from "@/app/formulario/_interface/FormularioProps";
import {useImageServices} from "@/resources/image/image.services";
import useNotification from "@/components/notification/notification";
import FilderError from "@/components/input/util/filderError";

function FormularioPage(){
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>();

    const services = useImageServices()
    const notification = useNotification()

    const formik = useFormik({
        initialValues: formSheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationSheme
    })

    function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            const file = e.target.files[0];
            formik.setFieldValue("file", file);
            URL.createObjectURL(file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    }

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

            await services.SaveImage(formData)
            formik.resetForm({
                values: {
                    name: '',
                    tags: '',
                    file: ''
                }
            });
            setImagePreview('');
            setLoading(false);
            notification.notify('Cadastro com sucesso', 'success')
        } catch (e) {
            console.error(e);
            setLoading(false);
            notification.notify('Erro ao cadastrar', 'error')
        }
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-500">Nova imagem</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Name: <span className="text-red-600">*</span></label>
                        <InputText
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Digite o tipo da imagem"
                            style="w-72" />
                        <FilderError error={formik.errors.name} />
                    </div>

                    <div className="grid grid-cols-1 mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Tags: <span className="text-red-600">*</span></label>
                        <InputText
                            id="tags"
                            value={formik.values.tags}
                            onChange={formik.handleChange}
                            placeholder="Digite as tags de forma separado"
                            style="w-72" />
                        <FilderError error={formik.errors.tags} />
                    </div>

                    <div className="grid grid-cols-1 mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Imagem: <span className="text-red-600">*</span></label>
                        <FilderError error={formik.errors.file} />
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                {!imagePreview &&
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                }
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:bg-indigo-50">
                                        {!imagePreview &&
                                            <span className="px-1">Click para carregar imagem</span>
                                        }

                                        {!!imagePreview &&
                                            <Image
                                                src={imagePreview}
                                                alt='Imagem selecionada'
                                                width={250}
                                                height={250}
                                                className="rounded-md object-cover"
                                            />
                                        }
                                        <input type="file" onChange={onFileUpload} className="sr-only" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-6 gap-x-4">
                        <Button color="bg-blue-500 hover:bg-blue-300" label="Salvar" textColor="white" type="submit" />
                        <Link href="/galeria">
                            <Button color="bg-red-500 hover:bg-red-300" label="Cancelar" type="button" textColor="white" />
                        </Link>
                    </div>
                </form>
            </section>
        </Template>
    )
}

export default React.memo(FormularioPage);
